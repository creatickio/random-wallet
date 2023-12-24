import { headers } from "next/headers";

export default function IPAddress() {
  const header = headers();
  const ipAddress = (header.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];
  return ipAddress;
}
