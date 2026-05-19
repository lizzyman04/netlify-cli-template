import type { Config } from "@netlify/functions";

export default async (): Promise<Response> => {
  console.log("Running daily cleanup at", new Date().toISOString());

  // Add cleanup logic here — e.g. purge stale blobs, archive records, etc.

  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config: Config = {
  schedule: "0 0 * * *",
};
