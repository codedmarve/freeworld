import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

test("Should render button", () => {
  const { getByTestId } = render(<App />);
  const buttonEl = getByTestId("btn");

  expect(buttonEl.textContent).toBe("Submit");
});

test("initial input val should be empty", () => {
  const { getByTestId } = render(<App />);
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("");
});

test("should have start recording button", () => {
  const { getByTestId } = render(<App />);
  const buttonEl = getByTestId("start_recording");
  expect(buttonEl.textContent).toBe("Start Recording");

  fireEvent.click(buttonEl);
  expect(buttonEl.textContent).toBe("Stop Recording");
});

test("should have input label for accessibility", async () => {
  const { getByTestId } = render(<App />);
  const inputLabel = getByTestId("input_label");

  expect(inputLabel.textContent).toBe("Email");
});
