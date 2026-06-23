export default function Logo() {
  return (
    <svg viewBox="0 0 220 60" width="140" height="42" xmlns="http://www.w3.org/2000/svg" aria-label="LapSkill">
      <g transform="translate(2,4)">
        <path d="M6 46 Q16 22 40 10" fill="none" stroke="#00c9a7" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="10" r="4.5" fill="#00c9a7"/>
        <circle cx="6" cy="46" r="2.5" fill="#00c9a7" opacity="0.35"/>
      </g>
      <text x="52" y="40" style={{fontSize:'28px',fontWeight:200,fill:'#f5f7fa',fontFamily:'system-ui',letterSpacing:'-1px'}}>
        Lap<tspan fontWeight="700" fill="#00c9a7">Skill</tspan>
      </text>
    </svg>
  );
}
