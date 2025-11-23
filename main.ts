import "jsr:@std/dotenv/load";

import {
  createZypherContext,
  ZypherAgent,
  AnthropicModelProvider,
} from "@corespeed/zypher";

import { eachValueFrom } from "rxjs-for-await";

const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");

const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new AnthropicModelProvider({
    apiKey,
  })
);

const task = `
You are a travel assistant. Create a detailed 5-day Japan travel itinerary.
Include:
- cities
- food
- transport
- budget tips
`;

const event$ = agent.runTask(task, "claude-sonnet-4-5-20250929");

for await (const event of eachValueFrom(event$)) {
  console.log("EVENT:", event);
}

console.log("Finished!");
