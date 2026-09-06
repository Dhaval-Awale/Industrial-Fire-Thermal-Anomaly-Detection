import React, { useState } from 'react';
import {
  Download,
  Search,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Building2,
  Tractor,
  ShieldCheck,
  Radio,
  FileCheck,
  Flame,
} from 'lucide-react';
import {
  FRP_VS_PERSISTENCE_DATA,
  CONSTELLATION_PASSES,
} from '../data/mockHotspots';
import { ThermalHotspot } from '../types/thermal';

interface AnalyticsViewProps {
  hotspots: ThermalHotspot[];
  onOpenDossier: (hotspot: ThermalHotspot) => void;
  onOpenDispatch: (hotspot: ThermalHotspot) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  hotspots,
  onOpenDossier,
  onOpenDispatch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [archetypeFilter, setArchetypeFilter] = useState<string>('all');
  const [sensorFilter, setSensorFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'custom'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredScatterPoint, setHoveredScatterPoint] = useState<any | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleExportGeoJson = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: hotspots.map((h) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [h.lng, h.lat],
        },
        properties: {
          id: h.id,
          name: h.name,
          frpMw: h.frpMw,
          brightnessTempK: h.brightnessTempK,
          satellite: h.satellite,
          archetype: h.archetype,
          persistenceProb: h.persistenceProb,
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NTRO_FIRMS_Thermal_Intel_${new Date().toISOString().slice(0, 10)}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered rows
  const filteredRows = hotspots.filter((item) => {
    if (archetypeFilter !== 'all' && item.archetype !== archetypeFilter) return false;
    if (sensorFilter !== 'all' && !item.satellite.toLowerCase().includes(sensorFilter.toLowerCase())) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.osmPolygonId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full pb-16 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Sub-banner & Heading Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white text-sky-700 font-bold text-[10px] tracking-wider uppercase border border-slate-200 shadow-xs">
                GTID / DIRECTIVE ANALYTICS DOSSIER
              </span>
              <span>REV: 2025.3B</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NASA FIRMS WMS KEY: 7e80...2782 ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Thermal Intelligence Analytics &amp; Reports
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Sub-pixel NASA FIRMS MODIS/VIIRS sensor fusion, 30-day Bayesian temporal persistence modeling,
                and multi-agency regulatory audit trails.
              </p>
            </div>

            {/* Filter Bar Controls */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="bg-white border border-slate-200 rounded-lg p-1 flex items-center gap-0.5 shadow-xs">
                {(['24h', '7d', '30d', 'custom'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition ${
                      timeRange === t
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {t === '30d' ? '30d Seasonal' : t}
                  </button>
                ))}
              </div>

              <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 shadow-xs focus:outline-hidden focus:border-sky-500">
                <option>All India Basemap View</option>
                <option>Northern Plains Stubble Corridor</option>
                <option>Gujarat-Maharashtra Petro Belt</option>
                <option>Eastern Forest Reserves (Odisha/MP)</option>
              </select>

              <button
                onClick={handleExportGeoJson}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>Export GeoJSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Macro KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1 */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 uppercase font-semibold">ACTIVE OBSERVATIONS</span>
              <Flame className="w-4 h-4 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">28,454</span>
              <span className="text-xs text-emerald-600 font-semibold font-mono">+12.4%</span>
            </div>
            <div className="text-xs font-mono text-slate-500 flex justify-between border-t border-slate-100 pt-1.5">
              <span>30-Day Total</span>
              <span className="font-semibold text-slate-800">VIIRS + MODIS</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-700 uppercase font-semibold">INDUSTRIAL EMERGENCIES</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600">03</span>
              <span className="ml-auto px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-mono font-bold uppercase">
                TIER-1 CAT
              </span>
            </div>
            <div className="text-xs font-mono text-slate-600 flex justify-between border-t border-red-100 pt-1.5">
              <span>Alert Latency</span>
              <span className="font-bold text-red-700">48 sec</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 uppercase font-semibold">CONTINUOUS FLARES</span>
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">412</span>
              <span className="text-xs font-semibold text-slate-500 font-mono">Stacks</span>
              <span className="ml-auto px-1.5 py-0.5 bg-sky-50 text-sky-700 rounded border border-sky-200 text-[10px] font-mono font-semibold">
                99.1% COMP
              </span>
            </div>
            <div className="text-xs font-mono text-slate-500 flex justify-between border-t border-slate-100 pt-1.5">
              <span>Cadastre ID</span>
              <span className="font-semibold text-slate-800">CPCB-EIA-22</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 uppercase font-semibold">AGRO BIOMASS BURNS</span>
              <Tractor className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">24,150</span>
              <span className="ml-auto px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 text-[10px] font-mono font-semibold">
                84.8% TOTAL
              </span>
            </div>
            <div className="text-xs font-mono text-slate-500 flex justify-between border-t border-slate-100 pt-1.5">
              <span>Air Quality Impact</span>
              <span className="font-bold text-amber-700">Severe+ (AQI &gt;420)</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 uppercase font-semibold">CLASSIFICATION CONF</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">98.4%</span>
              <span className="ml-auto px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 text-[10px] font-mono font-semibold">
                σ ±0.3%
              </span>
            </div>
            <div className="text-xs font-mono text-slate-500 flex justify-between border-t border-slate-100 pt-1.5">
              <span>Ground Validated</span>
              <span className="font-semibold text-slate-800">1,402 Sites</span>
            </div>
          </div>
        </div>

        {/* Analytics Engine: FRP vs Temporal Persistence Scatter Matrix & Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart: Scatter Matrix */}
          <div className="lg:col-span-8 p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 tracking-wider uppercase">
                  ANALYTICS ENGINE // MODEL M-4B • EPSG:4326 DUAL-BAND
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Thermal Radiative Power vs. Temporal Persistence Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Separation boundary for Industrial Emergencies (High FRP, Low Persistence) vs Industrial Permitted Flares (Baseline FRP, High Persistence).
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-slate-800 font-semibold">Emergency</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-slate-700">Flare</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="text-slate-500">Agro/Forest</span>
                </span>
              </div>
            </div>

            {/* Interactive SVG Scatter Plot */}
            <div className="w-full h-80 bg-slate-50/70 rounded-lg border border-slate-200 p-4 relative font-mono text-[10px]">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                {/* Y-Axis Grid Lines & Labels (0MW to 500MW) */}
                <line x1="50" y1="20" x2="570" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="45" y="24" textAnchor="end" fill="#64748b">500MW</text>

                <line x1="50" y1="65" x2="570" y2="65" stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="45" y="69" textAnchor="end" fill="#64748b">350MW</text>

                <line x1="50" y1="120" x2="570" y2="120" stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="45" y="124" textAnchor="end" fill="#64748b">200MW</text>

                <line x1="50" y1="175" x2="570" y2="175" stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="45" y="179" textAnchor="end" fill="#64748b">75MW</text>

                <line x1="50" y1="210" x2="570" y2="210" stroke="#94a3b8" strokeWidth="1" />
                <text x="45" y="214" textAnchor="end" fill="#64748b">0MW</text>

                {/* X-Axis Persistence Bounds (0% to 100%) */}
                <text x="50" y="230" textAnchor="start" fill="#64748b">0% PERSISTENCE</text>
                <text x="180" y="230" textAnchor="middle" fill="#64748b">25%</text>
                <text x="310" y="230" textAnchor="middle" fill="#64748b">50%</text>
                <text x="440" y="230" textAnchor="middle" fill="#64748b">75%</text>
                <text x="570" y="230" textAnchor="end" fill="#64748b">100% REGULATED</text>

                {/* Permitted Flare Regime Shaded Polygon */}
                <rect
                  x="420"
                  y="130"
                  width="145"
                  height="70"
                  fill="rgba(14, 165, 233, 0.08)"
                  stroke="#0284c7"
                  strokeDasharray="4 4"
                  rx="4"
                />
                <text x="430" y="145" fill="#0284c7" fontWeight="bold" fontSize="9">
                  PERMITTED FLARE REGIME (&gt;85% CADASTRE)
                </text>

                {/* Agro / Forest Points */}
                {FRP_VS_PERSISTENCE_DATA.filter((p) => p.category === 'agro_forest').map((pt) => {
                  const cx = 50 + (pt.persistence / 100) * 520;
                  const cy = 210 - (pt.frp / 500) * 190;
                  return (
                    <circle
                      key={pt.id}
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      fill="#94a3b8"
                      opacity="0.75"
                      onMouseEnter={() => setHoveredScatterPoint(pt)}
                      onMouseLeave={() => setHoveredScatterPoint(null)}
                      className="cursor-pointer hover:opacity-100 hover:fill-slate-700 transition"
                    />
                  );
                })}

                {/* Permitted Flares (Sky Blue) */}
                {FRP_VS_PERSISTENCE_DATA.filter((p) => p.category === 'flare').map((pt) => {
                  const cx = 50 + (pt.persistence / 100) * 520;
                  const cy = 210 - (pt.frp / 500) * 190;
                  return (
                    <circle
                      key={pt.id}
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#0284c7"
                      stroke="#bae6fd"
                      strokeWidth="1"
                      onMouseEnter={() => setHoveredScatterPoint(pt)}
                      onMouseLeave={() => setHoveredScatterPoint(null)}
                      className="cursor-pointer hover:scale-125 transition-transform"
                    />
                  );
                })}

                {/* Emergency Point (Hazira / Red) */}
                {FRP_VS_PERSISTENCE_DATA.filter((p) => p.category === 'emergency').map((pt) => {
                  const cx = 50 + (pt.persistence / 100) * 520;
                  const cy = 210 - (pt.frp / 500) * 190;
                  return (
                    <g key={pt.id}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="10"
                        fill="#ef4444"
                        opacity="0.25"
                        className="animate-ping origin-center"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="6"
                        fill="#dc2626"
                        stroke="#fee2e2"
                        strokeWidth="1.5"
                        onMouseEnter={() => setHoveredScatterPoint(pt)}
                        onMouseLeave={() => setHoveredScatterPoint(null)}
                        className="cursor-pointer"
                      />
                      <text x={cx + 10} y={cy + 4} fill="#b91c1c" fontWeight="bold" fontSize="10">
                        HAZIRA 425.4 MW SPIKE
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip */}
              {hoveredScatterPoint && (
                <div className="absolute top-2 right-2 bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono shadow-lg z-10 max-w-xs text-slate-900">
                  <div className="font-bold text-slate-900">{hoveredScatterPoint.name}</div>
                  <div className="text-slate-600 mt-0.5">
                    FRP: <span className="text-sky-700 font-bold">{hoveredScatterPoint.frp} MW</span> •
                    Persistence: <span className="text-slate-900 font-bold">{hoveredScatterPoint.persistence}%</span>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase mt-1">
                    Class: {hoveredScatterPoint.category}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Donut + Bayesian Persistence Profile */}
          <div className="lg:col-span-4 p-6 bg-white rounded-xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Thermal Archetype Share
                </h4>
                <span className="text-xs font-mono text-slate-500">30D CUMULATIVE</span>
              </div>

              {/* Donut Chart Center */}
              <div className="py-4 flex justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Circle Background */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="3.5"
                    />
                    {/* Agro (84.8%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3.5"
                      strokeDasharray="84.8, 100"
                    />
                    {/* Forest (12.1%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3.5"
                      strokeDasharray="12.1, 100"
                      strokeDashoffset="-84.8"
                    />
                    {/* Flare (3.0%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.5"
                      strokeDasharray="3.0, 100"
                      strokeDashoffset="-96.9"
                    />
                    {/* Emergency (0.1%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="3.5"
                      strokeDasharray="0.3, 100"
                      strokeDashoffset="-99.9"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-extrabold text-slate-900">28.4k</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      DETECTIONS
                    </span>
                  </div>
                </div>
              </div>

              {/* Donut Legend Items */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                    <span className="text-slate-700">Agricultural Biomass</span>
                  </div>
                  <span className="font-bold text-slate-900">84.8% (24,150)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                    <span className="text-slate-700">Forest Canopy Fires</span>
                  </div>
                  <span className="font-bold text-slate-900">12.1% (3,447)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-sky-500"></span>
                    <span className="text-slate-700">Permitted Industrial Flares</span>
                  </div>
                  <span className="font-bold text-slate-900">3.0% (855)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-red-500"></span>
                    <span className="text-red-600 font-bold">Industrial Emergencies</span>
                  </div>
                  <span className="font-bold text-red-600">0.1% (3)</span>
                </div>
              </div>
            </div>

            {/* Temporal Persistence Distribution (Bayesian Prior Histogram) */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">PERSISTENCE PROFILE</span>
                <span className="text-sky-700 font-bold text-[11px] tracking-wider">BAYESIAN PRIOR</span>
              </div>

              {/* Bar distribution */}
              <div className="h-16 flex items-end gap-1.5 pt-2">
                <div className="flex-1 bg-slate-300 h-[85%] rounded-t" title="0% (Transient)"></div>
                <div className="flex-1 bg-slate-200 h-[35%] rounded-t"></div>
                <div className="flex-1 bg-slate-200 h-[15%] rounded-t"></div>
                <div className="flex-1 bg-slate-200 h-[8%] rounded-t"></div>
                <div className="flex-1 bg-slate-200 h-[10%] rounded-t"></div>
                <div className="flex-1 bg-slate-200 h-[18%] rounded-t"></div>
                <div className="flex-1 bg-slate-300 h-[28%] rounded-t"></div>
                <div className="flex-1 bg-sky-600 h-[70%] rounded-t" title="100% (Static Stack)"></div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 uppercase">
                <span>0% (Transient)</span>
                <span>50%</span>
                <span className="text-sky-700 font-bold">100% (Static Stack)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Comprehensive Classified Observation Table */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 shadow-xs">
          {/* Table Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter audit register by Site Cadastre, Coordinate EPSG, or Incident Ref..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <select
                value={archetypeFilter}
                onChange={(e) => setArchetypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="all">Archetype: All Classifications</option>
                <option value="emergency">Critical Industrial Emergency</option>
                <option value="flare">Permitted Continuous Flare</option>
                <option value="forest">Forest Canopy Fire</option>
                <option value="agro">Agricultural Biomass</option>
              </select>

              <select
                value={sensorFilter}
                onChange={(e) => setSensorFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="all">Sensor: All FIRMS Feeds</option>
                <option value="viirs">VIIRS 375m (SNPP / NOAA)</option>
                <option value="modis">MODIS 1km (Aqua / Terra)</option>
              </select>

              <button
                onClick={handleRefresh}
                className={`px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1.5 transition ${
                  isRefreshing ? 'opacity-50' : ''
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 text-sky-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-xs uppercase tracking-wider">Refresh Feed</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-lg border border-slate-200 overflow-x-auto bg-white">
            <table className="w-full text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 text-left whitespace-nowrap">INCIDENT REF / TIME</th>
                  <th className="py-3 px-3 text-left whitespace-nowrap">CADASTRE &amp; GEO LOCATION</th>
                  <th className="py-3 px-3 text-left whitespace-nowrap">SENSOR FUSION</th>
                  <th className="py-3 px-3 text-right whitespace-nowrap">PEAK FRP</th>
                  <th className="py-3 px-3 text-left whitespace-nowrap">PERSISTENCE PROB</th>
                  <th className="py-3 px-3 text-left whitespace-nowrap">AI CLASSIFICATION</th>
                  <th className="py-3 px-3 text-left whitespace-nowrap">INTER-AGENCY DIRECTIVES</th>
                  <th className="py-3 px-3 text-right whitespace-nowrap">DOSSIER ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredRows.map((item) => {
                  const isEmergency = item.archetype === 'emergency';
                  const isFlare = item.archetype === 'flare';
                  const isForest = item.archetype === 'forest';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      {/* Incident Ref & Time */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          {isEmergency && <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                          <span>{item.id}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {item.detectionTimeIst}
                        </div>
                      </td>

                      {/* Cadastre & Location */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {item.district}, {item.state} • Cadastre #{item.osmPolygonId}
                        </div>
                      </td>

                      {/* Sensor Fusion */}
                      <td className="py-3 px-3">
                        <div className="text-slate-800 font-semibold">{item.satellite}</div>
                        <div className="text-[10px] text-slate-500">I-4 (3.74µm): {item.brightnessTempK} K</div>
                      </td>

                      {/* FRP */}
                      <td className="py-3 px-3 text-right">
                        <span className={`text-sm font-bold ${isEmergency ? 'text-red-600' : 'text-slate-900'}`}>
                          {item.frpMw} MW
                        </span>
                        <div className="text-[10px] text-slate-500">{item.spikeFactor}x baseline</div>
                      </td>

                      {/* Persistence Prob */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isEmergency ? 'bg-red-500' : isFlare ? 'bg-sky-600' : 'bg-slate-400'}`}
                              style={{ width: `${Math.round(item.persistenceProb * 100)}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{Math.round(item.persistenceProb * 100)}%</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {item.persistenceProb > 0.8 ? 'Permanent Stack' : 'Transient/Acute'}
                        </div>
                      </td>

                      {/* AI Classification */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isEmergency
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : isFlare
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : isForest
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {isEmergency ? 'P1 EMERGENCY' : item.archetype.toUpperCase()}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">Conf: {item.confidenceScore}%</div>
                      </td>

                      {/* Inter-Agency Directives */}
                      <td className="py-3 px-3 max-w-xs truncate text-[11px] text-slate-600">
                        {item.interAgencyDirectives}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenDossier(item)}
                            className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition border border-slate-200 shadow-xs"
                          >
                            Inspect
                          </button>
                          {isEmergency && (
                            <button
                              onClick={() => onOpenDispatch(item)}
                              className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs"
                            >
                              Dispatch
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inter-Agency Regulatory Audit & Pass Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Statutory Reports */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Statutory Regulatory Packages</h3>
              </div>
              <p className="text-xs text-slate-600">
                Generate cryptographically certified spatial dossiers for statutory environmental compliance audits.
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">CPCB Industrial Flare Ledger</div>
                    <div className="text-[10px] text-slate-500">Form 4B • Section 21 Air Act</div>
                  </div>
                  <button
                    onClick={() => alert('Exporting CPCB Industrial Flare Emission Ledger CSV...')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition border border-slate-200 shadow-xs"
                  >
                    Export
                  </button>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">State Forest Fire Perimeter Shapefile</div>
                    <div className="text-[10px] text-slate-500">ESRI Shapefile • WGS-84 UTM-43N</div>
                  </div>
                  <button
                    onClick={() => alert('Downloading State Forest Department Shapefile ZIP (UTM-43N)...')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition border border-slate-200 shadow-xs"
                  >
                    ZIP (SHP)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Automated Intelligence Dispatch */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Automated Intelligence Dispatch</h3>
              </div>
              <p className="text-xs text-slate-600">
                Real-time pipeline subscriptions for inter-agency emergency responders and regional environmental authorities.
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Daily 06:00 IST Executive Briefing</div>
                    <div className="text-[10px] text-slate-500">Sent to Cabinet Sec &amp; MoEFCC Desk</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    ACTIVE
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Tier-1 Emergency Webhook</div>
                    <div className="text-[10px] text-slate-500">SMS + HTTPS JSON to State Emergency Ops</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase tracking-wider">
                    CRITICAL PASS
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Agro-Burn Stubble Cloud Feed</div>
                    <div className="text-[10px] text-slate-500">Periodic batch sync to CAQM Monitor</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                    HOURLY BATCH
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('PGP Encryption and API Webhook Key configuration opened.')}
              className="w-full py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-center mt-2 transition text-xs border border-slate-200"
            >
              Configure Dispatch Endpoints &amp; PGP Keys
            </button>
          </div>

          {/* Card 3: Constellation Pass Matrix */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Constellation Pass Matrix</h3>
              </div>
              <p className="text-xs text-slate-600">
                Orbital overpass schedules providing active multispectral coverage for the Indian subcontinent.
              </p>

              <div className="space-y-2 pt-1">
                {CONSTELLATION_PASSES.map((pass, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        <span>{pass.satellite} • {pass.instrument}</span>
                      </div>
                      <span className="font-bold text-sky-700 text-xs">{pass.nextPassIn}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span>{pass.resolution}</span>
                      <span>Overpass: {pass.overpassRegion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Downlink: Shadnagar NRSC</span>
              <span className="text-emerald-600 font-semibold">SNR: 28.4 dB (Optimal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-4 px-6 text-xs font-mono text-slate-600">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">NTRO // GTID</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">National Technical Research Organisation • Geospatial Thermal Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>LATENCY: 42ms</span>
            <span>•</span>
            <span>REF: WGS-84 / EPSG:4326</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">NASA FIRMS AUTHENTICATED</span>
            <span>•</span>
            <span>&copy; 2025 Government of India.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
