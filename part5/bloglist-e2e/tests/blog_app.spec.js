const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				name: "Matti Luukkainen",
				username: "mluukkai",
				password: "salainen",
			},
		});

		await page.goto("/");
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
				await page.getByRole("link", { name: "Testing Playwright Alan Turing" }).click();

				await page.getByRole("button", { name: "like" }).click();

				await expect(page.getByText("likes 1")).toBeVisible();
			});

			test("the user who created the blog can delete it", async ({ page }) => {
				await page.getByRole("link", { name: "Testing Playwright Alan Turing" }).click();

				page.on("dialog", (dialog) => dialog.accept());

				await page.getByRole("button", { name: "remove" }).click();

				await expect(page).toHaveURL("/");
				await expect(page.locator(".blog", { hasText: "Testing Playwright" })).not.toBeVisible();
			});
		});
	});
});
