const getWeeklyData = (tenantId) => {
  // fetch the details from db
  return {
    email: "",
    labels: [],
    data: [1, 60, 50, 1, 1, 1, 1].join(","),
    title: "",
  };
};

module.exports = {
  getWeeklyData,
};
