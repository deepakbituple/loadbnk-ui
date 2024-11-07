import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, format: string = "DD MMM YYYY HH:MM"): string => {
  const formattedDate = moment(date).format(format);
  return formattedDate;
};

export const formatDateStr = (date: string, withseconds: boolean = false): string => {
  if (!date) return "NA";
  const formattedDate = moment(date).format(withseconds ? "DD MMM YYYY HH:mm:ss" : "DD MMM YYYY HH:mm");
  return formattedDate;
};

export const dateToGMT = (inputDate: string, inputDateFormat: string) => {
  const formattedDate = moment(inputDate, inputDateFormat).toDate();
  return formattedDate;
};

export const dateTimeFromNow = (value: string | undefined): string => {
  return value ? moment(value).fromNow() : "";
};

// console.log(formatDate(Date.now(),"YYYY-MM-DD"))
