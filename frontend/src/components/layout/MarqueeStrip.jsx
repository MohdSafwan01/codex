export default function MarqueeStrip() {
  const text = 'DIGITAL KNOWLEDGE · INSTANT DOWNLOAD · CODEX · CURATED COLLECTION · KNOWLEDGE WORTH OWNING · ';

  return (
    <div className="marquee-container my-0">
      {/* Row 1: left to right */}
      <div className="overflow-hidden py-2">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={`a-${i}`} className="marquee-item">
              {text}<span className="dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: right to left */}
      <div className="overflow-hidden py-2">
        <div className="marquee-track reverse">
          {[...Array(4)].map((_, i) => (
            <span key={`b-${i}`} className="marquee-item" style={{ opacity: 0.4 }}>
              {text}<span className="dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
