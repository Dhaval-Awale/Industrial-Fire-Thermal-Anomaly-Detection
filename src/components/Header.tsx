import React, { useEffect, useState } from 'react';
import { Radio, Clock, AlertTriangle, ShieldCheck, User, Satellite, Key, LogOut, ChevronDown } from 'lucide-react';
import { NTROEmployee } from '../types/auth';

interface HeaderProps {
  currentTab: 'overview' | 'map' | 'analytics';
  onTabChange: (tab: 'overview' | 'map' | 'analytics') => void;
  onOpenSettings?: () => void;
  currentUser?: NTROEmployee | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  currentUser,
  onLogout,
}) => {
  const [istTime, setIstTime] = useState<string>('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

          {/* User Profile & Session Controls */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono transition group"
                title="View Personnel Credentials"
              >
                <div className="w-6 h-6 rounded bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-bold text-slate-200 leading-none group-hover:text-sky-300 transition">
                    {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1] || ''}
                  </div>
                  <div className="text-[9px] text-sky-400 font-mono leading-tight mt-0.5">
                    {currentUser.serviceId}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
              </button>

              {/* Profile Dropdown Popover */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 text-xs space-y-3 font-sans">
                    <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="font-bold text-white text-sm">
                          {currentUser.name}
                        </div>
                        <div className="text-slate-400 text-xs">
                          {currentUser.designation}
                        </div>
                        <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                          {currentUser.nicEmail}
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 shrink-0">
                        {currentUser.serviceId}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">EMPLOYEE CODE:</span>
                        <span className="text-sky-300 font-bold tracking-wider">{currentUser.uniqueCode}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">CLEARANCE:</span>
                        <span className="text-emerald-400 font-bold">{currentUser.clearanceLevel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">DIVISION:</span>
                        <span className="text-slate-300 truncate max-w-[180px] text-right" title={currentUser.division}>
                          {currentUser.division}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">STATION:</span>
                        <span className="text-slate-300 truncate max-w-[180px] text-right" title={currentUser.station}>
                          {currentUser.station}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        SESSION ACTIVE // TLS 1.3
                      </span>
                      {onLogout && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileMenu(false);
                            onLogout();
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-300 text-xs font-semibold transition"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-md border border-slate-700 bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white cursor-pointer transition">
              <User className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Sub-Banner: Institutional Credentials */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 sm:px-8 py-1.5 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">GOI</span>
          <span>GOVERNMENT OF INDIA</span>
          <span className="text-slate-600">/</span>
          <span>GEOSPATIAL THERMAL INTELLIGENCE DIRECTORATE</span>
          {currentUser && (
            <>
              <span className="text-slate-600 hidden md:inline">/</span>
              <span className="text-sky-400 font-semibold hidden md:inline">{currentUser.division}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>SECURITY TIER: {currentUser ? currentUser.clearanceLevel : 'AUTHORIZED LEVEL 1'}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">SPACEBORNE SYNC: NOMINAL</span>
        </div>
      </div>
    </header>
  );
};
