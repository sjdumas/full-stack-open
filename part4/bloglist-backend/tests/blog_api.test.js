const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("blog api", () => {
	let token;
	let rootUser;

	beforeEach(async () => {
		await Blog.deleteMany({});
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		rootUser = new User({ username: "blogapiroot", passwordHash });
		await rootUser.save();

		const blogsWithUser = helper.initialBlogs.map((blog) => ({
			...blog,
			user: rootUser._id,
		}));

		const savedBlogs = await Blog.insertMany(blogsWithUser);

		rootUser.blogs = savedBlogs.map((blog) => blog._id);
		await rootUser.save();

		const loginResponse = await api
			.post("/api/login")
			.send({ username: "blogapiroot", password: "sekret" });

		token = loginResponse.body.token;
	});

	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, helper.initialBlogs.length);
	});

	test("unique identifier property is named id", async () => {
		const response = await api.get("/api/blogs");

		response.body.forEach((blog) => {
			assert(blog.id !== undefined);
			assert.strictEqual(blog._id, undefined);
		});
	});

	describe("addition of a new blog", () => {
		test("succeeds with valid data when token is provided", async () => {
			const newBlog = {
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
			};

			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

			const titles = blogsAtEnd.map((b) => b.title);
			assert(titles.includes("Canonical string reduction"));
		});

		test("fails with status 401 if token is not provided", async () => {
			const newBlog = {
				title: "First class tests",
				author: "Robert C. Martin",
				url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
				likes: 10,
			};

			const blogsAtStart = await helper.blogsInDb();

			await api.post("/api/blogs").send(newBlog).expect(401);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
		});

		test("if likes is missing, it defaults to 0", async () => {
			const newBlog = {
				title: "First class tests",
				author: "Robert C. Martin",
				url: "https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
			};

			const response = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			assert.strictEqual(response.body.likes, 0);
		});

		test("fails with status 400 if title is missing", async () => {
			const newBlog = {
				author: "Robert C. Martin",
				url: "https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
				likes: 0,
			};

			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(400);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
		});

		test("fails with status 400 if url is missing", async () => {
			const newBlog = {
				title: "TDD harms architecture",
				author: "Robert C. Martin",
				likes: 0,
			};

			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(400);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
		});
	});

	describe("deletion of a blog", () => {
		test("succeeds with status code 204 if id is valid and user is the creator", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToDelete = blogsAtStart[0];

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(204);

			const blogsAtEnd = await helper.blogsInDb();

			const titles = blogsAtEnd.map((b) => b.title);
			assert(!titles.includes(blogToDelete.title));

			assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
		});

		test("fails with status 401 if token is not provided", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToDelete = blogsAtStart[0];

			await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
		});

		test("fails with status 401 if a different user attempts the deletion", async () => {
			const passwordHash = await bcrypt.hash("anotherpass", 10);
			const otherUser = new User({ username: "blogapiintruder", passwordHash });
			await otherUser.save();

			const loginResponse = await api
				.post("/api/login")
				.send({ username: "blogapiintruder", password: "anotherpass" });
			const otherToken = loginResponse.body.token;

			const blogsAtStart = await helper.blogsInDb();
			const blogToDelete = blogsAtStart[0];

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set("Authorization", `Bearer ${otherToken}`)
				.expect(401);

			const blogsAtEnd = await helper.blogsInDb();
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
		});
	});

	describe("updating a blog", () => {
		test("succeeds in updating the number of likes", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToUpdate = blogsAtStart[0];

			const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

			const response = await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(updatedBlog)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);

			const blogsAtEnd = await helper.blogsInDb();
			const savedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
			assert.strictEqual(savedBlog.likes, blogToUpdate.likes + 1);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
