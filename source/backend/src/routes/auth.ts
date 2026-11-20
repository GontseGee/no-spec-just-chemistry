import { zValidator } from "@hono/zod-validator";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { z } from "zod";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { env } from "../env.js";
import { requireAuth, TOKEN_COOKIE } from "../middleware/auth.js";

const registerSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

const publicUser = (user: { id: string; name: string; email: string }) => ({
	id: user.id,
	name: user.name,
	email: user.email,
});

async function setAuthCookie(
	c: Parameters<typeof setCookie>[0],
	userId: string,
) {
	const token = await sign(
		{
			sub: userId,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
		},
		env.JWT_SECRET,
		"HS256",
	);

	setCookie(c, TOKEN_COOKIE, token, {
		httpOnly: true,
		sameSite: "Lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
		secure: env.NODE_ENV === "production",
	});
}

export const authRoutes = new Hono()
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const { name, email, password } = c.req.valid("json");

		const [existing] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existing) {
			return c.json({ error: "Email already registered" }, 409);
		}

		const passwordHash = await hash(password, 10);
		const [user] = await db
			.insert(users)
			.values({ name, email, password: passwordHash })
			.returning({
				id: users.id,
				name: users.name,
				email: users.email,
			});

		await setAuthCookie(c, user.id);
		return c.json(publicUser(user), 201);
	})
	.post("/login", zValidator("json", loginSchema), async (c) => {
		const { email, password } = c.req.valid("json");

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user || !(await compare(password, user.password))) {
			return c.json({ error: "Invalid email or password" }, 401);
		}

		await setAuthCookie(c, user.id);
		return c.json(publicUser(user));
	})
	.get("/me", requireAuth, (c) => {
		return c.json(c.get("user"));
	});
