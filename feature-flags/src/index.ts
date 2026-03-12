import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import config from "./config";
import { FeatureFlagClient } from "./client";
import type { FeatureFlagRule, User } from "./types";

const env = config.env;
const client = new FeatureFlagClient(config.flags);

const app = new Hono();

app.use("*", serveStatic({ root: "./public" }));
app.use("*", logger());
app.use("*", cors());

const api = app.basePath("/api/v1");

app.use("*", logger());
app.use("*", cors());

api.get("/", (c) => {
  return c.text("Feature Flags API");
});

api.get("/healthz", (c) => {
  return c.json({ status: "ok", env });
});

api.get("/flags", (c) => {
  const flags = client.getFlags();
  return c.json({ flags });
});

api.get("/flags/:id", (c) => {
  const flagId = c.req.param("id");
  const userId = c.req.query("userId") || "";
  const rolesParam = c.req.query("roles");
  const roles = rolesParam ? rolesParam.split(",") : [];

  const user: User = { id: userId, roles };
  const enabled = client.isEnabled(flagId, user);

  return c.json({ flagId, enabled, user: userId ? { id: userId, roles } : null });
});

api.post("/flags", async (c) => {
  const body = await c.req.json<FeatureFlagRule>();
  
  if (!body.id || body.enabled === undefined || !body.conditions) {
    return c.json({ error: "Missing required fields: id, enabled, conditions" }, 400);
  }

  client.setFlag(body.id, body);
  return c.json({ success: true, flag: body });
});

export default app;
