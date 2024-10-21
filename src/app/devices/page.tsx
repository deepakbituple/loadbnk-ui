import { Suspense } from "react";
import DeviceList from "./devicelist";

export const dynamic = "force-dynamic";
const DevicePage = () => {
  return (
    <div className="w-full p-4 m-4">
      <h1>Devices</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DeviceList />
      </Suspense>
    </div>
  );
};

export default DevicePage;
