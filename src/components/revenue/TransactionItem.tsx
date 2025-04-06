import { TransactionType } from "@/redux/transactions/types";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";

interface TransactionItemProps {
  transaction: {
    type: TransactionType;
    amount: number;
    date: string;
    status: string;
    metadata?: {
      product_name?: string;
      email?: string;
      name?: string;
    };
  };
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center mb-2 sm:mb-0">
        <div className="mr-4">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-200 ${
              transaction.type === TransactionType.DEPOSIT
                ? "bg-green-100 group-hover:bg-green-200"
                : "bg-red-100 group-hover:bg-red-200"
            }`}
          >
            {transaction.type === TransactionType.DEPOSIT ? (
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-jade-100 group-hover:bg-jade-200 transition-colors duration-200">
                <HiArrowDownLeft className="text-jade-500 w-3 h-3" />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors duration-200">
                <HiArrowUpRight className="text-red-400 w-3 h-3" />
              </span>
            )}
          </span>
        </div>
        <div>
          <p className="font-medium text-primary text-sm sm:text-base group-hover:text-primary-hover transition-colors duration-200">
            {transaction.type === TransactionType.DEPOSIT
              ? transaction.metadata?.product_name ||
                transaction.metadata?.email ||
                "Cash Deposit"
              : "Cash Withdrawal"}
          </p>
          <p
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
              transaction.metadata?.name
                ? "text-gray-400 group-hover:text-gray-500"
                : getStatusColor(transaction.status)
            }`}
          >
            {transaction.metadata?.name ??
              transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm sm:text-base group-hover:text-primary-hover transition-colors duration-200">
          USD {transaction.amount}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-500 transition-colors duration-200">
          {new Date(transaction.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
