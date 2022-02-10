import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "../context/context";

import App from "../App";

describe("app", () => {
    test("renders without crashing", () => {
        render(
            <ContextProvider>
                <Router>
                    <App />
                </Router>
            </ContextProvider>
        );
    });

    //modal does not render initially
});
