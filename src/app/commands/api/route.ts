import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// export async function GET(request: NextRequest) {

// //   const searchParams = request.nextUrl.searchParams;
// //   const query = searchParams.get("query");
// //   console.log("api route called " + request.url + " query " + query);
// //   console.log("refresh api route called " + request.url);
// //   revalidateTag("devices");
// //   revalidatePath("/");
//   return new Response(JSON.stringify({ message: "refreshed" }), {
//     headers: { "content-type": "application/json" },
//   });
// }

export async function POST(req: NextRequest) {
  console.log("api route called " + req.url);
  const params = req.nextUrl.searchParams.get("query");
  console.log("params", params);
  await revalidateTag("devices");
  revalidatePath("/devices/controller=EC-LB-100-5110-01");
  return NextResponse.json({
    status: 200,
    revalidated: true,
    now: Date.now(),
  });
}
