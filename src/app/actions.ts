"use server";

import { updateCommand } from "@/lib/command_service";
import { IDevice } from "@/lib/device_service";

export async function toggleState({ device }: { device: IDevice }) {
  try {
    console.log("In toggle state......device", device);
    const state = device.state === "ON" ? "OFF" : "ON";
    device.state = state;
    await updateCommand(device.controller!, device.device, state);
    // await revalidateTag("devices");
  } catch (error) {
    throw error;
  }
}
