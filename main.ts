Deno.serve({ port: 9000 }, async (req) => {
  const url = new URL(req.url);

  const routerFilePath = import.meta.dirname +
    `/pages${url.pathname}.ts`;

  console.log(`routerFilePath: ${routerFilePath}`);
  const fn = await import(routerFilePath)
    .then((m) => {
      const fn = m[req.method.toLowerCase()];
      if (typeof fn === "function") {
        return fn;
      }
      console.error("路由处理文件中没有路由处理函数, 程序可能有误");
      return null;
    }).catch((err) => {
      console.error("没有找到路由处理文件, 可能为非法访问:", err);
      return null;
    });

  if (!fn) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  
  // 执行路由处理函数并确保响应有统一的基础头部
  const response = await fn(req);
  
  // 如果路由返回的不是 Response 对象，包装它
  if (!(response instanceof Response)) {
    return new Response(Deno.inspect(response), {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  
  return response;
});
