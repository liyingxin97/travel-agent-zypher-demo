# Zypher Travel Agent

A small agent demo built with **Zypher** and **Anthropic Claude**.  
The goal was to test Zypher’s agent runtime, event streaming, and file creation capabilities by generating a travel itinerary from natural-language instructions.

This repo contains a minimal setup: a single TypeScript entry file and a generated itinerary file.

---

## What this does

- Takes a natural-language request (e.g., “make a 5-day Japan itinerary”)
- Sends it to a Zypher agent backed by Claude
- Streams back events and tokens in real time
- Lets the model call `create_file` to write a markdown document

There’s no UI.  
Everything runs in the terminal.

---

## Tech Stack

- **Deno**
- **Zypher Agent Runtime**
- **Anthropic Claude**
- (Optional) Firecrawl MCP — currently not used

---

## Running It

1. Install Deno  
   https://deno.land

2. Add your API key:


Put it in `.env`.

3. Run:

```bash
deno run -A --env=.env main.ts
```
When the agent finishes, you’ll see a file:
```bash
japan-5-day-itinerary.md
```
## File Structure
```bash
.
├── main.ts        # agent setup + streaming loop
├── .env
├── README.md
└── japan-5-day-itinerary.md (generated)
```
## Notes

The project avoids Node.js and external MCP servers to keep the setup simple.

Streaming is handled through `eachValueFrom(event$)`.

The whole point was just to get a small Zypher + Claude workflow running end-to-end.

## License

MIT
