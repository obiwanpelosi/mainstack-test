import { TransactionStatus, TransactionType } from "@/redux/transactions/types";

export const txTypeOptions = [
  { label: "Withdrawals", value: TransactionType.WITHDRAWAL },
  { label: "Deposit", value: TransactionType.DEPOSIT },
];

export const txStatusOptions = [
  { label: "Pending", value: TransactionStatus.PENDING },
  { label: "Successful", value: TransactionStatus.SUCCESSFUL },
  { label: "Failed", value: TransactionStatus.FAILED },
];

export const timeframes = [
  { id: "today", label: "Today" },
  { id: "last7days", label: "Last 7 days" },
  { id: "thismonth", label: "This month" },
  { id: "last3months", label: "Last 3 months" },
];
