import { serve } from "@hono/node-server";
import app from "./app.js";
import { env } from "./env.js";

export type { AppType } from "./app.js";
export default app;

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`API listening on http://localhost:${info.port}`);
	},
);
