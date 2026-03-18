export function SynTechLogo({ className = "h-8 w-auto" }) {
  return (
    <svg 
      viewBox="0 0 160 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Top Arc - Electric Blue */}
      <path 
        d="M 128,35 C 80,20 32,30 40,50 C 43,55 60,55 88,52 C 64,50 56,46 57,42 C 60,36 96,30 128,35 Z" 
        fill="#00D4FF" 
      />
      <circle cx="128" cy="35" r="5" fill="#00D4FF" />

      {/* Bottom Arc - Neon Purple */}
      <path 
        d="M 32,65 C 80,80 128,70 120,50 C 116,45 99,45 72,48 C 96,50 104,54 102,58 C 99,64 64,70 32,65 Z" 
        fill="#7B2FF7" 
      />
      <circle cx="32" cy="65" r="5" fill="#7B2FF7" />
    </svg>
  );
}
