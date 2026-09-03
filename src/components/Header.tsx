import React, { useEffect, useState } from 'react';
import { Radio, Clock, AlertTriangle, ShieldCheck, User, Satellite, Key } from 'lucide-react';

interface HeaderProps {
  currentTab: 'overview' | 'map' | 'analytics';
  onTabChange: (tab: 'overview' | 'map' | 'analytics') => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (UTC + 5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      setIstTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      {/* Primary Navigation Bar */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Organization Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sky-600 rounded-lg text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-lg leading-none">NTRO</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:block"></div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-sky-950 text-sky-400 border border-sky-800">
                Thermal Intel
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
                SEC-084 // OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-normal mt-0.5">
              Geospatial Thermal Intelligence & Industrial Fire Classification System
            </p>
          </div>
        </div>

        {/* Center: Main View Navigation */}
        <nav className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg p-1" id="main-nav-tabs">
          <button
            id="nav-tab-overview"
            onClick={() => onTabChange('overview')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentTab === 'overview'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Overview
          </button>
          <button
            id="nav-tab-map"
            onClick={() => onTabChange('map')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentTab === 'map'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Tactical Map
          </button>
          <button
            id="nav-tab-analytics"
            onClick={() => onTabChange('analytics')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentTab === 'analytics'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Analytics & Dossiers
          </button>
        </nav>

        {/* Right: Operational Status Pillboxes */}
        <div className="flex items-center gap-2.5">
          {/* NASA FIRMS Link Indicator with API Key authentication status */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">FIRMS MAP KEY ACTIVE</span>
            <span className="text-[10px] text-emerald-300/60 font-normal">[7e80...2782]</span>
          </div>

          {/* Real-time IST Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-700 bg-slate-800 text-slate-200 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>IST {istTime || '05:30:42'}</span>
          </div>

          {/* Alert Level Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-red-600 text-white text-xs font-bold font-mono uppercase shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-white" />
            <span>ALERT LEVEL 2</span>
          </div>

          {/* User Profile */}
          <div className="w-8 h-8 rounded-md border border-slate-700 bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white cursor-pointer transition">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Sub-Banner: Institutional Credentials */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 sm:px-8 py-1.5 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">GOI</span>
          <span>GOVERNMENT OF INDIA</span>
          <span className="text-slate-600">/</span>
          <span>GEOSPATIAL THERMAL INTELLIGENCE DIRECTORATE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>SECURITY TIER: AUTHORIZED LEVEL 1</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">SPACEBORNE SYNC: NOMINAL</span>
        </div>
      </div>
    </header>
  );
};
