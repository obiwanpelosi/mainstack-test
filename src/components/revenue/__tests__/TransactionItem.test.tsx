import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TransactionItem from "../TransactionItem";
import { TransactionType } from "../../../redux/transactions/types";

describe("TransactionItem Component", () => {
  const mockDepositTransaction = {
    type: TransactionType.DEPOSIT,
    amount: 100,
    date: "2024-01-01",
    status: "successful",
    metadata: {
      product_name: "Test Product",
    },
  };

  const mockWithdrawalTransaction = {
    type: TransactionType.WITHDRAWAL,
    amount: 50,
    date: "2024-01-02",
    status: "pending",
    metadata: {
      name: "Test User",
    },
  };

  it("renders deposit transaction correctly", () => {
    render(<TransactionItem transaction={mockDepositTransaction} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("USD 100")).toBeInTheDocument();
    expect(screen.getByText("Jan 01, 2024")).toBeInTheDocument();
    expect(screen.getByText("Successful")).toBeInTheDocument();
  });

  it("renders withdrawal transaction correctly", () => {
    render(<TransactionItem transaction={mockWithdrawalTransaction} />);

    expect(screen.getByText("Cash Withdrawal")).toBeInTheDocument();
    expect(screen.getByText("USD 50")).toBeInTheDocument();
    expect(screen.getByText("Jan 02, 2024")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("displays correct status colors", () => {
    const { rerender } = render(
      <TransactionItem
        transaction={{
          ...mockDepositTransaction,
          status: "successful",
        }}
      />
    );

    // Check successful status color
    const successfulStatus = screen.getByText("Successful");
    expect(successfulStatus).toHaveClass("text-green-500");

    // Check pending status color
    rerender(
      <TransactionItem
        transaction={{
          ...mockDepositTransaction,
          status: "pending",
        }}
      />
    );
    const pendingStatus = screen.getByText("Pending");
    expect(pendingStatus).toHaveClass("text-yellow-500");

    // Check failed status color
    rerender(
      <TransactionItem
        transaction={{
          ...mockDepositTransaction,
          status: "failed",
        }}
      />
    );
    const failedStatus = screen.getByText("Failed");
    expect(failedStatus).toHaveClass("text-red-500");
  });

  it("handles missing metadata gracefully", () => {
    const transactionWithoutMetadata = {
      type: TransactionType.WITHDRAWAL,
      amount: 100,
      date: "2024-01-01",
      status: "successful",
    };

    render(<TransactionItem transaction={transactionWithoutMetadata} />);

    expect(screen.getByText("Cash Withdrawal")).toBeInTheDocument();
    expect(screen.getByText("Successful")).toBeInTheDocument();
  });
});
