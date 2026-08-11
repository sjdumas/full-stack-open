const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		const resetRes = await request.post("/api/testing/reset");
		if (!resetRes.ok()) {
			console.log("RESET FAILED:", resetRes.status(), await resetRes.text());
		}

		const userRes = await request.post("/api/users", {
			data: {
				name: "Matti Luukkainen",
				username: "mluukkai",
				password: "salainen",
			},
		});
		if (!userRes.ok()) {
			console.log("USER CREATE FAILED:", userRes.status(), await userRes.text());
		}

		await page.goto("/");
	});

	test("Login form is shown", async ({ page }) => {
		await expect(page.getByText("Log In to Application")).toBeVisible();
		await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			await loginWith(page, "mluukkai", "salainen");
			await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
		});

		test("fails with wrong credentials", async ({ page }) => {
			await loginWith(page, "mluukkai", "wrong");
			await expect(page.getByText("wrong username or password")).toBeVisible();
			await expect(page.getByText("Matti Luukkainen logged in")).not.toBeVisible();
		});
	});

	describe("When logged in", () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, "mluukkai", "salainen");
		});

		test("a new blog can be created", async ({ page }) => {
			await createBlog(page, {
				title: "Testing Playwright",
				author: "Alan Turing",
				url: "http://example.com",
			});

			await expect(page.locator(".blog").getByText("Testing Playwright")).toBeVisible();
		});

		describe("and a blog exists", () => {
			beforeEach(async ({ page }) => {
				await createBlog(page, {
					title: "Testing Playwright",
					author: "Alan Turing",
					url: "http://example.com",
				});
			});

			test("a blog can be liked", async ({ page }) => {
				const blog = page.locator(".blog", { hasText: "Testing Playwright" });

				await blog.getByRole("button", { name: "view" }).click();
				await blog.getByRole("button", { name: "like" }).click();

				await expect(blog.getByText("likes 1")).toBeVisible();
			});

			test("the user who created the blog can delete it", async ({ page }) => {
				const blog = page.locator(".blog", { hasText: "Testing Playwright" });

				await blog.getByRole("button", { name: "view" }).click();

				page.on("dialog", (dialog) => dialog.accept());

				await blog.getByRole("button", { name: "remove" }).click();

				await expect(page.locator(".blog", { hasText: "Testing Playwright" })).not.toBeVisible();
			});

			test("only the creator sees the delete button for their blog", async ({ page, request }) => {
				await request.post("/api/users", {
					data: {
						name: "Ada Lovelace",
						username: "ada",
						password: "secret123",
					},
				});

				const blog = page.locator(".blog", { hasText: "Testing Playwright" });
				await blog.getByRole("button", { name: "view" }).click();
				await expect(blog.getByRole("button", { name: "remove" })).toBeVisible();

				await page.getByRole("button", { name: "Logout" }).click();
				await loginWith(page, "ada", "secret123");

				const sameBlog = page.locator(".blog", { hasText: "Testing Playwright" });
				await sameBlog.getByRole("button", { name: "view" }).click();
				await expect(sameBlog.getByRole("button", { name: "remove" })).not.toBeVisible();
			});
		});

		describe("blog ordering", () => {
			test("blogs are ordered by likes, most liked first", async ({ page }) => {
				await createBlog(page, { title: "Blog A", author: "Author A", url: "http://a.com" });
				await createBlog(page, { title: "Blog B", author: "Author B", url: "http://b.com" });
				await createBlog(page, { title: "Blog C", author: "Author C", url: "http://c.com" });

				const likeBlog = async (title, times) => {
					const blog = page.locator(".blog", { hasText: title });
					await blog.getByRole("button", { name: "view" }).click();
					for (let i = 0; i < times; i++) {
						await blog.getByRole("button", { name: "like" }).click();
						await expect(blog.getByText(`likes ${i + 1}`)).toBeVisible();
					}
				};

				await likeBlog("Blog A", 1);
				await likeBlog("Blog B", 3);
				await likeBlog("Blog C", 2);

				const blogs = page.locator(".blog");
				await expect(blogs).toHaveCount(3);
				await expect(blogs.nth(0)).toContainText("Blog B");
				await expect(blogs.nth(1)).toContainText("Blog C");
				await expect(blogs.nth(2)).toContainText("Blog A");
			});
		});
	});
});
