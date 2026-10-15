/** The mridangam's right drum head seen face-on: leather rim, strap holes, and the black karanai centre. */
export default function DrumHead({ className = "" }: { className?: string }) {
  const holes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x: 100 + Math.cos(a) * 92, y: 100 + Math.sin(a) * 92 };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="99" fill="#7a3a1e" />
      <circle cx="100" cy="100" r="86" fill="#c9a77a" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#3d1b0e" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="74" fill="#d8bd93" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#a07b52" strokeWidth="0.8" />
      {holes.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r="2.6" fill="#2a120a" />
      ))}
      <circle cx="100" cy="100" r="44" fill="#1c1715" />
      <circle cx="100" cy="100" r="44" fill="none" stroke="#000" strokeWidth="2" />
      <circle cx="92" cy="90" r="16" fill="#2c2522" opacity="0.6" />
    </svg>
  );
}
