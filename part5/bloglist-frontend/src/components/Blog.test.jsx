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

test("renders title and author, but not url or likes by default", () => {
	const { container } = render(<Blog blog={blog} user={null} />);

	screen.getByText("Component testing is done with react-testing-library", { exact: false });
	screen.getByText("Kalle Ilves", { exact: false });

	const details = container.querySelector(".blogDetails");
	expect(details).toBeNull();
});

test("url and likes are shown when the view button is clicked", async () => {
	const { container } = render(<Blog blog={blog} user={null} />);
	const user = userEvent.setup();

	const button = screen.getByText("view");
	await user.click(button);

	const details = container.querySelector(".blogDetails");
	expect(details).not.toBeNull();

	screen.getByText("http://example.com");
	screen.getByText("likes 5", { exact: false });
});

test("clicking the like button twice calls event handler twice", async () => {
	const mockHandler = vi.fn();
	render(<Blog blog={blog} handleLike={mockHandler} user={null} />);
	const user = userEvent.setup();

	await user.click(screen.getByText("view"));

	const likeButton = screen.getByText("like");
	await user.click(likeButton);
	await user.click(likeButton);

	expect(mockHandler.mock.calls).toHaveLength(2);
});
