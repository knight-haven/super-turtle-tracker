import moment from "moment";

export const capitalizeFirstLetter = (str: string): string => {
  return str === "" || str === undefined ? str : str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date: string): string => {
  return moment(date).format("L");
};
