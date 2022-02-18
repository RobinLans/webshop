import { render, screen } from "@testing-library/react";
import LoginModal from "../components/LoginModal";
import ContextProvider from "../context/context";

// USER STORY:
// As a visitor I want to be able to login provided I have the correct credentials

// Test Cases:
// It renders two input fields
// It disappears when the login credentials are correct
// It

describe("LoginModal", () => {
    it("renders without crashing", () => {
        render(
            <ContextProvider>
                <LoginModal />
            </ContextProvider>
        );
    });

    it("renders two input fields", () => {
        render(
            <ContextProvider>
                <LoginModal />
            </ContextProvider>
        );

        const maybeUsernameInput = screen.getByPlaceholderText("Username");
        expect(maybeUsernameInput).toBeInTheDocument();
        const maybePasswordInput = screen.getByPlaceholderText("Password");
        expect(maybePasswordInput).toBeInTheDocument();
    });

    // it("shows an alert when the login credentials are wrong", () => {
    //     render(
    //         <ContextProvider>
    //             <Router>
    //                 <App />
    //             </Router>
    //         </ContextProvider>
    //     );
    //     // render(
    //     //     <ContextProvider>
    //     //         <LoginModal />
    //     //     </ContextProvider>
    //     // );
    //     const signInBtnNav = screen.getByTestId("nav-sign-in");
    //     userEvent.click(signInBtnNav);

    //     const usernameInput = screen.getByPlaceholderText("Username");
    //     const passwordInput = screen.getByPlaceholderText("Password");
    //     const signInBtnModal = screen.getByTestId("modal-sign-in");
    //     global.alert = jest.fn();

    //     console.log(signInBtnModal);

    //     userEvent.type(usernameInput, "user");
    //     userEvent.type(passwordInput, "wrong");
    //     userEvent.click(signInBtnModal);

    //     const errorMessageNode = screen.getByRole("alert");

    //     console.log(errorMessageNode);

    // });
});
