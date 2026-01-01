function getArticleID(array, key1, key2) {
  // array is the 'rows' you get from RETURNING * on Articles table.
  // it is an array of objects that contain article_id and title.
  // you have to return look up table object that matches each id to each title.
  // this is used in the main seed script to insert article_id data to comments table
  // use square bracket notation to get the article id from the object this function outputs (in seed script)

  if (array.length === 0) {
    return {};
  }

  const lookUpObj = {};

  for (let i = 0; i < array.length; i++) {
    const key = array[i][key1];
    const value = array[i][key2];

    lookUpObj[key] = value;
  }

  return lookUpObj;
}

module.exports = getArticleID;
