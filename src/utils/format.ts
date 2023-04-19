import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export function formatUTC(utcDate: string) {
  const Result = dayjs.utc(utcDate).utcOffset(8).format("YYYY/MM/DD HH:mm:ss");
  return Result;
}
