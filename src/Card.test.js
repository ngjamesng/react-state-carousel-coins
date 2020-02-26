import React from "react";
import { render } from "@testing-library/react";
import Card from "./card";

it("renders Card without crashing", ()=>{
  render(<Card />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
