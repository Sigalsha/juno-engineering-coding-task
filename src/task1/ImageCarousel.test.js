import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from "@testing-library/react";
import "jest-styled-components";
import userEvent from "@testing-library/user-event";
import ImageCarousel from "./ImageCarousel";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const firstUrl =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDE1OTd8MXwxfGFsbHwxfHx8fHx8Mnx8MTY0NDg3MDAyNQ&ixlib=rb-1.2.1&q=85";

beforeEach(() => {
  jest.mock("./__mocks__/fetchedImages");
});

afterEach(cleanup);

describe("ImageCarousel", () => {
  // it("should show a loader when images aren't fetched yet", () => {});

  it("shouldn't show a loader when images are fetched", async () => {
    render(<ImageCarousel />);
    const loaderElem = await screen.queryByTestId("loader");
    expect(loaderElem).not.toBeInTheDocument();
  });

  it("should show previous arrow when images are fetched", async () => {
    render(<ImageCarousel />);
    const prevArrow = await screen.getByTestId("ArrowBackIosIcon");
    expect(prevArrow).toBeInTheDocument();
  });

  it("should show next arrow when images are fetched", async () => {
    render(<ImageCarousel />);
    const nextArrow = await screen.getByTestId("ArrowForwardIosIcon");
    expect(nextArrow).toBeInTheDocument();
  });

  /*   it("should show the first image in the fetched images array (index 0)", async () => {
    render(<ImageCarousel />);
    const imageElem = screen.queryByTestId("fetchImg");
    await waitFor(() => {
        expect(imageElem).toBeInTheDocument();
           expect(imageElem).toHaveAttribute("src", firstUrl);
           expect(imageElem).toHaveAttribute("alt", "image");
    });
   
  }); */

  it("when click next, should show an image with index of 1", async () => {
    render(<ImageCarousel />);
    userEvent.click(screen.getByTestId("ArrowForwardIosIcon"));
    await sleep(500);
    await waitFor(() => {
      expect(screen.queryByRole("img").toBeInTheDocument());
      expect(screen.queryByRole("img").toHaveAttribute("alt", "image"));
      expect(screen.queryByRole("img").toHaveAttribute("src", firstUrl));
    });
  });

  /*   it("when click prev twice, should show an image with index of length -1", () => {});

  it("should show an alert error message when an error occurs", () => {});

  it("shouldn't show an alert error message when no error occurs", () => {});  */
});
