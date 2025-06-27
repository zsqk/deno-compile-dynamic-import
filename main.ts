const filePath = "/dynamic-import/test.ts";

async function getFn(filePath: string): Promise<((a: number, b: number) => number)> {
  const code = await import(import.meta.dirname + filePath)
  return code.add;
}

if (import.meta.main) {
  const fn = await getFn(filePath);
  console.log("Add 2 + 3 =", fn(2, 3));
}
