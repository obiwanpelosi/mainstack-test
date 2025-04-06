import { TransactionType } from "@/redux/transactions/types";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: {
    type: TransactionType;
    amount: number;
    date: string;
    status: string;
    metadata?: {
      product_name?: string;
      email?: string;
      name?: string;
    };
  }[];
  isFetching: boolean;
}

const TransactionList = ({
  transactions,
  isFetching,
}: TransactionListProps) => {
  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <div>
      {transactions?.map((transaction, idx) => (
        <TransactionItem key={idx} transaction={transaction} />
      ))}
    </div>
  );
};

function Skeleton() {
  const skeletonItems = Array(5).fill(0);

  return (
    <div className="w-full py-4">
      <div>
        <div className="space-y-4">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-t animate-pulse"
              data-testid="transaction-skeleton"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
