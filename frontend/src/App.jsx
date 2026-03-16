import React, { useState, useRef } from 'react';
import './index.css';

/* ─── Shared Header ─────────────────────────────────────────────────────── */
function AppHeader({ variant = 'main', onBack }) {
  if (variant === 'results') {
    return (
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#223649] px-6 lg:px-20 py-4 bg-[#0a0f14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-[#0d7ff2] rounded flex items-center justify-center text-white shadow-[0_0_15px_rgba(13,127,242,0.4)]">
            <span className="material-symbols-outlined text-xl">shield_person</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight font-mono uppercase">
            PHISHGUARD_AI <span className="text-[#0d7ff2]/60 font-normal">v2.4</span>
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 h-10 bg-[#182634] border border-[#223649] rounded-lg text-slate-400 text-sm hover:text-white transition-colors font-mono"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            NEW SCAN
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#182634] border border-[#223649] text-slate-400">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-10 w-10 rounded-full bg-[#0d7ff2]/20 border border-[#0d7ff2]/40 flex items-center justify-center text-[#0d7ff2]">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </header>
    );
  }

  // main / error / loading header
  return (
    <header className="flex flex-col md:flex-row items-center justify-between border-b border-[#0d7ff2]/20 px-8 py-6 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-10 rounded-lg bg-[#0d7ff2]/10 text-[#0d7ff2] border border-[#0d7ff2]/30">
          <span className="material-symbols-outlined text-3xl">shield_with_heart</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-100">PhishGuard AI</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#0d7ff2]/70">
            Psychological Attack Vector Detection for Indian Users
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-[#0d7ff2]/10 transition-colors">
          <span className="material-symbols-outlined">history</span>
        </button>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-[#0d7ff2]/10 transition-colors text-[#0d7ff2]">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}

/* ─── Loading State ─────────────────────────────────────────────────────── */
function LoadingScreen({ step = 'analyzing', steps = [] }) {
  const defaultTextSteps = [
    { label: 'Uploading message buffer...', done: true },
    { label: 'Tokenising text patterns...', done: true },
    { label: 'Performing neural phishing analysis...', active: true },
    { label: 'Matching digital fingerprints...', pending: true },
  ];
  const defaultAudioSteps = [
    { label: 'Playing audio file...', done: true },
    { label: 'Capturing speech via microphone...', active: true },
    { label: 'Building transcript...', pending: true },
    { label: 'Sending to neural scanner...', pending: true },
  ];
  const displaySteps = steps.length ? steps : (step === 'reading' ? defaultAudioSteps : defaultTextSteps);
  const headline = step === 'reading' ? 'Reading audio...' : 'Analyzing...';
  const subtitle = step === 'reading' ? 'SPEECH RECOGNITION ACTIVE' : 'NEURAL SCAN IN PROGRESS';

  return (
    <div className="bg-[#0A0F1E] min-h-screen flex flex-col grid-bg">
      <AppHeader variant="main" />
      <main className="flex-1 flex flex-col md:flex-row px-4 lg:px-40 py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex flex-col gap-6">
          <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex gap-3 items-center">
              <div className="aspect-square bg-[#0d7ff2]/20 rounded-full size-12 flex items-center justify-center border border-[#0d7ff2]/30">
                <span className="material-symbols-outlined text-[#0d7ff2]">biotech</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-semibold leading-none mb-1">Lab Tech-083</h1>
                <p className="text-slate-400 text-xs font-mono">v2.4.0-STABLE</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1 mt-4">
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#0d7ff2] text-white shadow-lg shadow-[#0d7ff2]/20" href="#">
                <span className="material-symbols-outlined">search_check</span>
                <p className="text-sm font-medium">New Scan</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all" href="#">
                <span className="material-symbols-outlined">history</span>
                <p className="text-sm font-medium">Scan History</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all" href="#">
                <span className="material-symbols-outlined">encrypted</span>
                <p className="text-sm font-medium">Vault</p>
              </a>
              <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all" href="#">
                <span className="material-symbols-outlined">analytics</span>
                <p className="text-sm font-medium">Analytics</p>
              </a>
            </nav>
          </div>
          {/* Status Panel */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 font-mono text-[10px] space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">CPU LOAD</span>
              <span className="text-[#0d7ff2]">67%</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-[#0d7ff2] h-full w-[67%]"></div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ML ENGINE</span>
              <span className="text-[#0d7ff2]">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DATABASE</span>
              <span className="text-[#0d7ff2]">SYNCED</span>
            </div>
          </div>
        </aside>

        {/* Main loading content */}
        <section className="flex-1 flex flex-col">
          <div className="relative w-full min-h-[500px] bg-[#0A0F1E] rounded-xl border border-[#0d7ff2]/30 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 grid-bg-lines">
            <div className="scan-line"></div>
            <div className="relative z-10 flex flex-col items-center max-w-md w-full">
              <div className="w-48 h-48 mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-[#0d7ff2]/20 rounded-full animate-ping opacity-25"></div>
                <div className="absolute inset-4 border-2 border-[#0d7ff2]/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-8 border border-[#0d7ff2]/40 rounded-full"></div>
                <div className="bg-[#0d7ff2]/10 p-6 rounded-full border border-[#0d7ff2]/50 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[#0d7ff2] text-6xl leading-none">waves</span>
                </div>
              </div>
              <div className="text-center space-y-4 font-mono">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-white text-2xl font-bold tracking-wider uppercase mb-2">{headline}</h3>
                  <div className="flex gap-2 text-[#0d7ff2] font-bold">
                    <span className="animate-pulse">_</span>
                    <span>{subtitle}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-slate-400">
                  {displaySteps.map((step, i) => (
                    <p key={i} className={`flex items-center justify-center gap-2 ${step.active ? 'animate-pulse text-white font-semibold' : ''} ${step.pending ? 'opacity-30' : ''}`}>
                      <span className="material-symbols-outlined text-xs">
                        {step.done ? 'check_circle' : step.active ? 'sync' : 'radio_button_unchecked'}
                      </span>
                      <span>{step.label}</span>
                    </p>
                  ))}
                </div>
                <div className="w-64 h-1.5 bg-slate-800 rounded-full mt-6 mx-auto overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-[#0d7ff2] w-2/3 shadow-[0_0_8px_#0d7ff2]"></div>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-2">Process Sequence: 67% Complete</p>
              </div>
            </div>
            {/* HUD corners */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#0d7ff2]/50 flex flex-col">
              <span>LATENCY: 14MS</span>
              <span>ENC: AES-256</span>
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-[#0d7ff2]/50 text-right">
              <span>MODEL: PHISHv2.4</span>
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-600 flex gap-4">
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> SECURE</div>
              <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0d7ff2] animate-pulse"></span> PROCESSING</div>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-600 uppercase">
              Lab.Instance_402
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl border border-slate-800 bg-slate-900 flex items-start gap-4">
            <div className="p-2 bg-[#0d7ff2]/10 rounded text-[#0d7ff2]">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Deep Scan in Progress</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Our AI is checking for psychological manipulation tactics, linguistic patterns, and known phishing vectors. This usually takes 5–15 seconds.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── Error Screen ───────────────────────────────────────────────────────── */
function ErrorScreen({ message, onRetry, onBack }) {
  return (
    <div className="bg-[#0A0F1E] min-h-screen flex flex-col">
      <AppHeader variant="main" />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="error-glow bg-slate-900/40 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
              <div className="relative bg-[#0A0F1E] border border-red-500/30 p-4 rounded-full">
                <span className="material-symbols-outlined text-red-500 text-5xl leading-none">warning</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Something went wrong</h2>
            <p className="text-slate-400 font-mono text-sm mb-8">
              {message || 'An unexpected connection error occurred. Please try again.'}
            </p>
            <div className="w-full space-y-4">
              <button
                onClick={onRetry}
                className="skeuo-button w-full py-4 rounded-lg font-bold text-slate-100 border border-slate-700/50 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Retry Connection
              </button>
              <button
                onClick={onBack}
                className="w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
              >
                Go back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Bottom Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-800 px-6 py-3 rounded-full flex items-center gap-8 backdrop-blur-md shadow-2xl">
        <a className="text-slate-500 hover:text-[#0d7ff2] transition-colors flex flex-col items-center" href="#">
          <span className="material-symbols-outlined">grid_view</span>
        </a>
        <a className="text-slate-500 hover:text-[#0d7ff2] transition-colors flex flex-col items-center" href="#">
          <span className="material-symbols-outlined">history</span>
        </a>
        <a className="text-slate-500 hover:text-[#0d7ff2] transition-colors flex flex-col items-center" href="#">
          <span className="material-symbols-outlined">security</span>
        </a>
        <a className="text-slate-500 hover:text-[#0d7ff2] transition-colors flex flex-col items-center" href="#">
          <span className="material-symbols-outlined">settings</span>
        </a>
      </nav>
      <footer className="p-6 text-center pb-24">
        <p className="text-slate-600 text-xs font-mono">SYSTEM STATUS: <span className="text-red-500">DISCONNECTED</span></p>
      </footer>
    </div>
  );
}

/* ─── Results Dashboard (populated) ─────────────────────────────────────── */
function ResultsDashboard({ result, inputText, onBack, transcript }) {
  const isHighRisk = result?.riskLevel === 'HIGH_RISK';
  const isSuspicious = result?.riskLevel === 'SUSPICIOUS';
  const isSafe = result?.riskLevel === 'SAFE';

  const riskColor = isHighRisk ? 'text-red-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400';
  const riskBg = isHighRisk ? 'bg-red-500/10 border-red-500/30' : isSuspicious ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30';

  const confidence = result?.confidenceScore ?? 0;
  const tactics = result?.detectedTactics || [];
  const indicators = result?.indicators || [];
  const language = result?.detectedLanguage || 'Unknown';
  const tacticName = result?.manipulationTactic?.name || '—';
  const tacticExplanation = result?.manipulationTactic?.explanation || '';

  const lines = inputText ? inputText.split('\n') : [];

  return (
    <div className="bg-[#0a0f14] min-h-screen flex flex-col">
      <AppHeader variant="results" onBack={onBack} />
      <main className="px-6 lg:px-20 py-8 max-w-[1440px] mx-auto w-full">

        {/* Risk Banner */}
        <div className={`mb-8 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#161b22] shadow-lg ${isHighRisk ? 'glow-banner' : isSuspicious ? 'border-l-4 border-amber-500' : 'safe-banner'}`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${isHighRisk ? 'text-red-400 animate-pulse' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isSafe ? 'verified' : 'report'}
              </span>
              <span className={`font-mono font-bold text-sm uppercase tracking-widest ${riskColor}`}>
                {result?.riskLevel?.replace('_', ' ') || 'UNKNOWN'}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-mono">
              {isHighRisk ? 'High probability phishing attack detected — do not interact with this message.' :
               isSuspicious ? 'Suspicious patterns detected — exercise extreme caution.' :
               'No significant phishing indicators found — message appears legitimate.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`h-10 px-4 border rounded flex items-center justify-center font-mono text-sm font-bold ${riskColor} ${riskBg}`}>
              {confidence}% CONFIDENCE
            </div>
          </div>
        </div>

        {/* Transcript Panel — shown only for audio analysis */}
        {transcript && (
          <div className="mb-8 skeuo-card-dark rounded-xl flex flex-col">
            <div className="border-b border-[#223649] px-6 py-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#0d7ff2] text-lg">transcribe</span>
              <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest">Transcript_Buffer</h3>
            </div>
            <div className="p-6 max-h-44 overflow-y-auto font-mono text-sm text-slate-300 leading-relaxed custom-scrollbar">
              {transcript}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Tactic Card */}
            <div className="skeuo-card-dark rounded-xl p-1 overflow-hidden">
              <div className="bg-[#101922] p-6 rounded-lg border border-[#223649] flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0f14] rounded-lg border border-[#223649] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#0d7ff2]/30"></div>
                  <span className="material-symbols-outlined text-6xl text-[#1a2b3c]">fingerprint</span>
                  <div className="absolute bottom-4 left-4 right-4 h-2 bg-[#1a2b3c] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0d7ff2] shadow-[0_0_10px_#0d7ff2]" style={{ width: `${confidence}%` }}></div>
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-1 rounded bg-[#0d7ff2]/10 border border-[#0d7ff2]/30 text-[10px] font-mono text-[#0d7ff2]">
                    ID_{Math.floor(Math.random() * 9000 + 1000)}-X
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-slate-100">{tacticName}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{tacticExplanation || 'Advanced psychological manipulation tactic designed to create fear and urgency, compelling the victim to act without rational thought.'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono">MITRE_T1566</div>
                    <div className="px-3 py-1 bg-[#0d7ff2]/10 border border-[#0d7ff2]/30 rounded-full text-[#0d7ff2] text-xs font-mono">SOC_ALERT</div>
                    {tactics.map((t, i) => (
                      <div key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-400 text-xs font-mono">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Analysis Buffer */}
            <div className="skeuo-card-dark rounded-xl flex flex-col">
              <div className="border-b border-[#223649] px-6 py-4 flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest">Message_Analysis_Buffer</h3>
                <div className="flex gap-2">
                  <div className="size-2 rounded-full bg-[#0d7ff2]"></div>
                  <div className="size-2 rounded-full bg-slate-700"></div>
                  <div className="size-2 rounded-full bg-slate-700"></div>
                </div>
              </div>
              <div className="p-6 h-80 overflow-y-auto font-mono text-sm leading-relaxed bg-[#0a0f14]/50 custom-scrollbar">
                <div className="space-y-4">
                  {lines.length > 0 ? lines.map((line, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-slate-600 select-none w-7 shrink-0">{String(i + 1).padStart(3, '0')}</span>
                      <p className="text-slate-400 break-all">{line || ' '}</p>
                    </div>
                  )) : (
                    <div className="flex gap-4">
                      <span className="text-slate-600 select-none">001</span>
                      <p className="text-slate-400">No message content available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Confidence Meter */}
            <div className="skeuo-card-dark rounded-xl p-6 bg-[#16202a]">
              <div className="flex justify-between items-end mb-4">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest">Confidence Score</h4>
                <span className="text-3xl font-bold text-[#0d7ff2] font-mono tracking-tighter">{confidence}%</span>
              </div>
              <div className="h-6 bg-[#0a0f14] rounded-full border border-[#223649] p-1 relative overflow-hidden">
                <div
                  className="h-full bg-[#0d7ff2] rounded-full shadow-[0_0_15px_#0d7ff2] relative transition-all duration-1000"
                  style={{ width: `${confidence}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] text-slate-600 uppercase">
                <span>Zero_Confidence</span>
                <span>Theoretical_Max</span>
              </div>
            </div>

            {/* Language Badge */}
            <div className="skeuo-card-dark rounded-xl p-4 flex items-center justify-between bg-[#16202a]">
              <span className="text-xs text-slate-500 font-mono">DETECTED_LANG</span>
              <div className="px-3 py-1 rounded-full bg-[#1a2b3c] border border-[#223649] flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#0d7ff2]"></span>
                <span className="text-xs font-mono text-slate-400">{language.toUpperCase()}</span>
              </div>
            </div>

            {/* Indicators Log */}
            <div className="skeuo-card-dark rounded-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-[#223649] bg-[#1a2633]">
                <h4 className="font-mono text-xs font-bold text-slate-300 uppercase">Indicators_Log</h4>
              </div>
              <div className="p-2 flex flex-col">
                {indicators.length > 0 ? indicators.map((ind, i) => (
                  <div key={i} className="indicator-row p-4 flex gap-4 items-start hover:bg-white/5 transition-colors cursor-default">
                    <div className="size-8 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                      <span className="material-symbols-outlined text-xl">warning</span>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-xs font-mono font-bold text-slate-300">{ind.flag || ind.name || ind}</p>
                      {(ind.explanation || ind.description) && <p className="text-[10px] text-slate-500">{ind.explanation || ind.description}</p>}
                    </div>
                  </div>
                )) : (
                  <div className="p-6 text-center text-xs font-mono text-slate-600">No indicators detected.</div>
                )}
              </div>
            </div>

            {/* Tactics Distribution Chart */}
            <div className="skeuo-card-dark rounded-xl p-6 bg-[#16202a]">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6">Tactics_Distribution</h4>
              <div className="h-40 flex items-end gap-4 px-2 border-l border-b border-[#223649] relative">
                {['Urgency', 'Fear', 'Auth', 'Reward', 'Social'].map((label, i) => {
                  const staticHeights = [80, 65, 40, 20, 50];
                  const tacticId = result?.manipulationTactic?.id;
                  const tacticIndex = tacticId ? parseInt(tacticId.replace('T', ''), 10) - 1 : -1;
                  const h = tacticIndex === i ? Math.min(95, (confidence ?? 50)) : staticHeights[i] * 0.3;
                  return (
                    <div key={i} className="flex-1 relative group" style={{ height: `${h}%` }}>
                      <div
                        className={`w-full rounded-t transition-colors ${tacticIndex === i ? 'bg-[#0d7ff2] group-hover:bg-[#0d7ff2]/80' : 'bg-[#0d7ff2]/25 group-hover:bg-[#0d7ff2]/40'}`}
                        style={{ height: '100%', boxShadow: tacticIndex === i ? '0 0 8px rgba(13,127,242,0.5)' : 'none' }}
                      ></div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-600">{label.slice(0,2)}</div>
                    </div>
                  );
                })}
                <div className="absolute -left-6 top-0 text-[10px] font-mono text-slate-700 italic">100</div>
                <div className="absolute -left-6 top-1/2 text-[10px] font-mono text-slate-700 italic">50</div>
                <div className="absolute -left-5 bottom-0 text-[10px] font-mono text-slate-700 italic">0</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-6 lg:px-20 py-6 border-t border-[#223649] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 uppercase">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> SYSTEM_ONLINE
          </span>
          <span>KERNEL_VERSION: 1.0.4-LTS</span>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
        <div>© 2024 PHISHGUARD_RECON_MODULE // ALL_RIGHTS_RESERVED</div>
      </footer>
    </div>
  );
}

/* ─── Main Input Screen ─────────────────────────────────────────────────── */
function MainInputScreen({ text, setText, activeTab, setActiveTab, loading, onAnalyze, langLabel, setLangLabel, onAudioFile, audioResetKey }) {
  return (
    <div className="dark bg-[#0A0F1E] font-display text-slate-100 min-h-screen grid-bg">
      <div className="layout-container flex h-full grow flex-col">
        <AppHeader variant="main" />

        <main className="flex-1 flex flex-col items-center px-4 py-12 max-w-4xl mx-auto w-full">
          {/* Tab Selectors */}
          <div className="flex bg-slate-900/80 p-1.5 rounded-xl tab-switch border border-slate-800 mb-12">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'text'
                  ? 'bg-[#0d7ff2] text-white shadow-lg shadow-[#0d7ff2]/20'
                  : 'text-slate-400 font-medium hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined">text_fields</span>
              <span className="text-sm">Text Analysis</span>
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all ${
                activeTab === 'audio'
                  ? 'bg-[#0d7ff2] text-white font-bold shadow-lg shadow-[#0d7ff2]/20'
                  : 'text-slate-400 font-medium hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined">record_voice_over</span>
              <span className="text-sm">Audio Analysis</span>
            </button>
          </div>

          {activeTab === 'text' ? (
            <div className="w-full space-y-4">
              {/* Textarea */}
              <div className="relative group glow-focus rounded-xl border border-slate-800 bg-slate-900/50 transition-all">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={2000}
                  className="w-full h-64 bg-transparent border-none focus:ring-0 p-6 font-mono text-slate-100 placeholder:text-slate-600 resize-none focus:outline-none"
                  placeholder="Paste a suspicious message here..."
                />
                <div className="absolute bottom-4 right-6 font-mono text-[10px] text-slate-600">
                  {text.length} / 2000
                </div>
              </div>
              {/* Analyze Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => onAnalyze(text)}
                  disabled={text.length < 10 || loading}
                  className={`flex items-center gap-2 font-bold px-12 py-4 rounded-xl transition-all ${
                    text.length < 10 || loading
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-[#0d7ff2] text-white shadow-lg shadow-[#0d7ff2]/20 hover:bg-[#0d7ff2]/90'
                  }`}
                >
                  <span className="material-symbols-outlined">analytics</span>
                  {loading ? 'ANALYZING...' : 'ANALYZE MESSAGE'}
                </button>
              </div>
            </div>
          ) : (
            <AudioAnalyzer
              key={audioResetKey}
              langLabel={langLabel}
              setLangLabel={setLangLabel}
              onFileSelected={onAudioFile}
            />
          )}
        </main>

        <footer className="mt-auto py-8 text-center">
          <p className="text-[10px] text-slate-600 font-mono tracking-tighter">
            PHISHGUARD_v2.0.4_AURORA | SYSTEM_ENCRYPTED_ACTIVE
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ─── Audio Analyzer ─────────────────────────────────────────────────────── */
function AudioAnalyzer({ langLabel, setLangLabel, onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const LANG_OPTIONS = ['Auto-Detect', 'English', 'Hindi', 'Hinglish'];

  const processFile = (file) => {
    if (!file || !file.type.startsWith('audio/')) return;
    setSelectedFile(file);
    onFileSelected(file);
  };

  return (
    <div className="w-full space-y-5">
      {/* Language Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest shrink-0">
          Recognition Language:
        </span>
        <div className="flex bg-slate-900/80 p-1 rounded-lg border border-slate-800 tab-switch">
          {LANG_OPTIONS.map((label) => (
            <button
              key={label}
              onClick={() => setLangLabel(label)}
              className={`px-5 py-2 rounded text-xs font-mono font-bold transition-all ${
                langLabel === label
                  ? 'bg-[#0d7ff2] text-white shadow-lg shadow-[#0d7ff2]/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          processFile(e.dataTransfer.files[0]);
        }}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative group rounded-xl border-2 border-dashed transition-all h-52 flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? 'border-[#0d7ff2] bg-[#0d7ff2]/5 shadow-[0_0_20px_rgba(13,127,242,0.15)]'
            : selectedFile
            ? 'border-[#0d7ff2]/40 bg-[#0d7ff2]/5 cursor-default'
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 cursor-pointer'
        }`}
      >
        {selectedFile ? (
          <>
            <span className="material-symbols-outlined text-5xl text-[#0d7ff2]">audio_file</span>
            <p className="text-slate-300 text-sm font-mono font-medium">{selectedFile.name}</p>
            <div className="flex items-center gap-2 text-[#0d7ff2]">
              <span className="animate-pulse material-symbols-outlined text-sm">mic</span>
              <span className="font-mono text-[10px] uppercase tracking-widest">Listening...</span>
            </div>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-5xl text-slate-600 group-hover:text-slate-500 transition-colors">upload_file</span>
            <p className="text-slate-400 text-sm">Drop audio file or <span className="text-[#0d7ff2]">browse</span></p>
            <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">MP3 · WAV · M4A · OGG</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => processFile(e.target.files?.[0])}
        />
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
        <span className="material-symbols-outlined text-[#0d7ff2]/60 text-sm mt-0.5">info</span>
        <p className="text-[10px] font-mono text-slate-500 leading-relaxed">
          Upload an audio file (MP3, WAV, M4A, OGG). The audio is sent to our AI for transcription and phishing analysis — no microphone required.
        </p>
      </div>
    </div>
  );
}

/* ─── Root App ──────────────────────────────────────────────────────────── */
function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(null);
  const [error, setError] = useState(null);
  const [lastAnalyzedText, setLastAnalyzedText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [langLabel, setLangLabel] = useState('Auto-Detect');
  const [audioResetKey, setAudioResetKey] = useState(0);

  const handleAnalyze = async (textToAnalyze) => {
    if (!textToAnalyze || textToAnalyze.length < 10) return;
    setLoading(true);
    setLoadingStep('analyzing');
    setError(null);
    setAnalysisResult(null);
    setLastAnalyzedText(textToAnalyze);

    try {
      const response = await fetch('http://localhost:3001/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingStep(null);
    }
  };

  const handleTextAnalyze = (textToAnalyze) => {
    setTranscript('');
    handleAnalyze(textToAnalyze);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setLoading(false);
    setTranscript('');
    setAudioResetKey((k) => k + 1);
  };

  const handleAudioFile = async (file) => {
    setLoading(true);
    setLoadingStep('reading');
    setError(null);
    setAnalysisResult(null);
    setTranscript('');

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch('http://localhost:3001/api/analyze/audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setTranscript(data.transcript || '');
      setLastAnalyzedText(data.transcript || '');
      setAnalysisResult(data.analysis);
    } catch (err) {
      setError(err.message || 'Audio analysis failed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingStep(null);
      setAudioResetKey((k) => k + 1);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleAnalyze(lastAnalyzedText);
  };

  // Loading state
  if (loading) {
    return <LoadingScreen step={loadingStep} />;
  }

  // Error state
  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={handleRetry}
        onBack={handleReset}
      />
    );
  }

  // Results dashboard (populated)
  if (analysisResult) {
    return (
      <ResultsDashboard
        result={analysisResult}
        inputText={lastAnalyzedText}
        onBack={handleReset}
        transcript={transcript}
      />
    );
  }

  // Main input screen
  return (
    <MainInputScreen
      text={text}
      setText={setText}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      loading={loading}
      onAnalyze={handleTextAnalyze}
      langLabel={langLabel}
      setLangLabel={setLangLabel}
      onAudioFile={handleAudioFile}
      audioResetKey={audioResetKey}
    />
  );
}

export default App;