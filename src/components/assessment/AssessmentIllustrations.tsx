// Flat geometric SVG illustrations for assessment cards
// Style: no people, no faces, no gradients, solid fills only

export function PosterIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#FBEAF0" />
      <rect x="40" y="25" width="120" height="145" rx="4" fill="#ED93B1" opacity="0.25" />
      <circle cx="100" cy="72" r="28" fill="#D4537E" />
      <rect x="55" y="110" width="90" height="18" rx="3" fill="#993556" />
      <rect x="55" y="136" width="60" height="4" rx="2" fill="#D4537E" opacity="0.5" />
      <rect x="55" y="144" width="40" height="4" rx="2" fill="#D4537E" opacity="0.3" />
      <circle cx="68" cy="178" r="6" fill="#D4537E" />
      <circle cx="86" cy="178" r="6" fill="#993556" />
      <circle cx="104" cy="178" r="6" fill="#ED93B1" />
      <circle cx="122" cy="178" r="6" fill="#FBEAF0" stroke="#D4537E" strokeWidth="1.5" />
    </svg>
  );
}

export function ExperimentIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#EEEDFE" />
      {/* Flask body: narrow neck + wide base */}
      <rect x="90" y="30" width="20" height="50" rx="2" fill="#AFA9EC" />
      <path d="M70 130 L90 80 L110 80 L130 130 Z" fill="#AFA9EC" opacity="0.4" />
      <path d="M70 130 L90 100 L110 100 L130 130 Z" fill="#534AB7" />
      {/* Bubbles */}
      <circle cx="95" cy="115" r="4" fill="white" opacity="0.7" />
      <circle cx="108" cy="108" r="3" fill="white" opacity="0.5" />
      <circle cx="100" cy="122" r="2.5" fill="white" opacity="0.6" />
      {/* Flask base */}
      <rect x="65" y="130" width="70" height="6" rx="3" fill="#534AB7" />
      {/* Test tube */}
      <rect x="148" y="50" width="12" height="60" rx="6" fill="#AFA9EC" opacity="0.4" />
      <rect x="148" y="80" width="12" height="30" rx="6" fill="#534AB7" opacity="0.6" />
      {/* Tick lines on flask */}
      <rect x="72" y="100" width="8" height="1.5" fill="#534AB7" opacity="0.3" />
      <rect x="76" y="110" width="6" height="1.5" fill="#534AB7" opacity="0.3" />
      <rect x="80" y="120" width="4" height="1.5" fill="#534AB7" opacity="0.3" />
      {/* Table */}
      <rect x="30" y="150" width="140" height="6" rx="2" fill="#26215C" opacity="0.15" />
    </svg>
  );
}

export function TalentShowIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#FAEEDA" />
      {/* Spotlight beam */}
      <path d="M100 20 L50 160 L150 160 Z" fill="#FAC775" opacity="0.2" />
      {/* Light source */}
      <circle cx="100" cy="20" r="10" fill="#EF9F27" />
      {/* Curtains */}
      <rect x="0" y="30" width="30" height="140" rx="4" fill="#BA7517" />
      <rect x="170" y="30" width="30" height="140" rx="4" fill="#BA7517" />
      {/* Stage */}
      <rect x="20" y="160" width="160" height="20" rx="3" fill="#BA7517" opacity="0.3" />
      <rect x="20" y="158" width="160" height="6" rx="2" fill="#EF9F27" opacity="0.5" />
      {/* Microphone */}
      <circle cx="100" cy="120" r="8" fill="#412402" />
      <rect x="98" y="128" width="4" height="30" rx="2" fill="#412402" opacity="0.6" />
      {/* Mic base */}
      <rect x="90" y="155" width="20" height="3" rx="1.5" fill="#412402" opacity="0.4" />
    </svg>
  );
}

export function BuildAppIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#E1F5EE" />
      {/* Phone frame */}
      <rect x="60" y="25" width="80" height="150" rx="12" fill="#0F6E56" />
      {/* Screen */}
      <rect x="66" y="35" width="68" height="130" rx="6" fill="#C8F7E8" />
      {/* Header bar */}
      <rect x="72" y="42" width="56" height="8" rx="2" fill="#0F6E56" opacity="0.2" />
      {/* Content blocks */}
      <rect x="72" y="58" width="56" height="24" rx="3" fill="#0F6E56" opacity="0.15" />
      <rect x="72" y="88" width="26" height="20" rx="3" fill="#5DCAA5" opacity="0.4" />
      <rect x="102" y="88" width="26" height="20" rx="3" fill="#1D9E75" opacity="0.3" />
      <rect x="72" y="114" width="56" height="12" rx="3" fill="#0F6E56" opacity="0.1" />
      {/* Nav dots */}
      <circle cx="88" cy="150" r="3" fill="#0F6E56" opacity="0.3" />
      <circle cx="100" cy="150" r="3" fill="#0F6E56" />
      <circle cx="112" cy="150" r="3" fill="#0F6E56" opacity="0.3" />
      {/* Code brackets */}
      <path d="M40 85 L28 100 L40 115" stroke="#0F6E56" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" />
      <path d="M160 85 L172 100 L160 115" stroke="#0F6E56" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" />
    </svg>
  );
}

export function CampaignIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#EAF3DE" />
      {/* Megaphone body */}
      <path d="M50 90 L50 120 L120 140 L120 70 Z" fill="#3B6D11" />
      <ellipse cx="120" cy="105" rx="12" ry="35" fill="#97C459" />
      {/* Handle */}
      <rect x="30" y="96" width="22" height="18" rx="4" fill="#27500A" />
      {/* Sound waves */}
      <path d="M140 80 Q160 105 140 130" stroke="#3B6D11" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M150 70 Q175 105 150 140" stroke="#3B6D11" strokeWidth="2.5" fill="none" opacity="0.3" />
      <path d="M160 62 Q190 105 160 148" stroke="#3B6D11" strokeWidth="2" fill="none" opacity="0.15" />
      {/* Map pin */}
      <circle cx="170" cy="35" r="8" fill="#3B6D11" opacity="0.4" />
      <path d="M170 43 L166 50 L174 50 Z" fill="#3B6D11" opacity="0.4" />
      {/* People dots */}
      <circle cx="50" cy="170" r="4" fill="#3B6D11" opacity="0.25" />
      <circle cx="70" cy="172" r="4" fill="#3B6D11" opacity="0.25" />
      <circle cx="90" cy="170" r="4" fill="#3B6D11" opacity="0.25" />
      <circle cx="110" cy="173" r="4" fill="#3B6D11" opacity="0.25" />
      <circle cx="130" cy="170" r="4" fill="#3B6D11" opacity="0.25" />
      <circle cx="150" cy="172" r="4" fill="#3B6D11" opacity="0.25" />
    </svg>
  );
}

export function VolunteerIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <rect width="200" height="200" fill="#E6F1FB" />
      {/* Heart */}
      <circle cx="88" cy="38" r="14" fill="#378ADD" />
      <circle cx="112" cy="38" r="14" fill="#378ADD" />
      <path d="M74 42 L100 70 L126 42" fill="#378ADD" />
      {/* Building */}
      <rect x="55" y="85" width="90" height="85" rx="3" fill="#85B7EB" opacity="0.3" />
      <rect x="55" y="85" width="90" height="14" rx="3" fill="#378ADD" opacity="0.25" />
      {/* Windows */}
      <rect x="68" y="108" width="18" height="16" rx="2" fill="#378ADD" opacity="0.2" />
      <rect x="114" y="108" width="18" height="16" rx="2" fill="#378ADD" opacity="0.2" />
      {/* Door */}
      <rect x="88" y="140" width="24" height="30" rx="3" fill="#378ADD" opacity="0.35" />
      {/* Medical cross */}
      <rect x="96" y="92" width="8" height="20" rx="1" fill="#185FA5" />
      <rect x="91" y="97" width="18" height="8" rx="1" fill="#185FA5" />
    </svg>
  );
}

// ─── Q4 Two-Card Illustrations ───

export function SoloWorkIllustration() {
  return (
    <svg viewBox="0 0 200 250" fill="none" className="w-full h-full">
      <rect width="200" height="250" fill="#EEEDFE" />
      {/* Desk */}
      <rect x="20" y="150" width="160" height="8" rx="3" fill="#534AB7" opacity="0.2" />
      {/* Monitor */}
      <rect x="55" y="80" width="90" height="60" rx="5" fill="#534AB7" opacity="0.15" />
      <rect x="60" y="85" width="80" height="50" rx="3" fill="#AFA9EC" opacity="0.3" />
      {/* Screen content lines */}
      <rect x="68" y="95" width="50" height="3" rx="1.5" fill="#534AB7" opacity="0.3" />
      <rect x="68" y="103" width="35" height="3" rx="1.5" fill="#534AB7" opacity="0.2" />
      <rect x="68" y="111" width="45" height="3" rx="1.5" fill="#534AB7" opacity="0.15" />
      {/* Monitor stand */}
      <rect x="93" y="140" width="14" height="12" rx="2" fill="#534AB7" opacity="0.2" />
      {/* Headphones */}
      <path d="M60 55 Q60 30 100 30 Q140 30 140 55" stroke="#534AB7" strokeWidth="5" fill="none" opacity="0.4" />
      <rect x="52" y="50" width="14" height="20" rx="7" fill="#534AB7" opacity="0.5" />
      <rect x="134" y="50" width="14" height="20" rx="7" fill="#534AB7" opacity="0.5" />
      {/* Coffee cup */}
      <rect x="155" y="130" width="16" height="20" rx="3" fill="#7F77DD" opacity="0.3" />
      <path d="M171 135 Q180 135 180 142 Q180 148 171 148" stroke="#7F77DD" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}

export function CollabWorkIllustration() {
  return (
    <svg viewBox="0 0 200 250" fill="none" className="w-full h-full">
      <rect width="200" height="250" fill="#FFF0E6" />
      {/* Table */}
      <ellipse cx="100" cy="155" rx="70" ry="25" fill="#F0997B" opacity="0.2" />
      <ellipse cx="100" cy="150" rx="70" ry="25" fill="#D85A30" opacity="0.15" />
      {/* Chairs represented as small arcs */}
      <rect x="30" y="140" width="16" height="24" rx="5" fill="#D85A30" opacity="0.25" />
      <rect x="154" y="140" width="16" height="24" rx="5" fill="#D85A30" opacity="0.25" />
      <rect x="88" y="180" width="16" height="20" rx="5" fill="#D85A30" opacity="0.25" />
      {/* Speech bubbles */}
      <rect x="30" y="50" width="50" height="30" rx="10" fill="#D85A30" opacity="0.2" />
      <path d="M55 80 L50 90 L62 80" fill="#D85A30" opacity="0.2" />
      <rect x="120" y="35" width="55" height="30" rx="10" fill="#F0997B" opacity="0.3" />
      <path d="M145 65 L148 75 L138 65" fill="#F0997B" opacity="0.3" />
      <rect x="70" y="90" width="45" height="25" rx="10" fill="#D85A30" opacity="0.15" />
      <path d="M90 115 L88 123 L96 115" fill="#D85A30" opacity="0.15" />
      {/* Dots in bubbles */}
      <rect x="40" y="62" width="20" height="3" rx="1.5" fill="#D85A30" opacity="0.3" />
      <rect x="130" y="47" width="25" height="3" rx="1.5" fill="#D85A30" opacity="0.3" />
    </svg>
  );
}

// Map illustration keys to components
export const illustrationMap: Record<string, React.FC> = {
  "poster-pink": PosterIllustration,
  "experiment-purple": ExperimentIllustration,
  "talent-show-amber": TalentShowIllustration,
  "build-app-teal": BuildAppIllustration,
  "campaign-green": CampaignIllustration,
  "volunteer-blue": VolunteerIllustration,
  "solo-indigo": SoloWorkIllustration,
  "collab-orange": CollabWorkIllustration,
};
