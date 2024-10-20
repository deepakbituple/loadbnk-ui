"use client";
import DeviceTable from "@/components/DeviceTable";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

function DevicePage() {
  const [devices, setDevices] = useState([]);
  // fetch query params
  const searchParams = useSearchParams();
  const controller = searchParams.get("controller");

  useEffect(() => {
    const fetchDevices = async () => {
      console.log("fetching devices", controller);
      const res = await fetch("devices/api?controller=" + controller);
      const data = await res.json();
      setDevices(data);
    };
    const intervalId = setInterval(fetchDevices, 1000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [controller]);

  return (
    <div className="w-full p-4 m-4">
      <h1>Devices</h1>
      <DeviceTable devices={devices} />
    </div>
  );
}

export default DevicePage;
