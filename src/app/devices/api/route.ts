// import { getCommands } from "@/lib/command_service";
import * as ControllerService from "@/lib/controller_service";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const controllerId = searchParams.get("controller") || "";
  const controller = await ControllerService.getController(controllerId);

  return new Response(JSON.stringify(controller), {
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
  // await updateDevices(controller, deviceJSON.values);
  // const commands = await getCommands(controller);
  await revalidateTag("devices");
  await revalidatePath("/devices/controller=" + controller);
  const response: CommandsResponse = {};
  // commands.forEach((command) => {
  //   response[command.code] = command.value;
  // });

  return NextResponse.json(response);
}
