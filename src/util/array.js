const findFirstIndexOf = function(list, predicate) {
  let allOccurences = list.filter(predicate);
  return list.indexOf(allOccurences[0]);
};

const extractSet = function(list) {
  let result = [];
  list.forEach(x => {
    if (!result.includes(x)) {
      result.push(x);
    }
  });
  return result;
};

module.exports = { findFirstIndexOf, extractSet };
