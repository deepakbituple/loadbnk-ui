import Link from "next/link";

//inform next to do not cache the page

export default async function Home() {
  return (
    <div className=" p-4 m-4">
      <h1>Devices</h1>
      <Link href={"/devices?controller=EC-LB-100-5110-01"}>Get Device</Link>
    </div>
  );
}
