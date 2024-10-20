/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IDevice } from "@/lib/device_service";
import { formatDateStr } from "@/lib/utils";
import DeviceStateButton from "./DeviceStateButton";

function DeviceTable({ devices }: { devices: IDevice[] }) {
  return (
    <div>
      <Table>
        <TableCaption>List of Devices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-bold content-center">Device Name</TableHead>
            <TableHead className="w-[200px] font-bold content-center">Status</TableHead>
            <TableHead className="w-[300px] font-bold text-center">Last Seen</TableHead>
            <TableHead className="text-center">Controller</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.device}>
              <TableCell>{device.device}</TableCell>
              <TableCell>
                <DeviceStateButton device={device} />
              </TableCell>
              <TableCell className="w-[300px] text-center">{formatDateStr(device.last_seen)}</TableCell>
              <TableCell className="text-center">{device.controller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DeviceTable;
