import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import NavBar from "../NavBar";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("NavBar", () => {
  it("renders navigation bar", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("renders New Note button", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByText("New Note")).toBeInTheDocument();
  });

  it("renders Logout button", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("clears localStorage on logout", () => {
    localStorage.setItem("token", "test-token");
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const logoutBtn = screen.getByText("Logout");
    fireEvent.click(logoutBtn);
    expect(localStorage.getItem("token")).toBeNull();
  });
});
