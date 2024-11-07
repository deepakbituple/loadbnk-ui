import Link from "next/link";
import * as controllerService from "@/lib/controller_service";

//inform next to do not cache the page

export default async function Home() {
  const controllers = await controllerService.getControllers();
  return (
    <div className=" p-4 m-4">
      <h1>Controllers</h1>

      {controllers.map((controller) => (
        <div key={controller.controller_id}>
          <Link href={`/devices?controller=${controller.controller_id}`}>
            <h2 className="font-bold text-blue-400">
              {controller.name} - {controller.controller_id}
            </h2>
          </Link>
          <ul>
            {controller.devices.map((device) => (
              <li key={device.device_id}>
                {device.name} - {device.device_id}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
