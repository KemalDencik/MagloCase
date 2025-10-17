export const formatDate = (
  dateString: string | null | undefined,
  formatType?: string
): string => {
  if (!dateString || typeof dateString !== "string") return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  if (formatType === "TRY") {
    return `${day}/${month}/${year}`;
  } else {
    return `${month}/${day}/${year}`;
  }
};
