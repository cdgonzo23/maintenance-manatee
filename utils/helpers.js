module.exports = {
  format_date: (date) => {
    return `${new Date(date).getUTCMonth() + 1}/${new Date(date).getUTCDate()}/${new Date(date).getUTCFullYear()}`;
  },
};
