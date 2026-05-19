import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "default";
  const store = getStore("app-data");

  if (req.method === "GET") {
    const value = await store.get(key);
    return new Response(
      JSON.stringify({ key, value: value ?? null, requestId: context.requestId }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  if (req.method === "PUT") {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await store.set(key, JSON.stringify(body));
    return new Response(
      JSON.stringify({ key, status: "stored", requestId: context.requestId }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "GET, PUT" },
  });
};

export const config: Config = {
  path: "/api/blobs",
};
