/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { TacticalMapView } from './components/TacticalMapView';
import { AnalyticsView } from './components/AnalyticsView';
import { IncidentDossierModal } from './components/IncidentDossierModal';
import { NdrfDispatchModal } from './components/NdrfDispatchModal';
import { LoginPage } from './components/LoginPage';
import { ThermalHotspot } from './types/thermal';
import { NTROEmployee } from './types/auth';
import { HOTSPOTS_DATA } from './data/mockHotspots';
import { VERIFIED_NTRO_EMPLOYEES } from './data/mockEmployees';

export default function App() {
  const [currentUser, setCurrentUser] = useState<NTROEmployee | null>(() => {
    // Check if employee session is stored in localStorage
    try {
      const saved = localStorage.getItem('ntro_auth_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved NTRO session', e);
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState<'overview' | 'map' | 'analytics'>('map');
  const [dossierHotspot, setDossierHotspot] = useState<ThermalHotspot | null>(null);
  const [dispatchHotspot, setDispatchHotspot] = useState<ThermalHotspot | null>(null);

  const handleLoginSuccess = (employee: NTROEmployee) => {
    setCurrentUser(employee);
    try {
      localStorage.setItem('ntro_auth_session', JSON.stringify(employee));
    } catch (e) {
      console.error('Failed to persist NTRO session', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ntro_auth_session');
    } catch (e) {
      console.error('Failed to clear NTRO session', e);
    }
  };

  const handleOpenDossier = (hotspot: ThermalHotspot) => {
    setDossierHotspot(hotspot);
  };

  const handleOpenDispatch = (hotspot: ThermalHotspot) => {
    setDispatchHotspot(hotspot);
  };

  // If unauthenticated, show the classified NTRO Employee Login Portal
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Directorate Header & Sub-Bar */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Tab Screen Area */}
      <main className="flex-1 w-full flex flex-col">
        {currentTab === 'overview' && (
          <OverviewView onNavigateToMap={() => setCurrentTab('map')} />
        )}
        {currentTab === 'map' && (
          <TacticalMapView
            onOpenDossier={handleOpenDossier}
            onOpenDispatch={handleOpenDispatch}
          />
        )}
        {currentTab === 'analytics' && (
          <AnalyticsView
            onOpenDossier={handleOpenDossier}
            onOpenDispatch={handleOpenDispatch}
          />
        )}
      </main>

      {/* Operations Directorate Footer */}
      <footer className="border-t border-slate-200 py-3.5 px-6 sm:px-12 bg-white flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-wider uppercase text-slate-900">NTRO / GOI</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600">FIRMS-OSM THERMAL ANOMALY CLASSIFICATION SYSTEM</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-sky-700 font-semibold hidden sm:inline">PROTOCOL REV 4.2</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-700">ACTIVE TELEMETRY NOMINAL</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500">API KEY AUTHENTICATED: 7e80...2782</span>
        </div>
      </footer>

      {/* Modals */}
      <IncidentDossierModal
        hotspot={dossierHotspot}
        onClose={() => setDossierHotspot(null)}
        onDispatch={handleOpenDispatch}
      />

      <NdrfDispatchModal
        hotspot={dispatchHotspot}
        onClose={() => setDispatchHotspot(null)}
      />
    </div>
  );
}
