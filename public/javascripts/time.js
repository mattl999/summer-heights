const getETTime = () => {
    let date = new Date();
    let dateTimeString = date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    });
    return dateTimeString;
  };
  const timePromise = new Promise((resolve, reject) => {
    resolve(getETTime());
  });
  
  module.exports = {
    getETTime,
    timePromise
  }