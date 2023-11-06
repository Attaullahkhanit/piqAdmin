export function timeAgo(timeString) {
  const currentTime = new Date();
  const time = new Date(timeString);

  const timeDiff = currentTime - time;

  const seconds = Math.floor(timeDiff / 1000);
  if (seconds < 60) {
    return "few sec ago";
  }

  const minutes = Math.floor(timeDiff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  if (months < 12) {
    return `${months}mo ago`;
  }

  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12));
  return `${years}y ago`;
}

