import React from 'react';
import { X, Printer, Download, ShieldCheck, AlertTriangle, Building2, TreePine, Tractor, CheckCircle2 } from 'lucide-react';
import { ThermalHotspot } from '../types/thermal';

interface IncidentDossierModalProps {
  hotspot: ThermalHotspot | null;
  onClose: () => void;
  onDispatch?: (hotspot: ThermalHotspot) => void;
}

export const IncidentDossierModal: React.FC<IncidentDossierModalProps> = ({
  hotspot,
  onClose,
  onDispatch,
}) => {
  if (!hotspot) return null;

  const isEmergency = hotspot.archetype === 'emergency';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-white text-slate-900 p-4 sm:p-5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isEmergency ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-wide text-slate-900">
                  GEOSPATIAL INTELLIGENCE DOSSIER
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-xs font-mono font-bold">
                  {hotspot.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                NTRO SATELLITE OPERATIONS • CLASSIFICATION PROTOCOL REV: 4.2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-900">
          {/* Classification Banner */}
          <div
            className={`p-4 rounded-lg border flex flex-wrap items-center justify-between gap-4 ${
              isEmergency
                ? 'bg-red-50 border-red-200 text-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-wider block text-red-600">
                VERIFIED AI TAXONOMY ASSESSMENT
              </span>
              <div className="text-xl font-bold text-slate-900 mt-0.5">
                {isEmergency
                  ? 'CRITICAL INDUSTRIAL EMERGENCY (TIER-1 CAT)'
                  : hotspot.archetype === 'flare'
                  ? 'PERMITTED CONTINUOUS INDUSTRIAL FLARE'
                  : hotspot.archetype === 'forest'
                  ? 'PROTECTED FOREST CANOPY WILDFIRE'
                  : 'AGRICULTURAL RESIDUE BIOMASS BURN'}
              </div>
              <div className="text-xs mt-1 text-slate-600">
                Confidence: {hotspot.confidenceScore}% • Anomaly Factor: {hotspot.spikeFactor}x historical baseline
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider block text-slate-500 font-mono">Persistence Probability</span>
              <span className="text-2xl font-mono font-bold text-red-600">{Math.round(hotspot.persistenceProb * 100)}%</span>
            </div>
          </div>

          {/* Incident Overview & Geodetics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-200 pb-1 font-mono">
                Site &amp; Cadastre Coordinates
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Site Designation:</span>
                  <span className="font-bold text-slate-900">{hotspot.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Centroid EPSG:4326:</span>
                  <span className="font-mono font-bold text-slate-800">{hotspot.lat.toFixed(4)}°N, {hotspot.lng.toFixed(4)}°E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">District &amp; State:</span>
                  <span className="text-slate-800">{hotspot.district}, {hotspot.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cadastre Polygon ID:</span>
                  <span className="font-mono font-bold text-sky-700">{hotspot.osmPolygonId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Zoning Designation:</span>
                  <span className="text-slate-800">{hotspot.landCoverCadastre}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-200 pb-1 font-mono">
                Spaceborne Radiometry Telemetry
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Satellite Sensor:</span>
                  <span className="font-bold text-slate-900">{hotspot.satellite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Detection Overpass:</span>
                  <span className="font-mono font-bold text-slate-800">{hotspot.detectionTimeIst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fire Radiative Power:</span>
                  <span className="font-mono font-bold text-red-600">{hotspot.frpMw} MegaWatts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Brightness Temp (I-4):</span>
                  <span className="font-mono font-bold text-slate-900">{hotspot.brightnessTempK} Kelvin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">30-Day Baseline Avg:</span>
                  <span className="font-mono text-slate-800">{hotspot.baselineFrpMw} MW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Temporal Bayesian Persistence History */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider font-mono">
              30-Day Radiance Progression Profile
            </h4>
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <table className="w-full text-xs font-mono">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5 text-left">Date</th>
                    {hotspot.historical30Day.map((d, i) => (
                      <th key={i} className="p-2.5 text-right">{d.date}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold text-slate-800">FRP (MW)</td>
                    {hotspot.historical30Day.map((d, i) => (
                      <td
                        key={i}
                        className={`p-2.5 text-right font-semibold ${
                          i === hotspot.historical30Day.length - 1 && isEmergency
                            ? 'text-red-600 font-bold bg-red-50'
                            : 'text-slate-700'
                        }`}
                      >
                        {d.frp.toFixed(1)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Statutory Directives */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider font-mono">
              Inter-Agency Directives &amp; Automated Routing
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {hotspot.interAgencyDirectives}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>SHA-256 Cryptographic Audit Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-md text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Official Copy</span>
            </button>
            <button
              onClick={() => {
                alert(`Exporting Dossier #${hotspot.id} as signed PDF package...`);
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-md text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export PDF / JSON</span>
            </button>
          </div>

          {isEmergency && onDispatch && (
            <button
              onClick={() => {
                onClose();
                onDispatch(hotspot);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-bold flex items-center gap-2 transition shadow-xs"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Trigger NDRF Inter-Agency Dispatch</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
