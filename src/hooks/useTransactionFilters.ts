import { useState, useEffect } from "react";
import { useTransactions } from "@/contexts/transactions.context";
import { getDateRange, formatDateRange } from "@/utils/date-utils";

export const useTransactionFilters = () => {
  const {
    typeFilter,
    statusFilter,
    setTypeFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    setTimeframe,
  } = useTransactions();

  const [localTypeFilter, setLocalTypeFilter] = useState(typeFilter);
  const [localStatusFilter, setLocalStatusFilter] = useState(statusFilter);
  const [localDateRange, setLocalDateRange] = useState(dateRange);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (selectedTimeframe) {
      const range = getDateRange(selectedTimeframe);
      setLocalDateRange(formatDateRange(range));
    } else {
      setLocalDateRange({ startDate: "", endDate: "" });
    }
  }, [selectedTimeframe]);

  const handleApply = () => {
    setTypeFilter(localTypeFilter);
    setStatusFilter(localStatusFilter);
    setDateRange(localDateRange);
    setTimeframe(selectedTimeframe);
  };

  const handleClear = () => {
    // Clear local state
    setLocalTypeFilter([]);
    setLocalStatusFilter([]);
    setLocalDateRange({ startDate: "", endDate: "" });
    setSelectedTimeframe(null);

    // Clear context state
    setTypeFilter([]);
    setStatusFilter([]);
    setDateRange({ startDate: "", endDate: "" });
    setTimeframe(null);
  };

  const hasActiveFilters =
    localTypeFilter.length > 0 ||
    localStatusFilter.length > 0 ||
    localDateRange.startDate ||
    localDateRange.endDate;

  return {
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
  };
};
