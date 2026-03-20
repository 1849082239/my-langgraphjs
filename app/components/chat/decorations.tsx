'use client'

function VineSide() {
  return (
    <>
      <path
        d="M80 68C70 118 74 165 82 210C90 255 88 300 80 344C72 388 74 437 82 488C90 539 86 596 74 706"
        stroke="#9cae8a"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M88 76C94 121 94 166 88 209C82 252 84 297 92 341C100 385 100 437 92 489C84 541 84 599 90 706"
        stroke="#c9d3bf"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.82"
      />

      <path d="M84 104C95 98 103 91 110 82" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="112" cy="82" rx="3.6" ry="8" fill="#d8cae7" opacity="0.54" transform="rotate(-28 112 82)" />
      <ellipse cx="117" cy="90" rx="2.8" ry="6.2" fill="#b892df" opacity="0.5" transform="rotate(18 117 90)" />
      <ellipse cx="109" cy="80" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(28 109 80)" />

      <path d="M76 176C66 171 58 163 50 154" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="48" cy="153" rx="3.4" ry="7.6" fill="#d9cbe7" opacity="0.5" transform="rotate(28 48 153)" />
      <ellipse cx="42" cy="160" rx="2.7" ry="6" fill="#b48edc" opacity="0.46" transform="rotate(-18 42 160)" />
      <ellipse cx="51" cy="150" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(-24 51 150)" />

      <path d="M83 250C95 244 104 236 111 228" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="114" cy="226" rx="3.4" ry="7.6" fill="#cdb8eb" opacity="0.5" transform="rotate(-20 114 226)" />
      <ellipse cx="120" cy="233" rx="2.7" ry="6" fill="#a47cc9" opacity="0.44" transform="rotate(18 120 233)" />
      <ellipse cx="110" cy="225" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(24 110 225)" />

      <path d="M75 338C65 333 57 325 49 316" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="47" cy="315" rx="3.4" ry="7.6" fill="#ded3ee" opacity="0.48" transform="rotate(30 47 315)" />
      <ellipse cx="41" cy="322" rx="2.7" ry="6" fill="#b892df" opacity="0.44" transform="rotate(-16 41 322)" />
      <ellipse cx="50" cy="313" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(-24 50 313)" />

      <path d="M82 432C93 426 102 419 109 411" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="112" cy="410" rx="3.4" ry="7.6" fill="#d8cae7" opacity="0.5" transform="rotate(-22 112 410)" />
      <ellipse cx="118" cy="417" rx="2.7" ry="6" fill="#b48edc" opacity="0.44" transform="rotate(14 118 417)" />
      <ellipse cx="109" cy="409" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(20 109 409)" />

      <path d="M74 528C64 523 56 515 48 506" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="46" cy="504" rx="3.4" ry="7.6" fill="#ded3ee" opacity="0.48" transform="rotate(26 46 504)" />
      <ellipse cx="39" cy="511" rx="2.7" ry="6" fill="#b892df" opacity="0.44" transform="rotate(-16 39 511)" />
      <ellipse cx="49" cy="503" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(-24 49 503)" />

      <path d="M81 614C93 608 102 601 110 592" stroke="#9cae8a" strokeWidth="0.82" strokeLinecap="round" />
      <ellipse cx="113" cy="590" rx="3.4" ry="7.6" fill="#d8cae7" opacity="0.5" transform="rotate(-24 113 590)" />
      <ellipse cx="119" cy="597" rx="2.7" ry="6" fill="#c9b3e7" opacity="0.42" transform="rotate(16 119 597)" />
      <ellipse cx="111" cy="589" rx="1.4" ry="4.5" fill="#a8b894" opacity="0.7" transform="rotate(24 111 589)" />
    </>
  )
}

export function BotanicalBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 poster-wash opacity-22" />
      <div className="absolute inset-0 page-harmony-wash" />
      <div className="absolute inset-0 opacity-[0.28] hidden xl:block">
        <svg className="w-full h-full" viewBox="0 0 1200 760" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <VineSide />
          </g>
          <g transform="translate(1200 0) scale(-1 1)">
            <VineSide />
          </g>
        </svg>
      </div>
    </div>
  )
}

