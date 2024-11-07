import { Suspense } from "react";
import DeviceList from "./devicelist";
import Link from "next/link";

export const dynamic = "force-dynamic";
const DevicePage = () => {
  return (
    <div className="w-full p-4 m-4">
      <Link href="/" className="text-blue-400">
        Go Back
      </Link>
      <h1>Devices</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DeviceList />
      </Suspense>
    </div>
  );
};

export default DevicePage;
