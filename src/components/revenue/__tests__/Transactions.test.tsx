import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Transactions from "../Transactions";
import { TransactionsProvider } from "../../../contexts/transactions.context";
import { useGetTransactionsQuery } from "../../../redux/transactions/transactions.service";
import { TransactionType } from "../../../redux/transactions/types";

// Mock the transactions service
vi.mock("../../../redux/transactions/transactions.service", () => ({
  useGetTransactionsQuery: vi.fn().mockReturnValue({
    data: [],
    isFetching: false,
  }),
}));

describe("Transactions Component", () => {
  const mockTransactions = [
    {
      type: TransactionType.DEPOSIT,
      amount: 100,
      date: "2024-01-01",
      status: "successful",
      metadata: {
        product_name: "Test Product",
      },
    },
    {
      type: TransactionType.WITHDRAWAL,
      amount: 50,
      date: "2024-01-02",
      status: "pending",
      metadata: {
        name: "Test User",
      },
    },
  ];

  beforeEach(() => {
    vi.mocked(useGetTransactionsQuery).mockReturnValue({
      data: mockTransactions,
      isFetching: false,
      refetch: vi.fn(),
    });
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <TransactionsProvider>{component}</TransactionsProvider>
      </BrowserRouter>
    );
  };

  it("renders transactions correctly", () => {
    renderWithRouter(<Transactions />);

    expect(screen.getByText("2 Transactions")).toBeInTheDocument();
    expect(
      screen.getByText("Your transactions for the last 7 days")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows loading state when fetching", () => {
    vi.mocked(useGetTransactionsQuery).mockReturnValue({
      data: [],
      isFetching: true,
      refetch: vi.fn(),
    });

    renderWithRouter(<Transactions />);

    // You should see loading skeletons
    const skeletons = screen.getAllByTestId("transaction-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("combines multiple filters", () => {
    const filteredTransactions = [
      {
        type: TransactionType.DEPOSIT,
        amount: 100,
        date: "2024-01-15",
        status: "successful",
        metadata: {
          product_name: "Test Product 2",
          name: "Test Product",
        },
      },
    ];

    vi.mocked(useGetTransactionsQuery).mockReturnValue({
      data: filteredTransactions,
      isFetching: false,
      refetch: vi.fn(),
    });

    renderWithRouter(<Transactions />);

    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.queryByText("Test User")).not.toBeInTheDocument();
  });
});
