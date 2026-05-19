import { neon } from "@neondatabase/serverless";
import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ error: "DATABASE_URL environment variable is not set" }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() AS current_time`;

    return new Response(
      JSON.stringify({
        message: "Connected to Neon Postgres",
        currentTime: result[0].current_time,
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Database query failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

export const config: Config = {
  path: "/api/neon",
};
