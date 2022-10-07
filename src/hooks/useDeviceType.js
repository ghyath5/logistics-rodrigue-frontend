import { useEffect, useState } from "react";

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState("laptop");

  useEffect(() => {
    window.screen.width < 450
      ? setDeviceType("mobile")
      : window.screen.width < 900
      ? setDeviceType("tablet")
      : setDeviceType("laptop");

    window.addEventListener("resize", () => {
      window.screen.width < 450
        ? setDeviceType("mobile")
        : window.screen.width < 900
        ? setDeviceType("tablet")
        : setDeviceType("laptop");
    });
  }, []);

  return { deviceType };
}
