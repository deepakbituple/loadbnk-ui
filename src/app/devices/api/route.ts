import { getCommands } from "@/lib/command_service";
import { getDevices, IDevice, updateDevices } from "@/lib/device_service";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const controller = searchParams.get("controller") || "";

  // console.log("api route called " + request.url + " controller " + controller);
  const devices: IDevice[] = await getDevices(controller);
  return new Response(JSON.stringify(devices), {
    headers: { "content-type": "application/json" },
  });
}

interface CommandsResponse {
  [key: string]: string;
}

export async function POST(req: NextRequest) {
  // console.log("api route called " + req.url);
  const deviceJSON = await req.json();
  // console.log("deviceJSON", deviceJSON);
  const controller = deviceJSON.ID;
  await updateDevices(controller, deviceJSON.values);
  const commands = await getCommands(controller);
  await revalidateTag("devices");
  await revalidatePath("/devices/controller=" + controller);
  const response: CommandsResponse = {};
  commands.forEach((command) => {
    response[command.code] = command.value;
  });

  return NextResponse.json(response);
}
