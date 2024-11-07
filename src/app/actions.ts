"use server";

import { updateCommand } from "@/lib/command_service";
import { IDevice } from "@/lib/device_service";

export async function toggleState({ controller, device }: { controller: string; device: IDevice }) {
  try {
    console.log("In toggle state......device", device);
    const state = device.value === "ON" ? "OFF" : "ON";
    device.value = state;
    await updateCommand(controller, device.device_id, state);
    // await revalidateTag("devices");
  } catch (error) {
    throw error;
  }
}
