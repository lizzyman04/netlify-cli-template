import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId") ?? crypto.randomUUID();

  // Background functions run for up to 15 minutes.
  // Return immediately — heavy work continues in the background.
  runExport(jobId).catch((err) => console.error("Export failed", err));

  return new Response(
    JSON.stringify({ status: "accepted", jobId, requestId: context.requestId }),
    {
      status: 202,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

async function runExport(jobId: string): Promise<void> {
  // Simulate a long-running export — replace with real logic.
  console.log(`Starting export for job ${jobId}`);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Export complete for job ${jobId}`);
}

export const config: Config = {
  path: "/api/process-export",
};
