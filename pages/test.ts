import { text } from "../other.ts";

export function get(_req: Request): Response {
  return new Response(text);
}
