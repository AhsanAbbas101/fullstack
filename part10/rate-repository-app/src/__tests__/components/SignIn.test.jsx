import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const mockSubmitfn = jest.fn();

      render(<SignInContainer onSubmit={mockSubmitfn} />);
      const usernameField = screen.getByPlaceholderText("Username");
      const passwordField = screen.getByPlaceholderText("Password");
      const button = screen.getByText("Sign In");

      fireEvent(usernameField, "onChangeText", "test-username");
      fireEvent(passwordField, "onChangeText", "test-password");
      fireEvent(button, "onPress");
      screen.debug();

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(mockSubmitfn).toHaveBeenCalledTimes(1);
        expect(mockSubmitfn).toHaveBeenCalledWith({
          username: "test-username",
          password: "test-password",
        });
      });
    });
  });
});
