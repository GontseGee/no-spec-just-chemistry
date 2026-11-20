import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./env.js";
import { logger } from "./middleware/logger.js";
import { authRoutes } from "./routes/auth.js";

const app = new Hono()
	.use("*", logger)
	.use(
		"*",
		cors({
			origin: env.CORS_ORIGIN,
			credentials: true,
		}),
	)
	.get("/health", (c) => c.json({ ok: true }))
	.route("/auth", authRoutes);

export type AppType = typeof app;
export default app;
