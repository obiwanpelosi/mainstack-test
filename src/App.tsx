import Transactions from "./components/revenue/Transactions";
import Wallet from "./components/revenue/Wallet";
import { TransactionsProvider } from "./contexts/transactions.context";

function App() {
  return (
    <>
      <div className="h-screen w-full px-4 lg:p-16 pt-12 flex flex-col items-center space-y-4">
        <TransactionsProvider>
          <Wallet />
          <Transactions />
        </TransactionsProvider>
      </div>
    </>
  );
}

export default App;
