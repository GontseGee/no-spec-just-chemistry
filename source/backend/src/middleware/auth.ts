import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { env } from "../env.js";

export type AuthUser = {
	id: string;
	name: string;
	email: string;
};

type AuthEnv = {
	Variables: {
		user: AuthUser;
	};
};

const TOKEN_COOKIE = "token";

export { TOKEN_COOKIE };

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
	const token = getCookie(c, TOKEN_COOKIE);
	if (!token) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	try {
		const payload = await verify(token, env.JWT_SECRET, "HS256");
		const userId = typeof payload.sub === "string" ? payload.sub : null;
		if (!userId) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const [user] = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
			})
			.from(users)
			.where(eq(users.id, userId))
			.limit(1);

		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		c.set("user", user);
		await next();
	} catch {
		return c.json({ error: "Unauthorized" }, 401);
	}
});
