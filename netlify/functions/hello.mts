import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "Guest";

  return new Response(
    JSON.stringify({
      message: `Hello, ${name}! Welcome to the Netlify CLI template.`,
      requestId: context.requestId,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

export const config: Config = {
  path: "/api/hello",
};
