import { VscClose } from "react-icons/vsc";
import Overlay from "../ui/Overlay";
import { useTransactionFilters } from "./hooks/useTransactionFilters";
import { timeframes } from "./constants/filter-options";
import RadioDropdown from "../ui/RadioDropdown";
import { txTypeOptions, txStatusOptions } from "./constants/filter-options";
import { Button } from "../ui/Button";

interface ITransactionFilterMenuProps {
  isVisible: boolean;
  toggleParam: () => void;
}

const TransactionFilterMenu = ({
  isVisible,
  toggleParam,
}: ITransactionFilterMenuProps) => {
  const {
    localTypeFilter,
    setLocalTypeFilter,
    localStatusFilter,
    setLocalStatusFilter,
    localDateRange,
    setLocalDateRange,
    selectedTimeframe,
    setSelectedTimeframe,
    handleApply,
    handleClear,
    hasActiveFilters,
  } = useTransactionFilters();

  return (
    <Overlay
      isVisible={isVisible}
      onClose={toggleParam}
      className={`fixed right-2 top-4 h-[calc(100vh-2rem)] w-[456px] bg-white transition-transform duration-300 rounded-[20px] ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="px-4 py-6 sm:px-6 h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Filter</h3>
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500"
            onClick={toggleParam}
          >
            <span className="sr-only">Close panel</span>
            <VscClose className="text-primary w-[25px] h-[25px]" />
          </button>
        </div>
        <div className="relative flex-1 px-1 h-[calc(100%-2rem)]">
          <div className="pt-10 max-w-xl h-full flex flex-col">
            <div className="flex gap-1 mb-6">
              {timeframes.map((timeframe) => (
                <button
                  data-testid={`timeframe-button-${timeframe.id}`}
                  key={timeframe.id}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${
                    selectedTimeframe === timeframe.id
                      ? "bg-gray-100 text-gray-800 border-gray-100"
                      : "bg-white text-gray-800 border-gray-700"
                  }`}
                  onClick={() =>
                    setSelectedTimeframe(() =>
                      selectedTimeframe === timeframe.id ? null : timeframe.id
                    )
                  }
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-base font-medium mb-2">Date Range</h3>
              <div className="flex gap-3">
                <div className="relative w-full flex justify-between gap-2">
                  <div className="relative w-full">
                    <label htmlFor="start-date" className="sr-only">
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      className="cursor-pointer flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full"
                      onChange={(e) =>
                        setLocalDateRange((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      value={localDateRange.startDate}
                    />
                  </div>
                  <div className="relative w-full">
                    <label htmlFor="end-date" className="sr-only">
                      End Date
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      className="cursor-pointer flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 w-full"
                      onChange={(e) =>
                        setLocalDateRange((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      value={localDateRange.endDate}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-bold pb-2">Transaction Type</h3>
              <RadioDropdown
                options={txTypeOptions}
                defaultSelectedOptions={localTypeFilter}
                onChange={(selected) => setLocalTypeFilter(selected)}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-base font-bold pb-2">Transaction Status</h3>
              <RadioDropdown
                options={txStatusOptions}
                defaultSelectedOptions={localStatusFilter}
                onChange={(selected) => setLocalStatusFilter(selected)}
              />
            </div>

            <div className="mt-auto">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  className={`flex-1 py-3 px-4 border ${
                    hasActiveFilters
                      ? "border-gray-700 text-gray-700 hover:bg-gray-50"
                      : "border-gray-300 text-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleClear}
                  disabled={!hasActiveFilters}
                >
                  Clear
                </Button>
                <Button
                  className="flex-1 py-3 px-4 bg-black text-white hover:bg-gray-800"
                  onClick={() => {
                    handleApply();
                    toggleParam();
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default TransactionFilterMenu;
