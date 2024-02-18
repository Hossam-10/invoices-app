const formatDate = (date: string | Date): string => {
  if (!date) {
    return "";
  }
  const originalDate: Date = typeof date === "string" ? new Date(date) : date;
  return originalDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default formatDate;
