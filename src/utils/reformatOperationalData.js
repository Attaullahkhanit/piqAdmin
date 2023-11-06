const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatTime = (time) => {
  var hour = time.length>0 ? time[0].toString() : ""
  var min = time.length>0 ? time[1].toString() : ""
  if (hour.length===1){
    hour = "0"+hour;
  }
  return hour+":"+min;
}
const reformatOperationalData = (data) => {
  const newData = data.map((item,index) => {
    const newObject = {
      weekday: index,
      open: item.open ? formatTime(item.open) : "",
      day: weekdays[index],
      close: item.close ? formatTime(item.close) : "",
      status: (item.open && item.close) ? true : false,
    };
    return newObject;
  });
  return newData;
};

export default reformatOperationalData;