const formatOutput = function (filesData) {
  if (filesData.length > 1) {
    let total = filesData.reduce(addLists);
    replaceEndElement(total,"total");
    filesData.push(total);
  };
  let formattedOutput = filesData.map(function (fileData) {
    return "      " + fileData.join("   ");
  }).join("\n");
  return formattedOutput;
};

const addLists = function(list1,list2){
  let result = []; 
  for (let index = 0; index < list1.length; index++) {
    result.push(list1[index] + list2[index]);
  };
  return result;
};

const replaceEndElement = function(list, newElement) {
  list[list.length-1] = newElement;
  return list;
};

module.exports = { formatOutput };
