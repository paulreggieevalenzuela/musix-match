import { useState, useEffect } from "react";

const ProgressBar = ({ progress }: any) => {
  return (
    <div className="w-full bg-gray-200 h-3 overflow-hidden">
      <div
        className="h-full bg-gray-400 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const LoadingComponent = ({ className }: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default LoadingComponent;