import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";

test("form calls createBlog with the right details on submit", async () => {
	const createBlog = vi.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createBlog} />);

	const inputs = screen.getAllByRole("textbox");
	const titleInput = inputs[0];
	const authorInput = inputs[1];
	const urlInput = inputs[2];

	const sendButton = screen.getByText("Create");

	await user.type(titleInput, "testing a form...");
	await user.type(authorInput, "test author");
	await user.type(urlInput, "http://testurl.com");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0]).toEqual({
		title: "testing a form...",
		author: "test author",
		url: "http://testurl.com",
	});
});
