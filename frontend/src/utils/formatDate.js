export const formatDate = (str) => {
  const date = new Date(str).toDateString();
  const time = new Date(str).toTimeString().slice(0, 8);

  const dateAndTime = { date, time };

  return dateAndTime;
};
