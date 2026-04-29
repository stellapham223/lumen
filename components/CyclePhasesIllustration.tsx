// Static illustration for blog posts: estrogen + progesterone across a 28-day cycle,
// with the four phases (menstrual, follicular, ovulatory, luteal) shaded as backgrounds.

const ESTROGEN_PATH =
  "M 60 264 L 82 264 L 104 264 L 127 264 L 149 257 L 171 240 L 193 216 L 216 192 L 238 168 L 260 144 L 282 127 L 304 103 L 327 84 L 349 132 L 371 180 L 393 180 L 416 168 L 438 151 L 460 137 L 482 127 L 504 120 L 527 127 L 549 144 L 571 168 L 593 199 L 616 228 L 638 247 L 660 264";

const PROGESTERONE_PATH =
  "M 60 281 L 82 281 L 104 281 L 127 281 L 149 281 L 171 281 L 193 281 L 216 281 L 238 281 L 260 281 L 282 281 L 304 281 L 327 281 L 349 271 L 371 252 L 393 216 L 416 180 L 438 144 L 460 113 L 482 96 L 504 84 L 527 101 L 549 132 L 571 168 L 593 204 L 616 233 L 638 252 L 660 264";

const ESTROGEN_COLOR = "#420093";
const PROGESTERONE_COLOR = "#C2410C";
const AXIS_COLOR = "rgba(66, 0, 147, 0.18)";
const LABEL_COLOR = "rgba(66, 0, 147, 0.7)";

export function CyclePhasesIllustration() {
  return (
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Estrogen and progesterone across the four phases of a 28-day menstrual cycle"
      className="block w-full h-auto"
    >
      <rect x="60" y="40" width="111" height="260" fill="#FBE4E8" opacity="0.55" />
      <rect x="171" y="40" width="178" height="260" fill="#FBF3DC" opacity="0.6" />
      <rect x="349" y="40" width="67" height="260" fill="#FCD8B0" opacity="0.65" />
      <rect x="416" y="40" width="244" height="260" fill="#EAE0F2" opacity="0.6" />

      <line x1="60" y1="40" x2="60" y2="300" stroke={AXIS_COLOR} strokeWidth="1" />
      <line x1="60" y1="300" x2="660" y2="300" stroke={AXIS_COLOR} strokeWidth="1" />

      <line x1="171" y1="40" x2="171" y2="300" stroke={AXIS_COLOR} strokeWidth="1" strokeDasharray="2 3" />
      <line x1="349" y1="40" x2="349" y2="300" stroke={AXIS_COLOR} strokeWidth="1" strokeDasharray="2 3" />
      <line x1="416" y1="40" x2="416" y2="300" stroke={AXIS_COLOR} strokeWidth="1" strokeDasharray="2 3" />

      <path d={ESTROGEN_PATH} stroke={ESTROGEN_COLOR} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={PROGESTERONE_PATH} stroke={PROGESTERONE_COLOR} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="5 4" />

      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill={LABEL_COLOR}>
        <text x="60" y="320" textAnchor="middle">Day 1</text>
        <text x="193" y="320" textAnchor="middle">7</text>
        <text x="349" y="320" textAnchor="middle">14</text>
        <text x="504" y="320" textAnchor="middle">21</text>
        <text x="660" y="320" textAnchor="middle">28</text>
      </g>

      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#420093" letterSpacing="0.04em">
        <text x="116" y="358" textAnchor="middle">Menstrual</text>
        <text x="260" y="358" textAnchor="middle">Follicular</text>
        <text x="382" y="358" textAnchor="middle">Ovulatory</text>
        <text x="538" y="358" textAnchor="middle">Luteal</text>
      </g>

      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fill="#420093">
        <line x1="60" y1="22" x2="84" y2="22" stroke={ESTROGEN_COLOR} strokeWidth="2.5" strokeLinecap="round" />
        <text x="92" y="26">Estrogen</text>
        <line x1="174" y1="22" x2="198" y2="22" stroke={PROGESTERONE_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" />
        <text x="206" y="26">Progesterone</text>
      </g>
    </svg>
  );
}
