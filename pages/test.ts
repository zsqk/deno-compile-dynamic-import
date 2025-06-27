import { text } from "../other";

export function get(_req: Request): Response {
  return new Response(text);
}
