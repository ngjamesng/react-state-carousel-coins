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
  const { getByTestId, getByText} = render(<Carousel />);
  const imageCount = getByText("Image 1 of 3.");
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(rightArrow);
  expect(imageCount).toHaveTextContent("Image 2 of 3.");
  fireEvent.click(leftArrow);
  expect(imageCount).toHaveTextContent("Image 1 of 3.");
});

it("should hide the left arrow at the first image", function(){
  const {getByTestId}= render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");

  expect (leftArrow).toHaveClass("hidden");
})

it("should hide the right arrow at the last image", function(){
  const {getByTestId}= render(<Carousel />);
  
  const rightArrow = getByTestId("right-arrow");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect (rightArrow).toHaveClass("hidden");
})