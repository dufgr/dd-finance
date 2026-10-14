export const getMonthRange = (month: string) => {
  const monthNumber = Number(month);
  if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    throw new Error("Invalid month");
  }

  const year = new Date().getFullYear();
  return {
    start: new Date(year, monthNumber - 1, 1),
    end: new Date(year, monthNumber, 1),
  };
};
