import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import App from "../src/App";
import fs from "fs";
import path from "path";

describe("Exercise 2", () => {
  it("displays search results as the user types in the input field", async () => {
    render(<App />);
    const searchBox = screen.getByRole("textbox");

    fireEvent.change(searchBox, { target: { value: "Harry Potter" } });

    await waitFor(() => {
      const bookTitleElements = screen.getAllByText(/Harry Potter/);
      expect(bookTitleElements.length).toBeGreaterThan(5);
    });
  });

  it("renders with 'useEffect' in the output", async () => {
    const exercisePath = path.join(process.cwd(), "../src/App.jsx");

    const data = fs.readFileSync(exercisePath, "utf8");

    expect(data).toMatch(/useEffect/);
  });

  it("renders with 'useState' in the output", async () => {
    const exercisePath = path.join(process.cwd(), "../src/App.jsx");

    const data = fs.readFileSync(exercisePath, "utf8");

    expect(data).toMatch(/useState/);
  });

  it("renders with 'key' in the output", () => {
    const exercisePath = path.join(process.cwd(), "../src/App.jsx");

    const data = fs.readFileSync(exercisePath, "utf8");

    expect(data).toMatch(/key/);
  });
});
