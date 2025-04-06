import moment from "moment";
import { formatISODate } from "@/utils/date-formatter";

type DateRange = {
  startDate: moment.Moment;
  endDate: moment.Moment;
};

export const getDateRange = (timeframeId: string): DateRange => {
  switch (timeframeId) {
    case "today":
      return {
        startDate: moment().startOf("day"),
        endDate: moment().endOf("day"),
      };
    case "last7days":
      return {
        startDate: moment().subtract(7, "days").startOf("day"),
        endDate: moment().endOf("day"),
      };
    case "thismonth":
      return {
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month"),
      };
    case "last3months":
      return {
        startDate: moment().subtract(3, "months").startOf("month"),
        endDate: moment().endOf("month"),
      };
    default:
      return {
        startDate: moment(),
        endDate: moment(),
      };
  }
};

export const formatDateRange = (range: DateRange) => ({
  startDate: formatISODate(range.startDate.toLocaleString()),
  endDate: formatISODate(range.endDate.toLocaleString()),
});
