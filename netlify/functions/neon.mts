import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  return new Response(
    JSON.stringify({
      message: "Neon extension endpoint ready",
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
  path: "/api/neon",
};
