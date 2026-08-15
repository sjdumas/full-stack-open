import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import Blog from "./Blog";

const blog = {
	title: "Component testing is done with react-testing-library",
	author: "Kalle Ilves",
	url: "http://example.com",
	likes: 5,
	user: { username: "kalleilves", name: "Kalle Ilves" },
};

test("blog info and likes are shown, but no buttons, when no user is logged in", () => {
	render(<Blog blog={blog} user={null} />);

	screen.getByText("Component testing is done with react-testing-library", { exact: false });
	expect(screen.getAllByText("Kalle Ilves", { exact: false }).length).toBeGreaterThan(0);
	screen.getByText("http://example.com");
	screen.getByText("likes 5", { exact: false });

	expect(screen.queryByText("like")).toBeNull();
	expect(screen.queryByText("remove")).toBeNull();
});

test("a logged in user who is not the creator sees only the like button", () => {
	const loggedInUser = { username: "someoneelse", name: "Someone Else" };

	render(<Blog blog={blog} user={loggedInUser} />);

	screen.getByText("like");
	expect(screen.queryByText("remove")).toBeNull();
});

test("the blog's creator also sees the delete button", () => {
	const creator = { username: "kalleilves", name: "Kalle Ilves" };

	render(<Blog blog={blog} user={creator} />);

	screen.getByText("like");
	screen.getByText("remove");
});

test("clicking the like button twice calls event handler twice", async () => {
	const mockHandler = vi.fn();
	const loggedInUser = { username: "someoneelse", name: "Someone Else" };

	render(<Blog blog={blog} handleLike={mockHandler} user={loggedInUser} />);
	const user = userEvent.setup();

	const likeButton = screen.getByText("like");
	await user.click(likeButton);
	await user.click(likeButton);

	expect(mockHandler.mock.calls).toHaveLength(2);
});