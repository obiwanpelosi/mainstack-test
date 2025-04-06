import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionsFilterMenu from "../TransactionsFilterMenu";
import { TransactionsProvider } from "../../../contexts/transactions.context";
import { useGetTransactionsQuery } from "../../../redux/transactions/transactions.service";

// Mock the transactions service
vi.mock("../../../redux/transactions/transactions.service", () => ({
  useGetTransactionsQuery: vi.fn().mockReturnValue({
    data: [],
    isFetching: false,
  }),
}));

// Mock @headlessui/react components
vi.mock("@headlessui/react", () => ({
  Checkbox: ({
    checked,
    onChange,
    children,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: React.ReactNode;
  }) => (
    <div data-testid="custom-checkbox" data-checked={checked}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        data-testid="checkbox-input"
      />
      {children}
    </div>
  ),
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    [key: string]: any;
  }) => (
    <button onClick={onClick} {...props} data-testid="headless-button">
      {children}
    </button>
  ),
}));

describe("TransactionsFilterMenu", () => {
  const mockToggleParam = vi.fn();

  beforeEach(() => {
    vi.mocked(useGetTransactionsQuery).mockReturnValue({
      data: [],
      isFetching: false,
      refetch: vi.fn(),
    });
  });

  it("renders filter menu with all options", () => {
    render(
      <TransactionsProvider>
        <TransactionsFilterMenu
          isVisible={true}
          toggleParam={mockToggleParam}
        />
      </TransactionsProvider>
    );

    expect(screen.getByText("Transaction Type")).toBeInTheDocument();
    expect(screen.getByText("Transaction Status")).toBeInTheDocument();
    expect(screen.getByText("Date Range")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("applies filters when Apply button is clicked", () => {
    render(
      <TransactionsProvider>
        <TransactionsFilterMenu
          isVisible={true}
          toggleParam={mockToggleParam}
        />
      </TransactionsProvider>
    );

    // Open both dropdowns
    const dropdownButtons = screen.getAllByTestId("radio-dropdown-button");
    const typeDropdownButton = dropdownButtons[0]; // First dropdown is for transaction type
    const statusDropdownButton = dropdownButtons[1]; // Second dropdown is for transaction status

    // Open transaction type dropdown and select deposit
    fireEvent.click(typeDropdownButton);
    const typeCheckboxes = screen.getAllByTestId("checkbox-input");
    fireEvent.click(typeCheckboxes[0]); // First checkbox in type dropdown is for deposit

    // Open transaction status dropdown and select successful
    fireEvent.click(statusDropdownButton);
    const statusCheckboxes = screen.getAllByTestId("checkbox-input");
    fireEvent.click(statusCheckboxes[0]); // First checkbox in status dropdown is for successful

    // Click Apply button
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    // Verify menu is closed
    expect(mockToggleParam).toHaveBeenCalled();
  });

  it("clears all filters when Clear All button is clicked", () => {
    render(
      <TransactionsProvider>
        <TransactionsFilterMenu
          isVisible={true}
          toggleParam={mockToggleParam}
        />
      </TransactionsProvider>
    );

    // Open both dropdowns
    const dropdownButtons = screen.getAllByTestId("radio-dropdown-button");
    const typeDropdownButton = dropdownButtons[0];
    const statusDropdownButton = dropdownButtons[1];

    // Open transaction type dropdown and select deposit
    fireEvent.click(typeDropdownButton);
    const typeCheckboxes = screen.getAllByTestId("checkbox-input");
    fireEvent.click(typeCheckboxes[0]);

    // Open transaction status dropdown and select successful
    fireEvent.click(statusDropdownButton);
    const statusCheckboxes = screen.getAllByTestId("checkbox-input");
    fireEvent.click(statusCheckboxes[0]);

    // Click Clear All button
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    // Verify checkboxes are unchecked
    expect(typeCheckboxes[0]).not.toBeChecked();
    expect(statusCheckboxes[0]).not.toBeChecked();
  });

  it("updates timeframe when selected", () => {
    render(
      <TransactionsProvider>
        <TransactionsFilterMenu
          isVisible={true}
          toggleParam={mockToggleParam}
        />
      </TransactionsProvider>
    );

    // Find and click the "This month" timeframe button
    const thisMonthButton = screen.getByTestId("timeframe-button-thismonth");
    fireEvent.click(thisMonthButton);

    // Verify the button is selected (has the correct background color)
    expect(thisMonthButton).toHaveClass("bg-gray-100");
  });

  it("handles date range filtering", () => {
    render(
      <TransactionsProvider>
        <TransactionsFilterMenu
          isVisible={true}
          toggleParam={mockToggleParam}
        />
      </TransactionsProvider>
    );

    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");

    fireEvent.change(startDateInput, { target: { value: "2024-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2024-01-31" } });

    expect(startDateInput).toHaveValue("2024-01-01");
    expect(endDateInput).toHaveValue("2024-01-31");
  });
});
