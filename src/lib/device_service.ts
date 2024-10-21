import { dbpool } from "@/lib/db_utils";
import { revalidateTag } from "next/cache";

export interface IDevice {
  device: string;
  type?: string;
  state?: string;
  last_seen?: string;
  controller?: string;
}

// export async function getDevices(controller: string) {
//   console.log("In get devices from server......controller", controller);
//   // use fetch api to make http get request to server to get the devices
//   const reqUrl = `${apiUrl}?controller=${controller}`;
//   console.log("reqUrl", reqUrl);
//   const result = await getWithCache(reqUrl, ["devices"]);
//   const devices: IDevice[] = result.devices;
//   // console.log("devices from db", devices);
//   // return the devices
//   return devices;
// }

export async function getDevices(controller: string): Promise<IDevice[]> {
  const devices: IDevice[] = [];
  let connection;
  const query = "SELECT * FROM device where controller = '" + controller + "'";
  // execute the query and return the result
  try {
    connection = await dbpool.getConnection();
    const [results, fields] = (await connection.query(query)) as [any[], any];
    // console.log("In fetch device on server", fields);
    // console.log("fetch device Results: ", results, "fields: ", fields);
    for (const row of results) {
      const device: IDevice = {
        controller: row.controller,
        device: row.device,
        type: row.type,
        state: row.state,
        last_seen: row.last_seen,
      };
      devices.push(device);
    }
  } catch (error) {
    console.error("Error fetching devices from database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }

  return devices;
}

// export async function updateDevice(device: IDevice) {
//   console.log("In update device from server......device", device);
//   // use fetch api to make http post request to server to update the device
//   const reqUrl = `${apiUrl}/${device.controller}`;
//   console.log("reqUrl", reqUrl);
//   const state = device.state == "ON" ? "OFF" : "ON";
//   const deviceArray = [{ device: device.device, state: state }];
//   const response = await fetch(reqUrl, {
//     method: "PUT",
//     body: JSON.stringify(deviceArray),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const result = await response.json();
//   console.log("result from db", result);
//   // return the result
//   return result;
// }

export async function updateDevices(controller: string, deviceInput: any) {
  // console.log("Updating device status for controller: ", controller, deviceInput);
  let connection: any;
  const updateQuery = "UPDATE device SET state = ?, last_seen = ? WHERE device = ? and controller = ?";
  const currentDateTime = new Date();
  let changedRows = 0;
  try {
    connection = await dbpool.getConnection();
    connection.beginTransaction();
    for (const [key, value] of Object.entries(deviceInput)) {
      const [results] = await connection.query(updateQuery, [value, currentDateTime, key, controller]);
      // console.log("Device ", key, " updated successfully", results);
    }

    connection.commit();
    revalidateTag("devices");
  } catch (error) {
    if (connection) connection.rollback();
    changedRows = 0;
    console.error("Error updating devices in  database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
  return changedRows;
}

export async function createMultipleDevices(devices: IDevice[]): Promise<boolean> {
  let connection;
  const query = "INSERT INTO device (device, type, state,  controller) VALUES ?";
  // execute the query and return the result
  try {
    connection = await dbpool.getConnection();
    const values = devices.map((device) => [device.device, device.type, device.state, device.controller]);
    const [results] = (await connection.query(query, [values])) as [any[], any];
    console.log("create device Results: ", results);
    return true;
  } catch (error) {
    console.error("Error creating device in database", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}
