import { useEffect, useState } from "react";
import "./Loading.css";
export const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress; // Cap the progress at 100%
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    // Loading bar
    <div className="progress-bar">
      <div className="inside-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};
