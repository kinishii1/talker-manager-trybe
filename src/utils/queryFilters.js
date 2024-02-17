const filterByName = (data, q) => data.filter((talker) =>
  talker.name.toLowerCase().includes(q.toLowerCase()));

const filterByRate = (data, rate) => data.filter((talker) => talker.talk.rate === Number(rate));

const filterByDate = (data, date) => data.filter((talker) => talker.talk.watchedAt === date);

const applyFilters = (data, q, rate, date) => {
  let filteredData = data;
  if (q) {
    filteredData = filterByName(filteredData, q);
  }
  if (rate) {
    filteredData = filterByRate(filteredData, rate);
  }
  if (date) {
    filteredData = filterByDate(filteredData, date);
  }
  return filteredData;
};

module.exports = {
  applyFilters,
};