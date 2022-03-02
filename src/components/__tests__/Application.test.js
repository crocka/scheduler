import React from "react";

import { render, cleanup } from "@testing-library/react";

import { fireEvent, waitForElement, act } from "@testing-library/react";

import Application from "components/Application";

// import axios from '../../__mocks__/axios.js';

afterEach(cleanup);

describe("Application", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);

  //   return waitForElement(() => getByText("Monday")).then(() => {

  //     act(() => {
  //       fireEvent.click(getByText("Tuesday"));
  //     });
      
  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });
  // });
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

});