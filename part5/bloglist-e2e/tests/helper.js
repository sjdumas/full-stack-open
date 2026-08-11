const loginWith = async (page, username, password) => {
	await page.getByLabel("username").fill(username);
	await page.getByLabel("password").fill(password);
	await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, { title, author, url }) => {
	await page.getByRole("button", { name: "New Blog" }).click();
	await page.getByLabel("title").waitFor();
	await page.getByLabel("title").fill(title);
	await page.getByLabel("author").fill(author);
	await page.getByLabel("url").fill(url);
	await page.getByRole("button", { name: "Create" }).click();
	await page.locator(".blog").getByText(title).waitFor();
};

module.exports = { loginWith, createBlog };
