import React from 'react';
import {
  Radio,
  Layers,
  TrendingUp,
  ArrowRight,
  Flame,
  Satellite,
  ShieldCheck,
  Zap,
  Building2,
  TreePine,
  Tractor,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react';

interface OverviewViewProps {
  onNavigateToMap: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateToMap }) => {
  return (
    <div className="w-full pb-16 bg-slate-50 text-slate-900">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-8 space-y-12">
        {/* Top Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title & Key Capabilities */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs font-mono text-slate-700 shadow-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="font-semibold text-slate-900">FIRMS-OSM SENSOR FUSION ENGINE v4.2</span>
              <span className="text-slate-300">/</span>
              <span className="text-emerald-600 font-mono font-semibold">AUTHENTICATED LIVE STREAM</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-sky-700">
                Spaceborne Radiometry Protocol // 2025
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Satellite Thermal Anomaly <br />
                <span className="text-sky-600">
                  &amp; Industrial Fire Classification System
                </span>
              </h1>
            </div>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Automated spaceborne thermal detection and machine learning classification to isolate and separate
              catastrophic industrial emergencies from permitted routine factory flares, natural forest fires,
              and seasonal agricultural crop stubble burning in near-real time.
            </p>

            {/* 3 Core Architecture Features */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition shadow-xs">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg shrink-0 border border-sky-200 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-sky-600 uppercase tracking-wider">RADIOMETRIC INGEST</div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">NASA FIRMS Radiometry Ingest</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Continuous orbital ingest of MODIS and VIIRS (SNPP &amp; NOAA-20) 375m pixels calculating Fire
                    Radiative Power (FRP in Megawatts) and 3.9µm/11µm spectral brightness temperatures with authenticated MapServer WMS.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition shadow-xs">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 border border-emerald-200 mt-0.5">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider">SPATIAL CADASTRAL JOIN</div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">OpenStreetMap &amp; AI Cadastral Cross-Referencing</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Spatial polygonal indexing evaluates hotspot coordinates against registered chemical plants,
                    refineries, industrial corridor halos, and land-use geometries.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-4 hover:border-slate-300 transition shadow-xs">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0 border border-purple-200 mt-0.5">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-purple-600 uppercase tracking-wider">TEMPORAL PERSISTENCE</div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">30-Day Temporal Baseline Analysis</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Recurrent thermal clustering distinguishes licensed perpetual flare stacks with constant heat
                    emissions from explosive baseline violations and single-pass burns.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-launch-map-btn"
                onClick={onNavigateToMap}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2.5 transition shadow-xs"
              >
                <span>Launch Tactical Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active geospatial canvas with NASA FIRMS WMS integration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Subsystem Telemetry Live Monitor */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              {/* Upper Telemetry HUD */}
              <div className="p-6 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="font-bold tracking-wider text-slate-900 uppercase text-xs">SUBSYSTEM TELEMETRY</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">NODE: DL-IND-01</span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">TARGET SECTOR</span>
                      <span className="font-bold text-slate-900 text-base">Northern Industrial Corridor &amp; Plains</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                      425.4 MW
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">COORDINATES:</span>
                      <span className="text-slate-800 font-semibold">28.6139° N, 77.2090° E</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">PASS RESOLUTION:</span>
                      <span className="text-slate-800 font-semibold">375m Ground IFOV</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">VIIRS SNPP / NOAA-20:</span>
                      <span className="text-emerald-600 font-semibold">STREAMING LIVE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">OSM Polygon Spatial Join:</span>
                      <span className="text-emerald-600 font-semibold">500m BUFFER OK</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Temporal Flare Persistence:</span>
                      <span className="text-sky-600 font-semibold">BAYESIAN ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Telemetry HUD Details */}
              <div className="bg-slate-50 p-6 space-y-2.5 font-mono text-xs border-t border-slate-200">
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 uppercase text-[11px]">SUBSYSTEM HEALTH:</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    100% OPERATIONAL
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 uppercase text-[11px]">GROUND RESOLUTION:</span>
                  <span className="text-slate-800 font-semibold">375m (High-Res VIIRS)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 uppercase text-[11px]">NEXT SATELLITE OVERPASS:</span>
                  <span className="text-sky-700 font-bold">VIIRS-21 (in 0h 42m)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 uppercase text-[11px]">Active Sensor Channels:</span>
                  <span className="text-slate-700 font-semibold">M13 (4.0µm) / M15 (10.7µm)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 KPI Metrics Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1 hover:border-slate-300 transition shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 uppercase">
                <Flame className="w-4 h-4 text-red-600" />
                <span>HOTSPOTS TODAY</span>
              </div>
              <span className="text-xs font-mono text-slate-400">#01</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">1,842</div>
            <p className="text-xs text-slate-500 font-medium">Across 32 State Zones</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1 hover:border-slate-300 transition shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 uppercase">
                <Satellite className="w-4 h-4 text-sky-600" />
                <span>ORBITAL PASSES</span>
              </div>
              <span className="text-xs font-mono text-slate-400">#02</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">04</div>
            <p className="text-xs text-slate-500 font-medium">VIIRS / MODIS Constellation</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1 hover:border-slate-300 transition shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ACCURACY RATING</span>
              </div>
              <span className="text-xs font-mono text-slate-400">#03</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">98.4%</div>
            <p className="text-xs text-slate-500 font-medium">Validated vs Ground Cadastre</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1 hover:border-slate-300 transition shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 uppercase">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>ALERT DISPATCH</span>
              </div>
              <span className="text-xs font-mono text-slate-400">#04</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">&lt; 54s</div>
            <p className="text-xs text-slate-500 font-medium">Sub-minute Emergency Ingest</p>
          </div>
        </section>

        {/* Taxonomy Engine: Target Thermal Classification Archetypes */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-sky-700 uppercase block mb-1">
                TAXONOMY ENGINE • MULTI-CRITERIA DECISION MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Target Thermal Classification Archetypes
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                Every thermal anomaly detected by FIRMS is cross-evaluated using radiative power (FRP), historical recurrence, and cadastral boundaries.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs font-mono font-semibold text-slate-700 flex items-center gap-2 shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
              <span>4 Mutually Exclusive Classes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Archetype 1: Industrial Emergency */}
            <div className="p-5 bg-white rounded-xl border-2 border-red-500 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white uppercase tracking-wider">
                    CRITICAL TIER 1
                  </span>
                  <Zap className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Industrial Emergency
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Catastrophic explosion, tank rupture, or chemical facility fire drastically exceeding plant thermal envelope limits.
                </p>
                <div className="p-3 bg-red-50/60 rounded-lg border border-red-100 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">FRP Trigger:</span>
                    <span className="text-red-700 font-bold">&gt; 120 MW Spike</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Persistence:</span>
                    <span className="text-slate-900 font-semibold">Low Historical</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">OSM Layer:</span>
                    <span className="text-slate-900 font-bold">Industrial Facility</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-red-600 uppercase">
                <span>PRIORITY 1 DISPATCH</span>
                <span>NDRF / SDRF</span>
              </div>
            </div>

            {/* Archetype 2: Industrial Flare */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wider">
                    PERMITTED EMISSION
                  </span>
                  <Building2 className="w-4 h-4 text-sky-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                  Industrial Flare
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Routine, licensed emissions from petrochemical cracker units, refinery bleed stacks, and steel blast furnaces.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">FRP Range:</span>
                    <span className="text-slate-900 font-bold">15 - 85 MW Steady</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Persistence:</span>
                    <span className="text-slate-900 font-semibold">&gt; 95% Recurrence</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">OSM Layer:</span>
                    <span className="text-slate-900 font-bold">Refinery Stack</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-600 uppercase">
                <span>STATUS:</span>
                <span>Logged in Registry</span>
              </div>
            </div>

            {/* Archetype 3: Forest Fire */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                    CANOPY BIOME
                  </span>
                  <TreePine className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Forest Fire
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Wildfire or forest canopy burn across protected vegetative reserves, national wildlife parks, and mountain ridges.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">FRP Profile:</span>
                    <span className="text-slate-900 font-semibold">Dynamic Spread</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Spread Vector:</span>
                    <span className="text-slate-900 font-semibold">Wind-Driven</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">OSM Layer:</span>
                    <span className="text-slate-900 font-bold">Protected Forest</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-600 uppercase">
                <span>AGENCY ROUTING</span>
                <span>Forest Dept / FSI</span>
              </div>
            </div>

            {/* Archetype 4: Agricultural Burn */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                    AGRO RESIDUE
                  </span>
                  <Tractor className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Agricultural Burn
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Seasonal crop stubble burning across registered farmland plots in Punjab, Haryana, and the Indo-Gangetic basin.
                </p>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Burn Duration:</span>
                    <span className="text-slate-900 font-bold">&lt; 3 hr Transient</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">FRP Profile:</span>
                    <span className="text-slate-900 font-semibold">Low-Med Intensity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">OSM Layer:</span>
                    <span className="text-slate-900 font-bold">Arable Farmland</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-600 uppercase">
                <span>MONITORING</span>
                <span>CPCB Air Quality</span>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Workflow: Algorithmic Disambiguation Sequence */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-sky-700 uppercase block mb-1">
              VERIFICATION WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Algorithmic Disambiguation Sequence
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl font-medium">
              Automated four-stage classification pipeline executing synchronously upon orbital overpass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stage 01 */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-slate-300 transition shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-bold text-[10px] tracking-wider">
                    STAGE 01
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Orbital Radiance Catch</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  VIIRS (375m) and MODIS satellites capture mid-wave infrared radiance. Thermal points exceeding local noise threshold generate raw anomaly coordinates and MW radiance power.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Inputs: Brightness Temp + FRP
              </div>
            </div>

            {/* Stage 02 */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-slate-300 transition shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-bold text-[10px] tracking-wider">
                    STAGE 02
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">OSM Polygon Spatial Join</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Coordinates are matched against OpenStreetMap polygon layers: industrial cadastres, refinery stacks, forest reserves, and agricultural boundaries with a 500-meter buffer radius.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Buffer: 500m Cadastral Join
              </div>
            </div>

            {/* Stage 03 */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-slate-300 transition shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-bold text-[10px] tracking-wider">
                    STAGE 03
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">AI Baseline Comparison</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Neural heuristics check 30-day temporal persistence. Licensed refinery flares have regular emission profiles; sudden massive FRP surges signal an emergency breach.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Heuristic: Temporal Bayesian Model
              </div>
            </div>

            {/* Stage 04 */}
            <div className="p-5 bg-white rounded-xl border-2 border-red-500 space-y-3 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider">
                    STAGE 04
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Priority Directive Routing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Validated industrial emergencies generate instant Priority 1 dispatches to NDRF/SDRF disaster control centers. Agricultural and forest burns route to CPCB and Forest Services.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] font-mono text-red-600 font-bold uppercase tracking-wider">
                Latency: &lt; 54s Automated Dispatch
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner Call-to-Action */}
        <section className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-white text-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-mono font-bold tracking-wider uppercase text-sky-700">
              SPATIAL TELEMETRY CANVAS
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Ready to inspect thermal hotspots in real time?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Switch to the interactive tactical spatial canvas with multi-spectral satellite sensor overlays and authenticated NASA FIRMS feed.
            </p>
          </div>
          <button
            id="bottom-open-map-btn"
            onClick={onNavigateToMap}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2.5 shrink-0 transition shadow-xs"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Tactical Map</span>
          </button>
        </section>
      </div>
    </div>
  );
};
