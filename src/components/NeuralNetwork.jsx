import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './NeuralNetwork.css';

/* ─── Node Data ─────────────────────────────────────── */
const NODES = [
  // Center
  { id: 'ritam',       label: 'RITAM',          x: 50, y: 50, size: 72,  isCenter: true, color: '#00E5FF', parallax: 0,    floatVar: 0 },
  // Inner
  { id: 'cpp',         label: 'C++',             x: 33, y: 33, size: 52,  color: '#38BDF8', parallax: 0.2,  floatVar: 1, info: { stars: 5, role: 'Primary Language',      detail: '600+ Problems Solved',            tags: ['Competitive Prog.', 'LeetCode'] } },
  { id: 'python',      label: 'Python',           x: 67, y: 30, size: 50,  color: '#A855F7', parallax: 0.2,  floatVar: 2, info: { stars: 4, role: 'AI & Scripting',        detail: 'ML / Data Science Projects',      tags: ['TensorFlow', 'NumPy', 'Pandas'] } },
  { id: 'javascript',  label: 'JS',               x: 71, y: 56, size: 48,  color: '#F7DF1E', parallax: 0.2,  floatVar: 3, info: { stars: 4, role: 'Web Development',       detail: 'ES6+ & Modern JavaScript',        tags: ['DOM', 'REST APIs', 'TypeScript'] } },
  { id: 'java',        label: 'Java',             x: 29, y: 67, size: 48,  color: '#F89820', parallax: 0.2,  floatVar: 4, info: { stars: 4, role: 'OOP & Design Patterns', detail: '5+ Design Patterns Used',         tags: ['Spring', 'JVM', 'OOP'] } },
  // Mid ring
  { id: 'react',       label: 'React',            x: 52, y: 17, size: 46,  color: '#61DAFB', parallax: 0.45, floatVar: 5, info: { stars: 4, role: 'Frontend Dev',          detail: 'Portfolio & Projects Built',       tags: ['Hooks', 'Framer Motion', 'JSX'] } },
  { id: 'dsa',         label: 'DSA',              x: 17, y: 46, size: 46,  color: '#00E5FF', parallax: 0.45, floatVar: 0, info: { stars: 5, role: 'Core Strength',          detail: '220+ Problems Solved',            tags: ['LeetCode', 'Codeforces', 'Trees'] } },
  { id: 'nodejs',      label: 'Node.js',          x: 83, y: 43, size: 42,  color: '#4ADE80', parallax: 0.45, floatVar: 1, info: { stars: 3, role: 'Backend Dev',            detail: 'REST APIs & Server-Side',         tags: ['Express.js', 'npm', 'REST'] } },
  { id: 'sql',         label: 'SQL',              x: 67, y: 78, size: 40,  color: '#4479A1', parallax: 0.45, floatVar: 2, info: { stars: 4, role: 'Database Queries',       detail: 'MySQL & PostgreSQL',              tags: ['Joins', 'Indexes', 'CRUD'] } },
  { id: 'git',         label: 'Git',              x: 37, y: 82, size: 40,  color: '#F05032', parallax: 0.45, floatVar: 3, info: { stars: 4, role: 'Version Control',        detail: 'Daily Usage in Projects',         tags: ['GitHub', 'Branching', 'PRs'] } },
  { id: 'algorithms',  label: 'Algorithms',       x: 19, y: 24, size: 44,  color: '#7C3AED', parallax: 0.45, floatVar: 4, info: { stars: 5, role: 'Problem Solving Core',   detail: 'DP, Graphs, Trees, Greedy',      tags: ['Greedy', 'DP', 'Backtracking'] } },
  // Outer ring
  { id: 'ml',          label: 'ML',               x: 50, y:  7, size: 40,  color: '#A855F7', parallax: 0.72, floatVar: 5, info: { stars: 3, role: 'Currently Learning',    detail: 'Supervised & Unsupervised',       tags: ['TensorFlow', 'PyTorch', 'Scikit-Learn'] } },
  { id: 'aws',         label: 'AWS',              x: 88, y: 25, size: 36,  color: '#FF9900', parallax: 0.72, floatVar: 0, info: { stars: 2, role: 'Cloud Computing',        detail: 'Currently Exploring',             tags: ['EC2', 'S3', 'Lambda'] } },
  { id: 'sysdesign',   label: 'System\nDesign',   x: 86, y: 68, size: 40,  color: '#38BDF8', parallax: 0.72, floatVar: 1, info: { stars: 3, role: 'Architecture',          detail: 'LLD & HLD Concepts',              tags: ['Scalability', 'Caching', 'LB'] } },
  { id: 'os',          label: 'OS',               x:  9, y: 59, size: 36,  color: '#00E5FF', parallax: 0.72, floatVar: 2, info: { stars: 4, role: 'Core CS',               detail: 'Processes, Threads, Memory',      tags: ['Linux', 'Scheduling', 'Paging'] } },
  { id: 'dbms',        label: 'DBMS',             x: 27, y: 88, size: 34,  color: '#A855F7', parallax: 0.72, floatVar: 3, info: { stars: 4, role: 'Core CS',               detail: 'Normalization & Transactions',    tags: ['ACID', 'Indexing', 'SQL'] } },
  { id: 'cn',          label: 'Networks',         x: 72, y: 89, size: 34,  color: '#38BDF8', parallax: 0.72, floatVar: 4, info: { stars: 3, role: 'Core CS',               detail: 'TCP/IP, HTTP, DNS',               tags: ['OSI Model', 'Protocols', 'Sockets'] } },
  { id: 'ai',          label: 'AI',               x: 50, y: 91, size: 38,  color: '#A855F7', parallax: 0.72, floatVar: 5, info: { stars: 3, role: 'AI Engineering',        detail: 'NLP, Computer Vision, LLMs',     tags: ['LLMs', 'Transformers', 'RAG'] } },
  { id: 'graphrag',    label: 'Graph\nRAG',        x: 11, y: 79, size: 34,  color: '#7C3AED', parallax: 0.72, floatVar: 0, info: { stars: 3, role: 'Built a Project',       detail: 'LLM + Knowledge Graphs',         tags: ['Neo4j', 'Python', 'NLP'] } },
  { id: 'cp',          label: 'Comp.\nProg.',      x: 88, y: 10, size: 36,  color: '#00E5FF', parallax: 0.72, floatVar: 1, info: { stars: 4, role: 'Passion & Practice',    detail: 'LeetCode & Codeforces',           tags: ['Contests', 'Ratings', 'Speed'] } },
];

const CONNECTIONS = [
  ['ritam','cpp'],['ritam','python'],['ritam','javascript'],['ritam','java'],
  ['ritam','dsa'],['ritam','react'],['ritam','algorithms'],
  ['cpp','algorithms'],['cpp','dsa'],['cpp','cp'],
  ['python','ml'],['python','graphrag'],
  ['javascript','react'],['javascript','nodejs'],
  ['java','sysdesign'],['java','dbms'],
  ['react','nodejs'],['react','ml'],
  ['dsa','algorithms'],['dsa','os'],
  ['nodejs','aws'],['nodejs','sql'],
  ['sql','dbms'],['sql','cn'],
  ['git','graphrag'],['git','dbms'],
  ['algorithms','cp'],
  ['ml','ai'],['ml','cp'],
  ['aws','sysdesign'],['aws','cn'],
  ['os','cn'],['os','dbms'],
  ['dbms','ai'],['cn','ai'],['graphrag','ai'],
];

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

function quadPath(n1, n2, W, H) {
  const x1 = n1.x / 100 * W, y1 = n1.y / 100 * H;
  const x2 = n2.x / 100 * W, y2 = n2.y / 100 * H;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  const cx = mx + (-dy/len)*len*0.16;
  const cy = my + ( dx/len)*len*0.16;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// Stable per-node randoms
const FLOAT_DUR   = NODES.map(() => 9  + Math.random() * 6);
const FLOAT_DELAY = NODES.map(() => -Math.random() * 8);

// Tiny star positions (background particles)
const STARS = Array.from({ length: 40 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.6 + Math.random() * 1.2,
  op: 0.15 + Math.random() * 0.4,
  dur: 2 + Math.random() * 4,
}));

const NeuralNetwork = () => {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const isInView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const [dims,      setDims]      = useState({ width: 1000, height: 580 });
  const [hoveredId, setHoveredId] = useState(null);
  const [mouseOff,  setMouseOff]  = useState({ x: 0, y: 0 });
  const [packets,   setPackets]   = useState([]);

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setDims({ width: el.clientWidth, height: el.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse parallax
  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseOff({
      x: (e.clientX - rect.left) / rect.width  * 2 - 1,
      y: (e.clientY - rect.top)  / rect.height * 2 - 1,
    });
  }, []);

  // Data packets
  useEffect(() => {
    if (!isInView) return;
    let tid;
    const spawn = () => {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const id   = `p-${Date.now()}-${Math.random()}`;
      const dur  = 2000 + Math.random() * 2000;
      const fwd  = Math.random() > 0.5;
      const [fromId, toId] = fwd ? conn : [conn[1], conn[0]];
      // Ensure path exists in either direction
      const pathKey = CONNECTIONS.some(([a,b]) => a===fromId && b===toId) ? `${fromId}|${toId}` : `${toId}|${fromId}`;
      setPackets(prev => [...prev.slice(-10), { id, pathKey, color: NODE_MAP[fromId]?.color ?? '#00E5FF', dur }]);
      setTimeout(() => setPackets(prev => prev.filter(p => p.id !== id)), dur + 400);
      tid = setTimeout(spawn, 600 + Math.random() * 800);
    };
    tid = setTimeout(spawn, 800);
    return () => clearTimeout(tid);
  }, [isInView]);

  // Derived highlight sets
  const litConns = useMemo(() => {
    if (!hoveredId) return new Set();
    return new Set(CONNECTIONS.filter(([a,b]) => a===hoveredId||b===hoveredId).map(([a,b]) => `${a}|${b}`));
  }, [hoveredId]);

  const connIds = useMemo(() => {
    if (!hoveredId) return new Set();
    const s = new Set();
    CONNECTIONS.forEach(([a,b]) => { if(a===hoveredId)s.add(b); if(b===hoveredId)s.add(a); });
    return s;
  }, [hoveredId]);

  return (
    <section id="neural" className="neural-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="neural-header"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Technical Ecosystem</p>
          <h2 className="section-title">
            AI <span className="text-gradient">Knowledge Network</span>
          </h2>
          <p className="neural-subtitle">
            The technologies and concepts that shape my journey as a software engineer.
          </p>
        </motion.div>
      </div>

      {/* ── Network canvas ── */}
      <div
        className="neural-canvas"
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { setMouseOff({ x:0, y:0 }); setHoveredId(null); }}
      >
        {/* Glass backing */}
        <div className="neural-glass-bg" />

        {/* ── SVG: stars + connections + packets ── */}
        <svg className="neural-svg" width={dims.width} height={dims.height} aria-hidden>
          <defs>
            {/* Glow filter for lines */}
            <filter id="fgl" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Glow filter for packets */}
            <filter id="fgp" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Gradient for lines */}
            <linearGradient id="lingrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0"/>
              <stop offset="50%"  stopColor="#00E5FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Background stars */}
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x / 100 * dims.width}
              cy={s.y / 100 * dims.height}
              r={s.r}
              fill="white"
              opacity={s.op}
              style={{ animation: `starTwinkle ${s.dur}s ease-in-out ${i * 0.3}s infinite` }}
            />
          ))}

          {/* Connection lines — render both a dim base line and an animated dash */}
          {CONNECTIONS.map(([fromId, toId]) => {
            const key  = `${fromId}|${toId}`;
            const n1   = NODE_MAP[fromId], n2 = NODE_MAP[toId];
            if (!n1||!n2) return null;
            const d   = quadPath(n1, n2, dims.width, dims.height);
            const lit = litConns.has(key);
            const col1 = n1.color;
            const col2 = n2.color;

            return (
              <g key={key}>
                {/* Glow backdrop */}
                {lit && (
                  <path d={d} fill="none"
                    stroke={col1} strokeWidth="3" opacity="0.15"
                    filter="url(#fgl)" strokeLinecap="round"
                  />
                )}
                {/* Main line */}
                <path
                  id={`nn-path-${key}`}
                  d={d} fill="none"
                  stroke={lit ? col1 : 'rgba(255,255,255,0.11)'}
                  strokeWidth={lit ? 1.6 : 0.9}
                  strokeLinecap="round"
                  strokeDasharray={lit ? 'none' : '4 8'}
                  opacity={lit ? 1 : 1}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              </g>
            );
          })}

          {/* Data packets */}
          {packets.map(pkt => {
            // Try both path key directions
            const hasPath = CONNECTIONS.some(([a,b]) => `${a}|${b}` === pkt.pathKey);
            const revKey  = pkt.pathKey.split('|').reverse().join('|');
            const realKey = hasPath ? pkt.pathKey : revKey;
            return (
              <circle key={pkt.id} r="4" fill={pkt.color} filter="url(#fgp)" opacity="0.9">
                <animateMotion dur={`${pkt.dur}ms`} begin="0s" fill="freeze" repeatCount="1">
                  <mpath href={`#nn-path-${realKey}`}/>
                </animateMotion>
              </circle>
            );
          })}
        </svg>

        {/* ── Nodes ── */}
        {NODES.map((node, i) => {
          const isHov = hoveredId === node.id;
          const isCon = connIds.has(node.id);
          const isDim = !!(hoveredId && !isHov && !isCon);
          const pX    = mouseOff.x * node.parallax * 16;
          const pY    = mouseOff.y * node.parallax * 16;

          // Build inline styles with actual hex colors for reliable rendering
          const nodeStyle = {
            width:  node.size,
            height: node.size,
            background: node.isCenter
              ? `radial-gradient(circle at 35% 35%, ${node.color}22, rgba(5,8,22,0.88))`
              : isHov
              ? `radial-gradient(circle at 35% 35%, ${node.color}18, rgba(5,8,22,0.92))`
              : 'rgba(8,12,30,0.72)',
            border: `1.5px solid ${isHov || node.isCenter ? node.color : node.color + '50'}`,
            boxShadow: node.isCenter
              ? `0 0 0 6px ${node.color}15, 0 0 30px ${node.color}55, 0 0 70px ${node.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`
              : isHov
              ? `0 0 0 4px ${node.color}20, 0 0 25px ${node.color}65, 0 0 55px ${node.color}30, inset 0 1px 0 rgba(255,255,255,0.14)`
              : isCon
              ? `0 0 15px ${node.color}40, 0 4px 12px rgba(0,0,0,0.5)`
              : `0 0 10px ${node.color}18, 0 4px 10px rgba(0,0,0,0.45)`,
            transform: `translate(${pX}px, ${pY}px) scale(${isHov ? (node.isCenter?1.08:1.18) : 1})`,
            opacity: isDim ? 0.18 : 1,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
            // Apply float animation
            animation: `nnFloat${node.floatVar} ${FLOAT_DUR[i]}s ${FLOAT_DELAY[i]}s ease-in-out infinite`,
          };

          const labelStyle = {
            fontSize: node.isCenter ? '0.88rem' : node.size > 46 ? '0.73rem' : '0.65rem',
            fontWeight: node.isCenter ? 800 : 600,
            color: isHov || node.isCenter ? node.color : 'rgba(255,255,255,0.85)',
            textShadow: isHov || node.isCenter ? `0 0 16px ${node.color}90` : 'none',
            letterSpacing: node.isCenter ? '2px' : '0.02em',
            transition: 'color 0.25s, text-shadow 0.25s',
          };

          return (
            <motion.div
              key={node.id}
              className="nn-node-wrapper"
              style={{ left:`${node.x}%`, top:`${node.y}%` }}
              initial={{ opacity:0, scale:0.2 }}
              animate={isInView ? { opacity:1, scale:1 } : {}}
              transition={{
                opacity: { duration:0.4, delay: i*0.04 },
                scale:   { type:'spring', stiffness:180, damping:16, delay: i*0.04 },
              }}
            >
              <div
                className="nn-node"
                style={nodeStyle}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Center ping ring */}
                {node.isCenter && (
                  <>
                    <span className="nn-ping" style={{ borderColor: node.color + '50' }} />
                    <span className="nn-ping nn-ping-2" style={{ borderColor: node.color + '28' }} />
                  </>
                )}
                <span className="nn-label" style={labelStyle}>
                  {node.label}
                </span>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHov && node.info && (
                  <motion.div
                    className="nn-tooltip"
                    data-side={node.x > 62 ? 'left' : node.x < 38 ? 'right' : 'center'}
                    data-vert={node.y > 62 ? 'up' : 'down'}
                    style={{ '--tc': node.color }}
                    initial={{ opacity:0, scale:0.85, y:8 }}
                    animate={{ opacity:1, scale:1, y:0 }}
                    exit={{    opacity:0, scale:0.85, y:8 }}
                    transition={{ duration:0.18 }}
                  >
                    <div className="nn-tt-header">
                      <span className="nn-tt-name" style={{ color: node.color }}>{node.label.replace('\n',' ')}</span>
                      <span className="nn-tt-stars">{'★'.repeat(node.info.stars)}<span className="nn-tt-empty-stars">{'★'.repeat(5-node.info.stars)}</span></span>
                    </div>
                    <p className="nn-tt-role">{node.info.role}</p>
                    <p className="nn-tt-detail">{node.info.detail}</p>
                    <div className="nn-tt-tags">
                      {node.info.tags.map(t=>(
                        <span key={t} className="nn-tt-tag" style={{ color:node.color, borderColor:node.color+'40', background:node.color+'0d' }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Ambient glow blobs */}
        <div className="nn-blob nn-blob-1" />
        <div className="nn-blob nn-blob-2" />
        <div className="nn-blob nn-blob-3" />
      </div>
    </section>
  );
};

export default NeuralNetwork;
