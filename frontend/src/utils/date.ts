import dayjs from "dayjs";

export function getCurrentPaymentMonth(date = new Date()): string {
  return dayjs(date).format("YYYY-MM");
}

export function getCurrentDateIso(date = new Date()): string {
  return dayjs(date).format("YYYY-MM-DD");
}

