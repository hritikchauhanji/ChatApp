// Function to format time as 'time ago'
export function formatTimeInIndia(timestamp) {
  const time = new Date(timestamp);

  // Convert the time to Indian Standard Time (IST)
  const indiaTime = new Date(
    time.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Format the given timestamp to AM/PM in IST
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = indiaTime.toLocaleTimeString("en-US", options);

  return formattedTime;
}
