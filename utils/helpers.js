module.exports = {
  format_date: (date) => {
    return `${new Date(date).getUTCMonth() + 1}/${new Date(date).getUTCDate()}/${new Date(date).getUTCFullYear()}`;
  },
  sortPostDates: (posts) => {
    posts.sort(({ dateOfMaintenance: a }, { dateOfMaintenance: b }) => (a < b ? 1 : a > b ? -1 : 0));
  },
};
