function getTimeUntilOpeningOrClosing(openingTimeData) {
  const currentDay = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)

  const todayOpeningTime = openingTimeData.find(
    (item) => item.weekday === currentDay + 1
  );

  if (!todayOpeningTime) {
    return "Closed today";
  }

  const now = new Date();
  const openingTime = new Date(`1970-01-01T${todayOpeningTime.startingTime}`);
  const closingTime = new Date(`1970-01-01T${todayOpeningTime.closingTime}`);
  console.log("openingTime", openingTime);
  if (todayOpeningTime.status) {
    if (now >= closingTime) {
      return "Closing soon";
    } else {
      const timeUntilClosing = closingTime - now;
      return `Open. Closes in ${formatTimeDifference(timeUntilClosing)}`;
    }
  } else {
    if (now >= openingTime) {
      return "Closed";
    } else {
      const timeUntilOpening = openingTime - now;
      return `Closed. Opens in ${formatTimeDifference(timeUntilOpening)}`;
    }
  }
}

function formatTimeDifference(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours} hours and ${minutes} minutes`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}

export default getTimeUntilOpeningOrClosing;
