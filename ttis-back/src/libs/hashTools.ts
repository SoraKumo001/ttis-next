import * as crypto from "crypto";

export function getSHA256(v1: string, v2?: string): string {
  return crypto
    .createHash("sha256")
    .update(v1 + (v2 ? v2 : ""))
    .digest("hex");
}