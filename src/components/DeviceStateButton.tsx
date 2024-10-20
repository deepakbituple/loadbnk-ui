"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { IDevice } from "@/lib/device_service";
import { toggleState } from "@/app/actions";
import { ToastAction } from "./ui/toast";

function DeviceStateButton({ device }: { device: IDevice }) {
  const { toast } = useToast();

  async function handleOnClick() {
    try {
      await toggleState({ device });
      toast({
        variant: "default",
        title: "Success",
        description: `Device ${device.device} state toggled`,
      });
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,

        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }
  const buttonColor = device.state === "ON" ? "bg-green-500" : "bg-red-500";
  return (
    <Button className={`${buttonColor} w-20 hover:opacity-50 text-lg font-semibold`} onClick={handleOnClick}>
      {device.state}
    </Button>
  );
}

export default DeviceStateButton;
