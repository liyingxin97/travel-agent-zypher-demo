// server.ts — FINAL VERSION for Zypher 0.5.x (streaming + structured output)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

import {
  createZypherContext,
  ZypherAgent,
  AnthropicModelProvider,
} from "@corespeed/zypher";

const ctx = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  ctx,
  new AnthropicModelProvider({
    apiKey: Deno.env.get("ANTHROPIC_API_KEY")!,
  }),
);

console.log("Server running at http://localhost:8000");

serve(async (req) => {
  const url = new URL(req.url);

  // Serve frontend files
  if (req.method === "GET") {
    return serveDir(req, { fsRoot: ".", urlRoot: "" });
  }

  // Run Task API
  if (req.method === "POST" && url.pathname === "/run-task") {
    try {
      const { prompt } = await req.json();

      // ⚠️ IMPORTANT: Use Haiku 4.5 (fastest + cheapest)
      const stream$ = agent.runTask(prompt, "claude-sonnet-4-5-20250929");
    
      // Prepare streaming response
      const readable = new ReadableStream({
        start(controller) {
          stream$.subscribe({
            next(evt) {
              if (evt.type === "message") {
                for (const part of evt.message.content) {
                  if (part.type === "text") {
                    controller.enqueue(
                      new TextEncoder().encode(part.text)
                    );
                  }
                }
              }
            },
            error(err) {
              controller.error(err);
            },
            complete() {
              controller.close();
            },
          });
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });

    } catch (err) {
      console.error("Agent Error:", err);
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return new Response("Not found", { status: 404 });
});
