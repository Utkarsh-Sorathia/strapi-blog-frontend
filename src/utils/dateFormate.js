export function convertToIST(utcDateString) {
  if (!utcDateString) return "Invalid Date";

  // Convert UTC time to IST using the correct time zone
  const istDate = new Date(utcDateString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true, // Enables 12-hour format
  });

  // Extract date and time separately
  const [datePart, timePart] = istDate.split(", ");

  // Format date from MM/DD/YYYY to DD-MM-YYYY
  let [day, month, year] = datePart.split("/");

  // Ensure two-digit format for day and month
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  return `${formattedDate} ${timePart}`; // Final formatted string
}
