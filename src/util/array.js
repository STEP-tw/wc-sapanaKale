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

const addLists = function (list1, list2) {
  let result = [];
  for (let index = 0; index < list1.length; index++) {
    result.push(list1[index] + list2[index]);
  };
  return result;
};

module.exports = { findFirstIndexOf, extractSet, addLists };
