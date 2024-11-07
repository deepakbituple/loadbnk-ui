import { getWithoutCache } from "@/lib/db_utils";
import { IDevice } from "./device_service";

export interface IController {
  controller_id: string;
  type: string;
  name: string;
  devices: any[];
}
const apiUrl = process.env.BACKEND_SERVER_URL + "/api/controllers";

export async function getControllers() {
  console.log("In get controllers from server......controller");
  // use fetch api to make http get request to server to get the devices

  console.log("reqUrl", apiUrl);
  const result = await getWithoutCache(apiUrl);
  const controllers: IController[] = result;
  console.log("controllers from db", controllers);
  // return the devices
  return controllers;
}

export async function getController(controllerId: string) {
  console.log("In get controller from server......controller", controllerId);
  // use fetch api to make http get request to server to get the devices
  const reqUrl = `${apiUrl}/${controllerId}`;
  console.log("reqUrl", reqUrl);
  const result = await getWithoutCache(reqUrl);
  const controller: IController = result;
  console.log("controller from db", controller);
  // return the devices
  return controller;
}
