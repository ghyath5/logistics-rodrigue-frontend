import { useEffect, useState } from "react";

export default function useDeviceType() {
  const getDeviceType = () => {
    if (window.innerWidth < 450) return "mobile";
    if (window.innerWidth < 900) return "tablet";
    return "laptop";
  };

  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { deviceType };
}
