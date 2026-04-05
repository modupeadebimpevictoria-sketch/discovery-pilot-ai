export default function Jobs() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 pb-24 pt-16"
      style={{ background: "#f8f7ff" }}
    >
      <div className="text-center max-w-sm space-y-5">
        <div className="flex justify-center">
          <span className="animate-bounce" style={{ fontSize: "64px", lineHeight: 1 }}>💼</span>
        </div>
        <h1
          className="text-2xl font-bold leading-snug"
          style={{ color: "#1a1a2e" }}
        >
          Your first job is closer than you think.
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#7c7291" }}
        >
          Real jobs for teenagers. Coming soon.
        </p>
        <p
          className="text-xs leading-relaxed mt-8 pt-2"
          style={{ color: "#a39bb5" }}
        >
          Add Findr to your home screen to be the first to know.
        </p>
      </div>
    </div>
  );
}
