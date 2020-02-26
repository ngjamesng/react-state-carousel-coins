import React from "react";
import { render } from "@testing-library/react";
import App from "./app";

it("renders app without crashing", ()=>{
  render(<App />);
});


it("matches snapshot", function() {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});