import React, { useState } from 'react';
import { Orbit as OrbitIcon } from 'lucide-react';

/* ─── Default SVG Icons ─────────────────────────────── */
const Icons = {
  cpp: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="3" fill="#00427B" />
      <text x="4" y="17" fontSize="11" fontWeight="800" fill="#659AD2" fontFamily="monospace">C++</text>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M12.043 1.017c-2.157 0-2.078.918-2.078.918l.003 2.126h2.32v.639H7.768S5.449 4.487 5.449 6.72c0 2.233 0 2.767 0 2.767h1.568V8.282c0-.725.68-1.324 1.582-1.324h3.722c1.383 0 2.234-.84 2.234-2.234V3.11c0-1.156-.99-2.093-2.234-2.093h-2.32V1.017zm-1.09.934a.6.6 0 1 1 .002 1.2.6.6 0 0 1-.002-1.2z" fill="#387EB8"/>
      <path d="M12.043 22.983c2.157 0 2.078-.918 2.078-.918l-.003-2.126h-2.32v-.639h4.518s2.32.217 2.32-2.017c0-2.233 0-2.767 0-2.767h-1.568v1.201c0 .725-.68 1.324-1.582 1.324h-3.722c-1.383 0-2.234.84-2.234 2.234v1.867c0 1.156.99 2.093 2.234 2.093h2.32v-.252h-.041z" fill="#FFD43B"/>
    </svg>
  ),
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M6 17.5c.4.7 1 1.1 1.9 1.1 1 0 1.6-.5 1.6-1.3 0-.9-.6-1.2-1.7-1.7l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.6.5 3.4 1.9l-1.9 1.2c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.6.3c2 .9 3.1 1.7 3.1 3.7 0 2.1-1.7 3.3-3.9 3.3-2.2 0-3.6-1-4.3-2.4L6 17.5zm8.5.2c.3.6.6.9 1.2.9.6 0 1-.3 1-1.3V9h2.3v8.4c0 2.1-1.2 3-3 3-1.6 0-2.5-.8-3-1.9l1.5-1z" fill="#000"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" fill="#5382A1"/>
      <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#E76F00"/>
      <path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.526-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82" fill="#5382A1"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M5.5 12v-1.5h4.5V21h-2V12H5.5zm5.5-1.5h4.5v1.5h-3v2h3v1.5h-3v2h3V21h-4.5v-1.5h3v-2h-3v-1.5h3v-2h-3V10.5z" fill="#fff"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M12 1.85L3 6.57v10.86L12 22.15l9-4.72V6.57L12 1.85zm7 15.12L12 20.3l-7-3.33V7.7l7-3.33 7 3.33v9.27z" fill="#026E00"/>
      <path d="M12 6.44L8.5 8.39v4.1l3.5 1.95 3.5-1.95v-4.1L12 6.44z" fill="#026E00"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.103 1.036l-2.48-2.48v6.535a1.838 1.838 0 1 1-1.51-.036V9.23a1.838 1.838 0 0 1-.997-2.416L7.633 4.15 .453 11.329a1.55 1.55 0 0 0 0 2.189L10.933 23.998a1.55 1.55 0 0 0 2.187 0L23.546 13.12a1.55 1.55 0 0 0 0-2.19z" fill="#F05032"/>
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="3" fill="#4479A1"/>
      <text x="3" y="16" fontSize="9" fontWeight="700" fill="#fff" fontFamily="monospace">SQL</text>
    </svg>
  ),
  ml: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="5" cy="5" r="2" fill="#A855F7"/>
      <circle cx="19" cy="5" r="2" fill="#A855F7"/>
      <circle cx="5" cy="19" r="2" fill="#A855F7"/>
      <circle cx="19" cy="19" r="2" fill="#A855F7"/>
      <circle cx="12" cy="12" r="3" fill="#7C3AED"/>
      <line x1="7" y1="5" x2="10" y2="11" stroke="#A855F7" strokeWidth="1.5"/>
      <line x1="17" y1="5" x2="14" y2="11" stroke="#A855F7" strokeWidth="1.5"/>
      <line x1="7" y1="19" x2="10" y2="13" stroke="#A855F7" strokeWidth="1.5"/>
      <line x1="17" y1="19" x2="14" y2="13" stroke="#A855F7" strokeWidth="1.5"/>
    </svg>
  ),
  dsa: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M3 3h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM6.5 7v3M12 7v3M17.5 7v3M5 10h14M5 10v4M19 10v4M5 14h14M10 14v3M14 14v3M8 17h8" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M6.76 9.5C6.27 9.5 5.96 9.9 5.96 10.4V13.6C5.96 14.1 6.27 14.5 6.76 14.5 7.25 14.5 7.56 14.1 7.56 13.6V10.4C7.56 9.9 7.25 9.5 6.76 9.5zm10.48 0c-.49 0-.8.4-.8.9V13.6c0 .5.31.9.8.9.49 0 .8-.4.8-.9V10.4c0-.5-.31-.9-.8-.9zM12 8.5c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5.83 0 1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5z" fill="#FF9900"/>
      <path d="M20.5 17.5c-2.39 1.4-5.37 2.17-8.5 2.17-3.13 0-6.11-.77-8.5-2.17" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  graphrag: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="12" cy="4" r="2" fill="#7C3AED"/>
      <circle cx="4" cy="18" r="2" fill="#7C3AED"/>
      <circle cx="20" cy="18" r="2" fill="#7C3AED"/>
      <circle cx="12" cy="12" r="1.5" fill="#A855F7"/>
      <line x1="12" y1="6" x2="12" y2="10.5" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="6" y1="17" x2="10.5" y2="13" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="18" y1="17" x2="13.5" y2="13" stroke="#7C3AED" strokeWidth="1.5"/>
    </svg>
  ),
};

/* ─── Orbit Configuration ───────────────────────────── */
const DEFAULT_ORBITS = [
  {
    id: 'inner',
    name: 'Inner Ring',
    radiusClass: 'var(--radius-inner)',
    radiusPx: 155,
    speed: 18,
    items: [
      { id: 'cpp',        label: 'C++',        color: '#38BDF8', svg: Icons.cpp },
      { id: 'python',     label: 'Python',     color: '#FFD43B', svg: Icons.python },
      { id: 'react',      label: 'React',      color: '#61DAFB', svg: Icons.react },
      { id: 'javascript', label: 'JavaScript', color: '#F7DF1E', svg: Icons.javascript },
    ],
  },
  {
    id: 'mid',
    name: 'Middle Ring',
    radiusClass: 'var(--radius-mid)',
    radiusPx: 265,
    speed: 30,
    items: [
      { id: 'java',       label: 'Java',       color: '#F89820', svg: Icons.java },
      { id: 'typescript', label: 'TypeScript', color: '#3178C6', svg: Icons.typescript },
      { id: 'nodejs',     label: 'Node.js',    color: '#4ADE80', svg: Icons.nodejs },
    ],
  },
  {
    id: 'outer',
    name: 'Outer Ring',
    radiusClass: 'var(--radius-outer)',
    radiusPx: 375,
    speed: 46,
    items: [
      { id: 'dsa',      label: 'DSA',      color: '#00E5FF', svg: Icons.dsa },
      { id: 'ml',       label: 'ML / AI',  color: '#A855F7', svg: Icons.ml },
      { id: 'sql',      label: 'SQL',      color: '#4479A1', svg: Icons.sql },
      { id: 'git',      label: 'Git',      color: '#F05032', svg: Icons.git },
      { id: 'aws',      label: 'AWS',      color: '#FF9900', svg: Icons.aws },
      { id: 'graphrag', label: 'Graph RAG',color: '#7C3AED', svg: Icons.graphrag },
    ],
  },
];

/* ─── SolarSystem Core Widget ───────────────────────── */
function SolarSystemWidget({
  centerLogo,
  centerLogoAlt = 'Core Engine',
  orbits = DEFAULT_ORBITS,
  isPaused = false,
  speedMultiplier = 1,
  className = '',
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const dustItems = [
    { delay: '-4s',  radius: '145px', color: '#00f5d4' },
    { delay: '-11s', radius: '240px', color: '#a855f7' },
    { delay: '-19s', radius: '330px', color: '#3b82f6' },
    { delay: '-28s', radius: '375px', color: '#00f5d4' },
    { delay: '-7s',  radius: '190px', color: '#ec4899' },
    { delay: '-15s', radius: '350px', color: '#eab308' },
    { delay: '-23s', radius: '410px', color: '#a855f7' },
  ];

  return (
    <div
      className={`relative flex items-center justify-center w-full max-w-[940px] select-none overflow-visible ${className}`}
      style={{ height: 'clamp(340px, 50vw, 500px)', perspective: '1200px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --radius-inner: 155px;
          --radius-mid:   265px;
          --radius-outer: 375px;
        }
        @media (max-width: 768px) {
          :root {
            --radius-inner: 95px;
            --radius-mid:   160px;
            --radius-outer: 225px;
          }
        }
        @media (max-width: 480px) {
          :root {
            --radius-inner: 65px;
            --radius-mid:   108px;
            --radius-outer: 152px;
          }
        }
        @keyframes ss-orbitMove {
          0%   { transform: translate(-50%,-50%) rotateZ(0deg)    translateX(var(--orbit-radius)); }
          100% { transform: translate(-50%,-50%) rotateZ(-360deg) translateX(var(--orbit-radius)); }
        }
        @keyframes ss-billboard {
          0%   { transform: translate(-50%,-50%) rotateZ(0deg)   rotateY(10deg) rotateX(-65deg); }
          100% { transform: translate(-50%,-50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg); }
        }
        @keyframes ss-sun-pulse {
          0%   { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.1); opacity: 1;   }
        }
        @keyframes ss-spin-cw  { 0%{transform:rotateX(65deg) rotateY(-10deg) rotateZ(0deg);}   100%{transform:rotateX(65deg) rotateY(-10deg) rotateZ(360deg);}  }
        @keyframes ss-spin-ccw { 0%{transform:rotateX(65deg) rotateY(-10deg) rotateZ(0deg);}   100%{transform:rotateX(65deg) rotateY(-10deg) rotateZ(-360deg);} }

        .ss-orbit  { animation: ss-orbitMove  var(--orbit-duration) linear infinite; animation-play-state: var(--orbit-play-state); }
        .ss-board  { animation: ss-billboard  var(--orbit-duration) linear infinite; animation-play-state: var(--orbit-play-state); }
        .ss-pulse  { animation: ss-sun-pulse  4s ease-in-out infinite alternate; }
        .ss-cw     { animation: ss-spin-cw    20s linear infinite; }
        .ss-ccw    { animation: ss-spin-counter 30s linear infinite; }

        .ss-planet {
          position: absolute;
          left: 50%; top: 50%;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0.4rem 0.85rem;
          background: rgba(10,10,12,0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          cursor: pointer;
          pointer-events: auto;
          transition: border-color .3s, box-shadow .3s, scale .3s;
          box-shadow: 0 4px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.05);
          font-size: 12px;
        }
      `}} />

      {/* 3-D tilted disc */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(340px,80vw,900px)',
          height: 'clamp(340px,80vw,900px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotateX(65deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Sun core ── */}
        <div
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotateY(10deg) rotateX(-65deg)',
            transformStyle: 'preserve-3d',
            zIndex: 20,
          }}
        >
          <div className="ss-pulse" style={{ position:'absolute', width:100, height:100, borderRadius:'50%', background:'rgba(20,184,166,0.18)', filter:'blur(10px)', zIndex:10 }} />
          <div style={{ width:80, height:80, borderRadius:'50%', border:'2px solid rgba(20,184,166,0.4)', boxShadow:'0 0 30px rgba(20,184,166,.3)', background:'#050816', display:'flex', alignItems:'center', justifyContent:'center', zIndex:20, position:'relative' }}>
            {centerLogo
              ? typeof centerLogo === 'string'
                ? <img src={centerLogo} alt={centerLogoAlt} style={{ width:52, height:52, borderRadius:'50%', objectFit:'cover' }} />
                : centerLogo
              : <OrbitIcon style={{ width:36, height:36, color:'#2dd4bf', animation:'spin 10s linear infinite' }} />
            }
          </div>
          <div className="ss-cw"  style={{ position:'absolute', width:120, height:120, borderRadius:'50%', border:'1px dashed rgba(20,184,166,.2)', pointerEvents:'none' }} />
          <div className="ss-ccw" style={{ position:'absolute', width:160, height:160, borderRadius:'50%', border:'1px dashed rgba(20,184,166,.1)', pointerEvents:'none' }} />
        </div>

        {/* ── Dust ── */}
        {dustItems.map((d, i) => (
          <div key={i} className="ss-orbit" style={{
            position:'absolute', left:'50%', top:'50%',
            width:6, height:6, borderRadius:'50%',
            background: d.color, boxShadow:`0 0 6px ${d.color}`,
            opacity:0.4, pointerEvents:'none',
            animationDelay: d.delay,
            animationDuration: `${24 / speedMultiplier}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
            '--orbit-radius': d.radius,
            '--orbit-duration': `${24 / speedMultiplier}s`,
            '--orbit-play-state': isPaused ? 'paused' : 'running',
          }} />
        ))}

        {/* ── Orbits ── */}
        {orbits.map(orbit => (
          <React.Fragment key={orbit.id}>
            {/* Ring line */}
            <div style={{
              position:'absolute', borderRadius:'50%',
              border:'1px dashed rgba(113,113,122,0.55)',
              width:`calc(2 * ${orbit.radiusClass})`,
              height:`calc(2 * ${orbit.radiusClass})`,
              pointerEvents:'none',
            }} />

            {/* Planets */}
            {orbit.items.map((item, idx, arr) => {
              const delayVal    = -(orbit.speed / arr.length) * idx;
              const durationVal = orbit.speed / speedMultiplier;
              const isHov       = hoveredId === item.id;

              return (
                <div key={item.id} className="ss-orbit" style={{
                  position:'absolute', left:'50%', top:'50%',
                  width:0, height:0,
                  pointerEvents:'none',
                  transformStyle:'preserve-3d',
                  zIndex: isHov ? 30 : 10,
                  animationDelay: `${delayVal}s`,
                  animationDuration: `${durationVal}s`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                  '--orbit-radius': orbit.radiusClass,
                  '--orbit-duration': `${durationVal}s`,
                  '--orbit-play-state': isPaused ? 'paused' : 'running',
                }}>
                  {/* Laser beam */}
                  <div style={{
                    position:'absolute', right:0, top:'50%',
                    height:1.5,
                    width: orbit.radiusClass,
                    transformOrigin:'right',
                    transform:'translateY(-50%)',
                    opacity: isHov ? 1 : 0,
                    background:`linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,.12) 20%, ${item.color} 80%, ${item.color} 100%)`,
                    boxShadow:`0 0 8px ${item.color}, 0 0 16px ${item.color}40`,
                    transition:'opacity .3s',
                    pointerEvents:'none',
                  }} />

                  {/* Planet card */}
                  <div
                    className="ss-planet ss-board"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      animationDelay: `${delayVal}s`,
                      animationDuration: `${durationVal}s`,
                      animationPlayState: isPaused ? 'paused' : 'running',
                      '--orbit-duration': `${durationVal}s`,
                      '--orbit-play-state': isPaused ? 'paused' : 'running',
                      borderColor: isHov ? item.color : undefined,
                      boxShadow: isHov ? `0 0 20px rgba(0,0,0,.6), 0 0 15px ${item.color}40` : undefined,
                      scale: isHov ? 1.08 : 1,
                    }}
                  >
                    <span style={{ color: item.color, transform: isHov ? 'scale(1.12)' : 'scale(1)', transition:'transform .3s', display:'flex' }}>
                      {item.svg}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Portfolio Section Wrapper ─────────────────────── */
export default function SolarSystemSection() {
  return (
    <section id="neural" style={{ padding: '7rem 0', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="section-label">Technical Ecosystem</p>
        <h2 className="section-title">
          My <span className="text-gradient">Tech Orbit</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.7, fontSize: '0.95rem' }}>
          The technologies and concepts orbiting my engineering core — hover each planet to explore.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <SolarSystemWidget />
      </div>
    </section>
  );
}
