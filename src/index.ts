#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "devpulse",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_session_snapshot",
        description:
          "Returns a real-time diagnostic snapshot of the current dev environment. Includes health diagnosis, running services, recent errors, git state, and environment info. Call this first to orient yourself in the user's dev session.",
        inputSchema: {
          type: "object",
          properties: {
            cwd: {
              type: "string",
            },
          },
        },
      },
      {
        name: "get_recent_errors",
        description:
          "Returns recent ERROR and WARN log entries from the detected project's log files. Deduped, timestamped, secrets redacted. Defaults to last 50 lines.",
        inputSchema: {
          type: "object",
          properties: {
            cwd: {
              type: "string",
            },
            limit: {
              type: "number",
            },
          },
        },
      },
      {
        name: "get_running_services",
        description:
          "Lists processes running on common dev ports (3000, 4000, 5173, 8080 etc). Shows what is running and what is expected but missing.",
        inputSchema: {
          type: "object",
          properties: {
            cwd: {
              type: "string",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          error: `Tool '${toolName}' is registered but not yet implemented.`,
        }),
      },
    ],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("devpulse MCP server running\n");
}

main().catch((error) => {
  process.stderr.write(`${String(error)}\n`);
  process.exit(1);
});
