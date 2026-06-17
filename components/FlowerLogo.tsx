export function FlowerLogo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <svg className={className} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <defs>
        <clipPath id="hc"><circle cx="45" cy="45" r="41"/></clipPath>
        <radialGradient id="hg" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#2a6cc4"/>
          <stop offset="100%" stopColor="#0d3b6e"/>
        </radialGradient>
      </defs>
      <circle cx="45" cy="45" r="42" fill="url(#hg)"/>
      <g clipPath="url(#hc)" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="1.2">
        <circle cx="45" cy="45" r="14.5"/><circle cx="45" cy="30.5" r="14.5"/>
        <circle cx="57.56" cy="37.75" r="14.5"/><circle cx="57.56" cy="52.25" r="14.5"/>
        <circle cx="45" cy="59.5" r="14.5"/><circle cx="32.44" cy="52.25" r="14.5"/>
        <circle cx="32.44" cy="37.75" r="14.5"/><circle cx="45" cy="16" r="14.5"/>
        <circle cx="70.12" cy="30.5" r="14.5"/><circle cx="70.12" cy="59.5" r="14.5"/>
        <circle cx="45" cy="74" r="14.5"/><circle cx="19.88" cy="59.5" r="14.5"/>
        <circle cx="19.88" cy="30.5" r="14.5"/><circle cx="70.12" cy="45" r="14.5"/>
        <circle cx="57.56" cy="67.56" r="14.5"/><circle cx="32.44" cy="67.56" r="14.5"/>
        <circle cx="19.88" cy="45" r="14.5"/><circle cx="32.44" cy="22.44" r="14.5"/>
        <circle cx="57.56" cy="22.44" r="14.5"/>
      </g>
      <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
      <circle cx="45" cy="45" r="4.5" fill="#F4B800"/>
      <circle cx="45" cy="45" r="2" fill="#FFE066"/>
    </svg>
  );
}
