import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const now = new Date();

  return new Response(
    JSON.stringify({
      message: "Current server time",
      time: {
        timestamp: now.toISOString(),
        timezone: "UTC",
        formatted: now.toLocaleString("en-US", { timeZone: "UTC" }),
      },
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
  path: "/api/time",
};
