"use client";

type RunningManLoaderProps = {
  title?: string;
  subtitle?: string;
};

const RunningManLoader = ({
  title = "Generating your food image",
  subtitle = "Please wait a few seconds",
}: RunningManLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-4">
      <div className="h-14 w-14 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin" />

      <div className="text-center">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-1 pt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-dot-bounce [animation-delay:-0.2s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-dot-bounce [animation-delay:-0.1s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-600 animate-dot-bounce" />
      </div>
    </div>
  );
};

export default RunningManLoader;
