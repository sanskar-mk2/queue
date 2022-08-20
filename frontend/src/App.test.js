import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import '@testing-library/jest-dom'
import { TasksContextProvider } from "./context/TaskContext";

test("renders tdq heading", () => {
    render(
        <React.StrictMode>
            <TasksContextProvider>
                <App />
            </TasksContextProvider>
        </React.StrictMode>
    );
    const heading = screen.getByRole("heading", { name: "TDQ" });
    expect(heading).toBeInTheDocument();
});
