import { render, screen } from "@testing-library/react";
import Adminpage from "../components/Adminpage";
import { MemoryRouter } from "react-router-dom";

it("Renders the admin page", () => {
  render(
    <MemoryRouter>
      <Adminpage />
    </MemoryRouter>
  );
  const adminComponent = screen.getAllByTestId("adminTest");
});
