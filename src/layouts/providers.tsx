import store from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
