import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it("renders Carousel without crashing", ()=>{
  render(<Carousel />);
});
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("should move to the first image when clicking the left arrow from second image", function(){
  const { getByTestId, getByText, debug } = render(<Carousel />);
  debug();
  const imageCount = getByText("Image 1 of 3.");
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(imageCount).toHaveTextContent("Image 2 of 3.");
  fireEvent.click(leftArrow);
  expect(imageCount).toHaveTextContent("Image 1 of 3.");
});