# Zypher Travel Agent

A small agent demo built with **Zypher** and **Anthropic Claude**.  
The goal of the project is mainly to experiment with:
- Zypher’s agent runtime
- Event/token streaming
- Function calling
- Generating structured output (itinerary tables, markdown) from natural-language input
  
The agent takes a user request (e.g., “make a Japan itinerary in table format”), runs it through a Zypher workflow, and returns a structured itinerary. 

---

## Features

- Convert free-form natural language into a structured itinerary
- Real-time token streaming
- Automatic markdown/table generation
- Minimal TypeScript + Deno setup
- Includes both:
   - A terminal-only agent runner
   - A simple browser UI powered by a small local server


---

## Tech Stack

- **Deno**
- **Zypher Agent Runtime**
- **Anthropic Claude**
- **HTML + TypeScript**
- (Optional) Firecrawl MCP — currently not used

---

## Running the Terminal Version

1. Install Deno  
   https://deno.land

2. Add your API key to `.env`(not committed).

3. Run:

```bash
deno run -A --env=.env main.ts
```
## Running the Browser UI

1. Start the development server:
```bash
 deno run -A server.ts
```

2. Open the UI in your browser:

```bash
 http://localhost:8000
```
Enter a travel request and watch the agent stream back its output.


## File Structure
```bash
.
├── index.html        # Simple browser UI
├── server.ts         # Local API endpoint for the UI
├── main.ts           # Core agent logic + streaming handler
├── deno.json
├── deno.lock
├── .env              # API keys (ignored in repo)
└── README.md

```
## Notes

- The project avoids Node.js and external MCP servers to keep the setup simple.

- Streaming is powered by Zypher’s event system.

- The project is meant as a small end-to-end example rather than a full production agent.

## License

MIT
