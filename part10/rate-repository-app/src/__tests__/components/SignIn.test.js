import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import SignInContainer from "../../components/SignInContainer";

describe("SignIn", () => {
	describe("SignInContainer", () => {
		it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
			const onSubmit = jest.fn();

			await render(<SignInContainer onSubmit={onSubmit} />);

			await fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
			await fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
			await fireEvent.press(screen.getByText("Sign in"));

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: "kalle",
					password: "password",
				});
			});
		});
	});
});
