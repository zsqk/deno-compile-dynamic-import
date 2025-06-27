const filePath = "/dynamic-import/test.ts";
const fn = await import(import.meta.dirname + filePath).then((m) => m.add);

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", fn(2, 3));
}
