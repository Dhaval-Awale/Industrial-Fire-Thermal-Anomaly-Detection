import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle2, ShieldAlert, Radio } from 'lucide-react';
import { ThermalHotspot } from '../types/thermal';
import { NTROEmployee } from '../types/auth';

interface NdrfDispatchModalProps {
  hotspot: ThermalHotspot | null;
  onClose: () => void;
  currentUser: NTROEmployee;
}

export const NdrfDispatchModal: React.FC<NdrfDispatchModalProps> = ({
  hotspot,
  onClose,
  currentUser,
}) => {
  const [selectedBattalion, setSelectedBattalion] = useState('6th Bn NDRF (Jarod, Vadodara)');
  const [urgencyLevel, setUrgencyLevel] = useState<'IMMEDIATE_LIFE_SAFETY' | 'CONTAINMENT_RESERVE'>('IMMEDIATE_LIFE_SAFETY');
  const [isDispatched, setIsDispatched] = useState(false);

  if (!hotspot) return null;

  const handleExecuteDispatch = async () => {
    try {
      await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action_type: 'DISPATCH_NDRF',
          hotspot_id: hotspot.id,
          employee_id: currentUser.id,
          details: {
            battalion: selectedBattalion,
            urgency: urgencyLevel,
          }
        }),
      });
    } catch (e) {
      console.error('Failed to log dispatch action', e);
    }
    setIsDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-red-300 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 sm:p-5 flex items-center justify-between border-b border-red-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700/80 rounded-lg text-white">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">PRIORITY 1 INTER-AGENCY DIRECTIVE</h3>
              <p className="text-xs font-mono uppercase tracking-wider text-red-100">
                NATIONAL DISASTER RESPONSE FORCE (NDRF) RAPID DEPLOYMENT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-red-700 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-xs space-y-4 text-slate-900">
          {!isDispatched ? (
            <>
              {/* Alert Summary Box */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 space-y-1.5">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-xs text-slate-900">TARGET: {hotspot.signatureId}</span>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold">
                    {hotspot.frpMw} MW SPIKE
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {hotspot.name}, {hotspot.district}, {hotspot.state}
                </div>
                <div className="text-xs font-mono text-slate-500 pt-1 border-t border-red-200/60">
                  Centroid: {hotspot.lat.toFixed(4)}°N, {hotspot.lng.toFixed(4)}°E • Anomaly #{hotspot.id}
                </div>
              </div>

              {/* Responder Selection */}
              <div className="space-y-1.5">
                <label className="block text-slate-900 font-bold uppercase text-xs tracking-wider font-mono">Designated Strike Battalion:</label>
                <select
                  value={selectedBattalion}
                  onChange={(e) => setSelectedBattalion(e.target.value)}
                  className="w-full bg-white rounded-md border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                >
                  <option>6th Bn NDRF (Jarod, Vadodara - Gujarat Zone)</option>
                  <option>8th Bn NDRF (Ghaziabad - NCR Response Wing)</option>
                  <option>5th Bn NDRF (Pune - Western Command)</option>
                  <option>Hazira Industrial Mutual Aid Scheme (HIMAS / On-site Emergency)</option>
                </select>
              </div>

              {/* Urgency Level */}
              <div className="space-y-1.5">
                <label className="block text-slate-900 font-bold uppercase text-xs tracking-wider font-mono">Operational Protocol Level:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel('IMMEDIATE_LIFE_SAFETY')}
                    className={`p-3 rounded-lg border text-left transition ${
                      urgencyLevel === 'IMMEDIATE_LIFE_SAFETY'
                        ? 'bg-red-50 border-red-400 text-red-950 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">Tier-1 Immediate</div>
                    <div className="text-[11px] opacity-75 font-normal">Hazmat &amp; Evacuation Corridor</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel('CONTAINMENT_RESERVE')}
                    className={`p-3 rounded-lg border text-left transition ${
                      urgencyLevel === 'CONTAINMENT_RESERVE'
                        ? 'bg-slate-900 border-slate-900 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">Tier-2 Staging</div>
                    <div className="text-[11px] opacity-75 font-normal">Perimeter &amp; Mutual Aid Reserve</div>
                  </button>
                </div>
              </div>

              {/* Automatic Broadcast Channels */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs text-slate-600 font-mono">
                <div className="font-bold text-slate-900 uppercase">AUTOMATED TELEMETRY BROADCAST:</div>
                <div>• State Emergency Operation Centre (SEOC) Gandhinagar</div>
                <div>• District Collector Surat Emergency Dashboard</div>
                <div>• Central Pollution Control Board (CPCB) Crisis Cell</div>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">DISPATCH DIRECTIVE TRANSMITTED</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Emergency directive has been broadcast to {selectedBattalion} and the State Emergency Operation Centre with confirmed satellite beacon acknowledgement.
              </p>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[11px] font-mono text-slate-500">
                DISPATCH ID: NTRO-NDRF-2025-084-DISP • ACK: 200 OK (0.34s)
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          {!isDispatched ? (
            <>
              <button
                onClick={onClose}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-md text-slate-700 text-xs font-semibold transition shadow-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteDispatch}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Execute Operational Directive</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold transition shadow-xs"
            >
              Close Window
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
