import { useTransactions } from "@/contexts/transactions.context";
import { Button } from "@/components/ui/Button";
import FilterMenu from "./TransactionsFilterMenu";
import { RxCaretDown } from "react-icons/rx";
import { BsDownload } from "react-icons/bs";
import { useToggleSearchParam } from "@/hooks/useToggleSearchParam";
import TransactionList from "./TransactionList";

export default function Transactions() {
  const { data, isFetching, timeframe, activeFilterCount } = useTransactions();
  const { isVisible, toggleParam } = useToggleSearchParam("showFilter", "true");

  const getTimeframeText = () => {
    switch (timeframe) {
      case "today":
        return "Your transactions today";
      case "last7days":
        return "Your transactions for the last 7 days";
      case "thismonth":
        return "Your transactions this month";
      case "last3months":
        return "Your transactions for the last 3 months";
      default:
        return "Your transactions for the last 7 days";
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-2xl! font-bold">{data?.length} Transactions</h3>
            <p className="text-gray-500 text-sm">{getTimeframeText()}</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="secondary"
              className="flex items-center px-4 py-2 rounded-full gap-2 text-primary w-full sm:w-auto"
              onClick={toggleParam}
            >
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-xs">
                  {activeFilterCount}
                </span>
              )}
              <RxCaretDown className="text-primary w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              className="flex items-center px-4 py-2 rounded-full gap-2 text-primary w-full sm:w-auto"
            >
              <span>Export list</span>
              <BsDownload className="text-primary w-4 h-4" />
            </Button>
          </div>
        </div>
        <hr className="my-4" />
        <TransactionList transactions={data || []} isFetching={isFetching} />
      </div>
      <FilterMenu isVisible={isVisible} toggleParam={toggleParam} />
    </div>
  );
}
