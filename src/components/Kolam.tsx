/**
 * An original sikku (pulli) kolam, drawn the traditional way:
 * a grid of dots, with one continuous-looking line weaving diagonally between them.
 * Around every dot the line forms a diamond; where the grid ends, the line turns back
 * in a rounded loop, which wraps the outer dots in teardrops.
 *
 * Change the shape by editing PATTERN: "#" = a dot, "o" = a dot circled on its own, "." = empty.
 */

const PATTERN = [
  "...#...",
  "..###..",
  ".##o##.",
  "..###..",
  "...#...",
  "..###..",
  ".#####.",
  "###o###",
  ".#####.",
  "..###..",
  "...#...",
  "..###..",
  ".##o##.",
  "..###..",
  "...#...",
];

type Pt = [number, number];
const S = 20; // size of one grid cell in SVG units
const H = S / 2;

function build() {
  const rows = PATTERN.length;
  const cols = PATTERN[0].length;
  const has = (r: number, c: number) => r >= 0 && r < rows && c >= 0 && c < cols && PATTERN[r][c] !== ".";
  const isolated = (r: number, c: number) => has(r, c) && PATTERN[r][c] === "o";

  const lines: string[] = [];
  const dots: Pt[] = [];
  const f = (n: number) => n.toFixed(2);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!has(r, c)) continue;
      const cx = c * S + H;
      const cy = r * S + H;
      dots.push([cx, cy]);

      // Edge midpoints around the dot: N, E, S, W (clockwise)
      const mid: Pt[] = [
        [cx, cy - H],
        [cx + H, cy],
        [cx, cy + H],
        [cx - H, cy],
      ];
      const out: Pt[] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      const neighbour = [has(r - 1, c), has(r, c + 1), has(r + 1, c), has(r, c - 1)];
      const neighbourIsolated = [isolated(r - 1, c), isolated(r, c + 1), isolated(r + 1, c), isolated(r, c - 1)];
      // An edge is "closed" (the line turns back) at the edge of the pattern,
      // and around circled dots.
      const closed = neighbour.map((n, i) => !n || isolated(r, c) || neighbourIsolated[i]);

      // Build the shape around this dot as one path (clockwise: N, E, S, W)
      let d = "";
      for (let i = 0; i < 4; i++) {
        const a = mid[i];
        const prev = mid[(i + 3) % 4];
        const next = mid[(i + 1) % 4];
        if (closed[i]) {
          // Outer edge: a full round loop around the dot. Around a circled dot: a smaller turn.
          const outer = !neighbour[i];
          const T = outer ? 0.55 : 0.4;
          const R = outer ? H * 0.82 : H * 0.55;
          const s: Pt = [a[0] + (prev[0] - a[0]) * T, a[1] + (prev[1] - a[1]) * T];
          const e: Pt = [a[0] + (next[0] - a[0]) * T, a[1] + (next[1] - a[1]) * T];
          d += (d ? `L${f(s[0])} ${f(s[1])}` : `M${f(s[0])} ${f(s[1])}`) + `A${f(R)} ${f(R)} 0 0 1 ${f(e[0])} ${f(e[1])}`;
        } else {
          // Open edge: the lines cross straight through to the next dot
          d += d ? `L${f(a[0])} ${f(a[1])}` : `M${f(a[0])} ${f(a[1])}`;
        }
      }
      d += "Z";
      lines.push(d);
    }
  }
  return { lines, dots, width: cols * S, height: rows * S };
}

const KOLAM = build();
const PAD = 14;

export default function Kolam({ className = "", id = "kolam" }: { className?: string; id?: string }) {
  const { lines, dots, width, height } = KOLAM;
  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
      className={`kolam ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dc8a" />
          <stop offset="0.45" stopColor="#d8a93f" />
          <stop offset="0.75" stopColor="#f0cf72" />
          <stop offset="1" stopColor="#b07e24" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${id}-glow)`} fill="none" stroke={`url(#${id}-gold)`} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        {lines.map((d, i) => (
          <path key={i} d={d} pathLength={1} className="kolam-line" style={{ animationDelay: `${(i % 12) * 0.08}s` }} />
        ))}
      </g>
      <g fill="#f3d27a">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" className="kolam-dot" />
        ))}
      </g>
    </svg>
  );
}
