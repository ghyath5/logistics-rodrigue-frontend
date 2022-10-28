import { useEffect, useState } from "react";

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState("laptop");

  useEffect(() => {
    window.innerWidth < 450
      ? setDeviceType("mobile")
      : window.innerWidth < 900
      ? setDeviceType("tablet")
      : setDeviceType("laptop");

    window.addEventListener("resize", () => {
      window.innerWidth < 450
        ? setDeviceType("mobile")
        : window.innerWidth < 900
        ? setDeviceType("tablet")
        : setDeviceType("laptop");
    });
  }, []);

  return { deviceType };
}
