# devpulse

Zero-config MCP server that gives AI coding assistants a real-time diagnostic snapshot of your local dev environment

> [!WARNING]
> Under active development — v0.1.0 coming soon

## Install

### Claude Code

```bash
claude mcp add devpulse -- npx -y devpulse-mcp
```

### Claude Desktop / Cursor / Windsurf

```json
{
  "mcpServers": {
    "devpulse": {
      "command": "npx",
      "args": ["-y", "devpulse-mcp"]
    }
  }
}
```

## What it does

- health diagnosis
- running services
- recent errors
- git state
- environment info
