"use client";
import DeviceTable from "@/components/DeviceTable";
import { useSearchParams } from "next/navigation";
import { IframeHTMLAttributes, useEffect, useState } from "react";
import { socket } from "../socket";

function DeviceList() {
  const [devices, setDevices] = useState([]);
  // fetch query params
  const controller = useSearchParams().get("controller");
  const [isConnected, setIsConnected] = useState(false);

  // document.addEventListener("DOMContentLoaded", function () {
  //   const iframe = document.getElementById("grafanaDashboard") as HTMLIFrameElement;
  //   const dashboardURL = "http://db1rp5.local:3000/d/ae35lbartsb28b/loadbank";
  //   // If using API Token
  //   const apiToken = "Bearer YOUR_API_TOKEN";
  //   if (!iframe) return;
  //   iframe.src = dashboardURL;
  //   iframe.onload = function () {
  //     iframe.contentWindow?.postMessage({ message: "set_token", token: apiToken }, "*");
  //   };
  // });

  useEffect(() => {
    console.log("useEffect in devicelist");

    if (socket.connected) {
      console.log("socket already connected");
      onConnect();
    }

    function onConnect() {
      console.log("socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("socket disconnected");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("controller", (data: any) => {
      // console.log("data from server in devicelist:", data);
      setDevices(data.devices);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="w-full p-4 m-4">
      {" "}
      <DeviceTable devices={devices} controller={controller!} />{" "}
      <iframe
        id="grafanaDashboard"
        width="100%"
        height="600"
        frameBorder="0"
        src="http://db1rp5.local:3000/d/ae35lbartsb28b/loadbank"></iframe>
    </div>
  );
}

export default DeviceList;
