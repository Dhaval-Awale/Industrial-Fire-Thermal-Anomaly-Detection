import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  Satellite,
  UserCheck,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle2,
  Fingerprint,
  BadgeCheck,
  Hash,
  Binary,
} from 'lucide-react';
import { NTROEmployee } from '../types/auth';
import { VERIFIED_NTRO_EMPLOYEES } from '../data/mockEmployees';

interface LoginPageProps {
  onLoginSuccess: (employee: NTROEmployee) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [uniqueCode, setUniqueCode] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleQuickSelect = (emp: NTROEmployee) => {
    setSelectedPresetId(emp.id);
    setUniqueCode(emp.uniqueCode);
    setPasscode(emp.passcode);
    setErrorMessage('');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict to digits only, maximum 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setUniqueCode(digitsOnly);
    setErrorMessage('');
  };

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict to digits only, maximum 5 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPasscode(digitsOnly);
    setErrorMessage('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (uniqueCode.length !== 10) {
      setErrorMessage(
        `INVALID EMPLOYEE CODE: Must be exactly 10 digits (currently ${uniqueCode.length}/10 digits entered).`
      );
      return;
    }

    if (passcode.length !== 5) {
      setErrorMessage(
        `INVALID PASSCODE: Must be exactly 5 digits (currently ${passcode.length}/5 digits entered).`
      );
      return;
    }

    // Lookup employee by 10-digit unique code
    const matchedEmployee = VERIFIED_NTRO_EMPLOYEES.find(
      (emp) => emp.uniqueCode === uniqueCode
    );

    if (!matchedEmployee || matchedEmployee.passcode !== passcode) {
      setErrorMessage(
        'SECURITY EXCEPTION [ERR-SEC-403]: Authentication failed. The 10-digit unique code and 5-digit passcode do not match any verified NTRO personnel record. Incident logged under Section 43/66 of IT Act 2000.'
      );
      return;
    }

    // Simulate high-security multi-tier authentication sequence
    setIsAuthenticating(true);
    setHandshakeStep('Verifying 10-Digit Unique Personnel Token with NTRO Central Server...');

    setTimeout(() => {
      setHandshakeStep('Validating 5-Digit Security Passcode & Cryptographic Hash...');
    }, 600);

    setTimeout(() => {
      setHandshakeStep('Decrypting NASA FIRMS WMS Ingest Channels & Cadastral Cache...');
    }, 1200);

    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess(matchedEmployee);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white font-sans relative overflow-x-hidden">
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[130px] pointer-events-none"></div>

      {/* Top Directorate Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-6 sm:px-12 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-sm">NTRO</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-semibold text-slate-300">NATIONAL TECHNICAL RESEARCH ORGANISATION</span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              GOVERNMENT OF INDIA // PRIME MINISTER'S OFFICE
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SECURE AUTH GATEWAY: ACTIVE</span>
          </div>
          <span className="text-slate-500">REV 4.2</span>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Security Notice & Fast Personnel Selection */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-700/50 text-sky-300 text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>RESTRICTED PERSONNEL ACCESS</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                NTRO Employee Portal
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Access required: <strong>10-digit unique employee code</strong> and <strong>5-digit passcode</strong> issued by the NTRO Security Directorate.
              </p>

              {/* Verified Duty Officers (Fast Selection) */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <span>Verified Officer Roster</span>
                  <span className="text-[10px] text-sky-400">Click to Autofill</span>
                </div>

                <div className="space-y-2.5">
                  {VERIFIED_NTRO_EMPLOYEES.map((emp) => {
                    const isSelected = selectedPresetId === emp.id;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => handleQuickSelect(emp)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group ${
                          isSelected
                            ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-500/40'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-sky-300 shrink-0 group-hover:border-sky-500 transition">
                          {emp.avatarInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-200 truncate group-hover:text-sky-300 transition">
                              {emp.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                              {emp.serviceId}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {emp.designation}
                          </p>

                          {/* Credentials Badges */}
                          <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-[10px]">
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              CODE: <strong className="text-white">{emp.uniqueCode}</strong>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              PIN: <strong className="text-amber-300">{emp.passcode}</strong>
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Official Legal Notice */}
            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-amber-400/90 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>OFFICIAL SECRETS ACT 1923</span>
              </div>
              <p className="leading-tight text-slate-400">
                Unauthorized access to NTRO geospatial servers is prohibited under Section 43/66 of the Information Technology Act 2000.
              </p>
            </div>
          </div>

          {/* Right Column: Secure Authentication Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-sky-400" />
                    <span>Personnel Credentials Gate</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enter your assigned 10-digit employee code and 5-digit passcode
                  </p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50 animate-pulse"></div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider block">Access Denied</span>
                    <p className="font-mono text-[11px] leading-relaxed text-red-200">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* 10-Digit Unique Employee Code Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                      10-Digit Unique Employee Code
                    </label>
                    <span className={`text-[11px] font-mono ${
                      uniqueCode.length === 10 ? 'text-emerald-400 font-bold' : 'text-slate-400'
                    }`}>
                      {uniqueCode.length}/10 digits
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={uniqueCode}
                      onChange={handleCodeChange}
                      placeholder="e.g. 1029384756"
                      maxLength={10}
                      disabled={isAuthenticating}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition font-mono tracking-widest"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Hash className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    Numbers only. Exactly 10 digits as printed on your NTRO Smart ID card.
                  </span>
                </div>

                {/* 5-Digit Security Passcode Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                      5-Digit Security Passcode
                    </label>
                    <span className={`text-[11px] font-mono ${
                      passcode.length === 5 ? 'text-emerald-400 font-bold' : 'text-slate-400'
                    }`}>
                      {passcode.length}/5 digits
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      inputMode="numeric"
                      value={passcode}
                      onChange={handlePasscodeChange}
                      placeholder="e.g. 58492"
                      maxLength={5}
                      disabled={isAuthenticating}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition font-mono tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    Confidential 5-digit numeric PIN assigned by Department IT Security.
                  </span>
                </div>

                {/* Remember Session Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-sky-600 focus:ring-0"
                    />
                    <span>Remember workstation session (8 Hours)</span>
                  </label>

                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 256-BIT ENCRYPTION
                  </span>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isAuthenticating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="font-mono text-xs">{handshakeStep}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>VERIFY 10-DIGIT CODE & 5-DIGIT PASSCODE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Status / Encryption Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>AUTHENTICATION METHOD: 10D-UID + 5D-PIN</span>
              </div>
              <div className="flex items-center gap-2">
                <span>GATEWAY NODE: DEL-CGO-09</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Operations Directorate Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 px-6 sm:px-12 py-3 text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-300">NTRO CYBER RECONNAISSANCE</span>
          <span>/</span>
          <span>CGO COMPLEX, LODHI ROAD, NEW DELHI - 110003</span>
        </div>
        <div>
          <span>HELPDESK EXT: 8492 // EMAIL: SOC-INTEL@NTRO.GOV.IN</span>
        </div>
      </footer>
    </div>
  );
};
