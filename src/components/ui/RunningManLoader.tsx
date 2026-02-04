"use client";

const RunningManLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-run text-gray-700"
      >
        <circle cx="13" cy="4" r="2" />
        <path d="M9 22l1-7-3-3 2-4" />
        <path d="M15 22l-1-5 3-3" />
        <path d="M7 10l4 2 3-3" />
      </svg>

      <p className="text-sm text-gray-500 animate-pulse">Generating image...</p>
    </div>
  );
};

export default RunningManLoader;
