import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  Map as MapIcon,
  Crosshair,
  AlertTriangle,
  Flame,
  TreePine,
  Tractor,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sliders,
  Send,
  CheckCircle2,
  ShieldCheck,
  Radio,
  Key,
} from 'lucide-react';
import { HOTSPOTS_DATA, CADASTRAL_POLYGONS } from '../data/mockHotspots';
import { HotspotArchetype, ThermalHotspot } from '../types/thermal';

interface TacticalMapViewProps {
  onOpenDossier: (hotspot: ThermalHotspot) => void;
  onOpenDispatch: (hotspot: ThermalHotspot) => void;
}

// User-provided NASA FIRMS Map Key for authenticated WMS services
const FIRMS_MAP_KEY =
  (import.meta as any).env?.VITE_FIRMS_MAP_KEY ||
  '7e80b4ca0966a8480a0a5ee423372782';

export const TacticalMapView: React.FC<TacticalMapViewProps> = ({
  onOpenDossier,
  onOpenDispatch,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const cadastreLayerRef = useRef<L.LayerGroup | null>(null);
  const firmsWmsLayerRef = useRef<L.TileLayer.WMS | null>(null);
  const lightTilesRef = useRef<L.TileLayer | null>(null);
  const satTilesRef = useRef<L.TileLayer | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  const [selectedHotspot, setSelectedHotspot] = useState<ThermalHotspot>(HOTSPOTS_DATA[0]);
  const [filterType, setFilterType] = useState<HotspotArchetype | 'all'>('all');
  const [baseMapMode, setBaseMapMode] = useState<'osm' | 'satellite'>('osm');
  const [showCadastre, setShowCadastre] = useState<boolean>(true);
  const [showFirmsOverlay, setShowFirmsOverlay] = useState<boolean>(true);
  const [timeWindow, setTimeWindow] = useState<'6H' | '12H' | '24H' | '7D'>('24H');
  const [activeSensorFeed, setActiveSensorFeed] = useState<'viirs' | 'modis'>('viirs');
  const [popupHotspot, setPopupHotspot] = useState<ThermalHotspot | null>(HOTSPOTS_DATA[0]);

  // Counts for filter pills
  const totalCount = 1842;
  const emergencyCount = 1;
  const flareCount = 28;
  const forestCount = 84;
  const agroCount = 1729;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Clean up any stale container leaflet ID from React fast-refresh
    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    // Create map centered on Western / Northern India
    const map = L.map(mapContainerRef.current, {
      center: [22.0, 75.5],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Base Layers (Standard OpenStreetMap with zero watermark)
    const lightTiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        subdomains: 'abc',
        attribution: '&copy; OpenStreetMap contributors',
      }
    );

    const satTiles = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: '&copy; Esri World Imagery',
      }
    );

    lightTilesRef.current = lightTiles;
    satTilesRef.current = satTiles;

    if (baseMapMode === 'satellite') {
      satTiles.addTo(map);
    } else {
      lightTiles.addTo(map);
    }

    // NASA FIRMS MapServer WMS using user-provided API key
    const targetLayer =
      activeSensorFeed === 'modis'
        ? (timeWindow === '7D' ? 'fires_modis_7' : 'fires_modis_24')
        : (timeWindow === '7D' ? 'fires_viirs_7' : 'fires_viirs_24');

    const firmsWmsUrl = `https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/${FIRMS_MAP_KEY}/`;

    const firmsTiles = L.tileLayer.wms(firmsWmsUrl, {
      layers: targetLayer,
      format: 'image/png',
      transparent: true,
      opacity: 0.85,
      maxZoom: 14,
      attribution: 'NASA FIRMS',
    });

    firmsWmsLayerRef.current = firmsTiles;
    if (showFirmsOverlay) {
      firmsTiles.addTo(map);
    }

    // Layer groups for markers & cadastres
    const markersGroup = L.layerGroup().addTo(map);
    const cadastreGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    cadastreLayerRef.current = cadastreGroup;

    setIsMapReady(true);

    return () => {
      setIsMapReady(false);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      lightTilesRef.current = null;
      satTilesRef.current = null;
      firmsWmsLayerRef.current = null;
      markersLayerRef.current = null;
      cadastreLayerRef.current = null;
    };
  }, []);

  // Update Base Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const lightTiles = lightTilesRef.current;
    const satTiles = satTilesRef.current;
    if (!map || !lightTiles || !satTiles) return;

    if (baseMapMode === 'osm') {
      if (satTiles && map.hasLayer(satTiles)) {
        map.removeLayer(satTiles);
      }
      if (lightTiles && !map.hasLayer(lightTiles)) {
        lightTiles.addTo(map);
      }
    } else {
      if (lightTiles && map.hasLayer(lightTiles)) {
        map.removeLayer(lightTiles);
      }
      if (satTiles && !map.hasLayer(satTiles)) {
        satTiles.addTo(map);
      }
    }
  }, [baseMapMode, isMapReady]);

  // Update FIRMS overlay with user API key and selected feed
  useEffect(() => {
    const map = mapInstanceRef.current;
    const firms = firmsWmsLayerRef.current;
    if (!map || !firms) return;

    const targetLayer =
      activeSensorFeed === 'modis'
        ? (timeWindow === '7D' ? 'fires_modis_7' : 'fires_modis_24')
        : (timeWindow === '7D' ? 'fires_viirs_7' : 'fires_viirs_24');

    firms.setParams({ layers: targetLayer } as any);

    if (showFirmsOverlay) {
      if (firms && !map.hasLayer(firms)) {
        firms.addTo(map);
      }
    } else {
      if (firms && map.hasLayer(firms)) {
        map.removeLayer(firms);
      }
    }
  }, [showFirmsOverlay, activeSensorFeed, timeWindow, isMapReady]);

  // Render Cadastral Polygons
  useEffect(() => {
    if (!isMapReady) return;
    const group = cadastreLayerRef.current;
    if (!group) return;

    group.clearLayers();
    if (!showCadastre) return;

    CADASTRAL_POLYGONS.forEach((poly) => {
      const polygon = L.polygon(poly.coordinates, {
        color: poly.strokeColor,
        fillColor: poly.fillColor,
        fillOpacity: 0.25,
        weight: 1.5,
        dashArray: '4, 4',
      });

      polygon.bindTooltip(
        `<div class="text-xs font-mono font-bold text-slate-800">${poly.name}</div>
         <div class="text-[10px] text-slate-600">${poly.details} • Zone #${poly.id}</div>`,
        { permanent: false, direction: 'top' }
      );

      group.addLayer(polygon);
    });
  }, [showCadastre, isMapReady]);

  // Render Hotspot Markers
  useEffect(() => {
    if (!isMapReady) return;
    const group = markersLayerRef.current;
    const map = mapInstanceRef.current;
    if (!group || !map) return;

    group.clearLayers();

    const filtered = HOTSPOTS_DATA.filter((h) => {
      if (filterType === 'all') return true;
      return h.archetype === filterType;
    });

    filtered.forEach((hotspot) => {
      const isEmergency = hotspot.archetype === 'emergency';
      const isFlare = hotspot.archetype === 'flare';
      const isForest = hotspot.archetype === 'forest';
      const isAgro = hotspot.archetype === 'agro';

      let bgClass = 'bg-amber-500';
      let borderClass = 'border-amber-600';
      let pingClass = 'bg-amber-400';
      let labelText = `${hotspot.signatureId} • ${hotspot.frpMw}MW`;

      if (isEmergency) {
        bgClass = 'bg-red-600';
        borderClass = 'border-red-800';
        pingClass = 'bg-red-500';
        labelText = `HAZIRA // ${hotspot.frpMw}MW`;
      } else if (isFlare) {
        bgClass = 'bg-sky-600';
        borderClass = 'border-sky-800';
        pingClass = 'bg-sky-400';
        labelText = `${hotspot.name.split(' ')[0]} • ${hotspot.frpMw}MW`;
      } else if (isForest) {
        bgClass = 'bg-emerald-600';
        borderClass = 'border-emerald-800';
        pingClass = 'bg-emerald-400';
        labelText = `SIMLIPAL • ${hotspot.frpMw}MW`;
      } else if (isAgro) {
        bgClass = 'bg-amber-500';
        borderClass = 'border-amber-700';
        pingClass = 'bg-amber-400';
        labelText = `SANGRUR • ${hotspot.frpMw}MW`;
      }

      // Custom HTML Marker matching clean tactical GIS design
      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group">
          ${
            isEmergency
              ? `<span class="animate-ping absolute -top-1 -left-1 w-6 h-6 rounded-full ${pingClass} opacity-75"></span>`
              : ''
          }
          <div class="w-5 h-5 rounded-full ${bgClass} border-2 border-white shadow-md flex items-center justify-center text-white text-[9px] font-bold z-10">
            ${isEmergency ? '!' : isFlare ? 'F' : isForest ? 'T' : 'A'}
          </div>
          <div class="mt-1 px-1.5 py-0.5 rounded bg-white/95 backdrop-blur-xs border border-slate-300 text-[10px] font-mono font-bold text-slate-800 shadow-xs whitespace-nowrap z-10">
            ${labelText}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [80, 40],
        iconAnchor: [40, 15],
      });

      const marker = L.marker([hotspot.lat, hotspot.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedHotspot(hotspot);
        setPopupHotspot(hotspot);
      });

      group.addLayer(marker);
    });
  }, [filterType, isMapReady]);

  // Center map on selected hotspot
  const handleFocusHotspot = (hotspot: ThermalHotspot) => {
    setSelectedHotspot(hotspot);
    setPopupHotspot(hotspot);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([hotspot.lat, hotspot.lng], 9, {
        duration: 1.2,
      });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-73px)] flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sub-Header / Radar Title & Status Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-bold text-slate-100 tracking-wider uppercase text-xs">
            TACTICAL HOTSPOTS RADAR // INDIA THEATER
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            NASA FIRMS WMS [KEY: 7e80...2782] • VIIRS-375M • MODIS-1KM
          </span>
        </div>

        {/* Hotspot Archetype Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5" id="radar-archetype-filters">
          <button
            id="filter-all-hotspots"
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap border ${
              filterType === 'all'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span>ALL HOTSPOTS</span>
            <span className={filterType === 'all' ? 'text-sky-200' : 'text-slate-400'}>{totalCount.toLocaleString()}</span>
          </button>

          <button
            id="filter-emergency-hotspots"
            onClick={() => setFilterType('emergency')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap border ${
              filterType === 'emergency'
                ? 'bg-red-600 text-white border-red-500 shadow-xs'
                : 'bg-slate-800 text-red-400 border-red-900/60 hover:bg-red-950/40'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span>EMERGENCY</span>
            <span className="px-1.5 py-0.2 rounded bg-red-700 text-white text-[10px] font-bold">
              {emergencyCount}
            </span>
          </button>

          <button
            id="filter-flare-hotspots"
            onClick={() => setFilterType('flare')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap border ${
              filterType === 'flare'
                ? 'bg-sky-600 text-white border-sky-500 shadow-xs'
                : 'bg-slate-800 text-sky-400 border-sky-900/60 hover:bg-sky-950/40'
            }`}
          >
            <span>LICENSED FLARES</span>
            <span className="font-bold">{flareCount}</span>
          </button>

          <button
            id="filter-forest-hotspots"
            onClick={() => setFilterType('forest')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap border ${
              filterType === 'forest'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                : 'bg-slate-800 text-emerald-400 border-emerald-900/60 hover:bg-emerald-950/40'
            }`}
          >
            <span>FOREST FIRES</span>
            <span className="font-bold">{forestCount}</span>
          </button>

          <button
            id="filter-agro-hotspots"
            onClick={() => setFilterType('agro')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap border ${
              filterType === 'agro'
                ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                : 'bg-slate-800 text-amber-400 border-amber-900/60 hover:bg-amber-950/40'
            }`}
          >
            <span>AGRO BURNS</span>
            <span className="font-bold">{agroCount.toLocaleString()}</span>
          </button>
        </div>
      </div>

      {/* Main Tactical Map Viewport + Right Inspector Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Map Canvas Container */}
        <div className="flex-1 relative h-[55vh] lg:h-full bg-slate-950">
          {/* Top Floating Map Controls Bar */}
          <div className="absolute top-4 left-4 right-4 z-40 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            {/* Left Controls: Basemap & Cadastre */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Map / Sat Switcher */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 flex items-center gap-1 text-xs font-mono shadow-md">
                <button
                  id="btn-basemap-osm"
                  onClick={() => setBaseMapMode('osm')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition ${
                    baseMapMode === 'osm'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>OSM</span>
                </button>
                <button
                  id="btn-basemap-sat"
                  onClick={() => setBaseMapMode('satellite')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition ${
                    baseMapMode === 'satellite'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Satellite</span>
                </button>
              </div>

              {/* OSM Cadastre Toggle */}
              <label className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-200 cursor-pointer shadow-md hover:border-slate-600">
                <input
                  type="checkbox"
                  id="toggle-osm-cadastre"
                  checked={showCadastre}
                  onChange={(e) => setShowCadastre(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-0 w-3.5 h-3.5 accent-sky-600"
                />
                <span className="font-semibold">OSM Cadastre</span>
              </label>

              {/* NASA FIRMS Overlay Toggle with Key Indicator */}
              <label className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-emerald-300 cursor-pointer shadow-md hover:border-emerald-500">
                <input
                  type="checkbox"
                  id="toggle-firms-wms"
                  checked={showFirmsOverlay}
                  onChange={(e) => setShowFirmsOverlay(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-0 w-3.5 h-3.5 accent-emerald-500"
                />
                <span className="font-semibold">NASA FIRMS WMS</span>
                <span className="text-[10px] px-1 py-0.2 bg-emerald-950/80 border border-emerald-700/60 rounded text-emerald-400 font-mono">
                  KEY ACTIVE
                </span>
              </label>
            </div>

            {/* Right Controls: Window & Feeds */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Feeds Switcher */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 hidden sm:flex items-center gap-1 text-xs font-mono shadow-md">
                <span className="text-slate-400 px-1 font-bold text-[10px]">FEEDS:</span>
                <button
                  onClick={() => setActiveSensorFeed('viirs')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    activeSensorFeed === 'viirs' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  VIIRS 375m
                </button>
                <button
                  onClick={() => setActiveSensorFeed('modis')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    activeSensorFeed === 'modis' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  MODIS 1km
                </button>
              </div>

              {/* Window Selector */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 flex items-center gap-1 text-xs font-mono shadow-md">
                <span className="text-slate-400 px-1 font-bold text-[10px]">WINDOW:</span>
                {(['6H', '12H', '24H', '7D'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setTimeWindow(w)}
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      timeWindow === w
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Leaflet Map Div */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Detailed Floating Marker Popup Card (Hazira / Selected Hotspot) */}
          {popupHotspot && (
            <div
              className="absolute left-4 sm:left-8 top-18 z-30 max-w-sm sm:max-w-md w-full bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in duration-150"
              id="active-thermal-popup"
            >
              {/* Header Bar */}
              <div
                className={`px-4 py-3 flex items-center justify-between text-white ${
                  popupHotspot.archetype === 'emergency'
                    ? 'bg-red-600'
                    : 'bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="uppercase">THERMAL ANOMALY #{popupHotspot.id.replace('INC-2025-', '').replace('FLR-2025-', '')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono font-bold uppercase">
                    {popupHotspot.alertLevel === 'TIER-1 CAT' ? 'P1 CRITICAL' : popupHotspot.alertLevel}
                  </span>
                  <button
                    onClick={() => setPopupHotspot(null)}
                    className="p-1 rounded hover:bg-white/20 text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Popup Body */}
              <div className="p-4 space-y-3 bg-white text-slate-900">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{popupHotspot.name}</h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    LAT: {popupHotspot.lat.toFixed(4)}° N • LON: {popupHotspot.lng.toFixed(4)}° E
                  </p>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Fire Radiative Power</span>
                    <span className="text-base font-bold text-red-600">
                      {popupHotspot.frpMw} MW
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Brightness Temp</span>
                    <span className="text-base font-bold text-slate-900">
                      {popupHotspot.brightnessTempK} K
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Satellite Ingest</span>
                    <span className="text-slate-800 font-semibold">{popupHotspot.satellite}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Cadastre Join</span>
                    <span className="text-slate-800 font-semibold">{popupHotspot.landCoverCadastre}</span>
                  </div>
                </div>

                {/* Persistence Probability Bar */}
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Recurrent Flare Likelihood:</span>
                    <span
                      className={`font-bold ${
                        popupHotspot.persistenceProb < 0.3
                          ? 'text-red-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {Math.round(popupHotspot.persistenceProb * 100)}%{' '}
                      {popupHotspot.persistenceProb < 0.3 ? '(ACUTE SPIKE)' : '(STEADY STACK)'}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full ${
                        popupHotspot.persistenceProb < 0.3
                          ? 'bg-red-600'
                          : 'bg-sky-600'
                      }`}
                      style={{ width: `${Math.round(popupHotspot.persistenceProb * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Analytical Insight Text */}
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                  {popupHotspot.statusNotes}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id="popup-inspect-btn"
                    onClick={() => onOpenDossier(popupHotspot)}
                    className="flex-1 px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <span>Inspect Dossier</span>
                  </button>
                  {popupHotspot.archetype === 'emergency' && (
                    <button
                      id="popup-dispatch-btn"
                      onClick={() => onOpenDispatch(popupHotspot)}
                      className="flex-1 px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch NDRF</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Right Map Zoom & Orientation Tools */}
          <div className="absolute right-4 bottom-8 z-30 flex flex-col bg-white rounded-lg border border-slate-300 shadow-md overflow-hidden">
            <button
              title="Zoom In"
              onClick={() => mapInstanceRef.current?.zoomIn()}
              className="p-2 hover:bg-slate-100 text-slate-700 transition border-b border-slate-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              title="Zoom Out"
              onClick={() => mapInstanceRef.current?.zoomOut()}
              className="p-2 hover:bg-slate-100 text-slate-700 transition border-b border-slate-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              title="Reset Extent (India Theater)"
              onClick={() => mapInstanceRef.current?.flyTo([22.0, 75.5], 6)}
              className="p-2 hover:bg-slate-100 text-slate-700 transition"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Left Scale & Geodetic Metadata */}
          <div className="absolute left-4 bottom-4 z-30 bg-slate-900/90 backdrop-blur-md rounded-md px-3 py-1.5 border border-slate-700 text-xs font-mono text-slate-300 shadow-md flex items-center gap-2">
            <span className="font-semibold text-white">200 KM</span>
            <span className="w-8 h-1 bg-slate-400 inline-block rounded-full"></span>
            <span>WGS-84 / EPSG:4326</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold">FIRMS KEY AUTHENTICATED</span>
          </div>
        </div>

        {/* Right Anomaly Inspector Sidebar Pane */}
        <div className="w-full lg:w-[440px] bg-white border-l border-slate-200 flex flex-col overflow-y-auto text-slate-900">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase leading-none">ANOMALY INSPECTOR</h2>
                <span className="text-[11px] font-mono text-slate-500">
                  CONFIDENCE INDEX: {selectedHotspot.confidenceScore}%
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              TIER-1 SPIKE
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* Signature Card */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    TARGET SIGNATURE ID
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{selectedHotspot.signatureId}</h3>
                  <p className="text-xs font-mono text-red-600 font-semibold mt-0.5">
                    {selectedHotspot.district}, {selectedHotspot.state}, India
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                    selectedHotspot.archetype === 'emergency'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {selectedHotspot.archetype === 'emergency'
                    ? 'CRITICAL EMERGENCY'
                    : selectedHotspot.archetype.toUpperCase()}
                </span>
              </div>

              {/* 4 Telemetry Mini Boxes */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Centroid</span>
                  <span className="font-bold text-slate-800">
                    {selectedHotspot.lat.toFixed(4)}°N, {selectedHotspot.lng.toFixed(4)}°E
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Peak FRP</span>
                  <span className="font-bold text-red-600">{selectedHotspot.frpMw} MW</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">I-4 (3.74µm) Temp</span>
                  <span className="font-bold text-slate-800">
                    {selectedHotspot.brightnessTempK} K
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Detection Pass</span>
                  <span className="font-bold text-slate-800">
                    {selectedHotspot.detectionTimeIst.split('|')[1]?.trim() || '05:18 IST'}
                  </span>
                </div>
              </div>
            </div>

            {/* Persistent Source Bayesian Model Chart */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs font-bold text-slate-900">
                    Persistent Flare Bayesian Profile
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                  p = {selectedHotspot.persistenceProb.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                High persistence (&gt;85%) denotes registered flare stacks. An acute surge with low persistence denotes an uncontained industrial blowout.
              </p>

              {/* Baseline Curve Visual SVG */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
                  <span>30-Day Flare Baseline (~{selectedHotspot.baselineFrpMw} MW)</span>
                  <span className="text-red-600 font-bold">Pass: +{Math.round((selectedHotspot.spikeFactor - 1) * 100)}%</span>
                </div>

                <div className="w-full h-28 bg-slate-50 rounded border border-slate-200 p-2 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#cbd5e1" strokeDasharray="3 3" />

                    <path
                      d="M 10 55 Q 80 54, 150 56 T 250 55"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />

                    <path
                      d={
                        selectedHotspot.archetype === 'emergency'
                          ? 'M 10 55 L 70 54 L 140 56 L 210 55 L 250 54 L 285 10'
                          : 'M 10 55 L 70 54 L 140 56 L 210 55 L 250 54 L 285 53'
                      }
                      fill="none"
                      stroke={selectedHotspot.archetype === 'emergency' ? '#dc2626' : '#0284c7'}
                      strokeWidth="2.5"
                    />

                    {selectedHotspot.archetype === 'emergency' && (
                      <circle cx="285" cy="10" r="4" fill="#dc2626" className="animate-pulse" />
                    )}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1.5 uppercase">
                  <span>OCT 16</span>
                  <span>OCT 28</span>
                  <span>NOV 05</span>
                  <span className="text-red-600 font-bold">CURRENT ORBIT</span>
                </div>
              </div>
            </div>

            {/* Comparative Cluster Manifest (Table) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Comparative Cluster Manifest
                </h4>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Active Ingest</span>
              </div>

              <div className="rounded-lg border border-slate-200 overflow-hidden bg-white shadow-xs">
                <table className="w-full text-xs font-mono">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-600 uppercase">
                    <tr>
                      <th className="py-2 px-3 text-left">Location</th>
                      <th className="py-2 px-2 text-right">FRP</th>
                      <th className="py-2 px-2 text-right">P(Persist)</th>
                      <th className="py-2 px-3 text-right">Class</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {HOTSPOTS_DATA.slice(0, 5).map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleFocusHotspot(item)}
                        className={`hover:bg-slate-50 cursor-pointer transition ${
                          selectedHotspot.id === item.id ? 'bg-sky-50 font-bold' : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-slate-800">{item.signatureId.split(' ')[0]}</td>
                        <td className="py-2 px-2 text-right font-bold text-red-600">
                          {item.frpMw}M
                        </td>
                        <td className="py-2 px-2 text-right text-slate-600">
                          {Math.round(item.persistenceProb * 100)}%
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              item.archetype === 'emergency'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.archetype === 'emergency' ? 'EMERG' : item.archetype.substring(0, 5).toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                id="btn-inspect-full-dossier"
                onClick={() => onOpenDossier(selectedHotspot)}
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <span>Geospatial Intelligence Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {selectedHotspot.archetype === 'emergency' && (
                <button
                  id="btn-trigger-priority1-dispatch"
                  onClick={() => onOpenDispatch(selectedHotspot)}
                  className="w-full py-2.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Dispatch Priority 1 Directive</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Map Footer */}
      <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-6 py-2 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200">NTRO // GTID</span>
          <span className="text-slate-600">/</span>
          <span>GEOSPATIAL THERMAL INTELLIGENCE & FIRE CLASSIFICATION</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>LATENCY: 42ms</span>
          <span>/</span>
          <span>WGS-84 / EPSG:4326</span>
          <span>/</span>
          <span className="text-emerald-400 font-bold">NASA FIRMS WMS ONLINE</span>
        </div>
      </div>
    </div>
  );
};
