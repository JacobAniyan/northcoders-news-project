const getArticleID = require("../db/seeds/utils");

describe("getArticleID", () => {
  test("returns empty object when passed an empty array", () => {
    const array = [];
    const result = getArticleID(array);
    expect(result).toEqual({});
  });
  test("returns object with single key-value pair when passed array containing single object", () => {
    const array = [{ key: "value" }];
  });
});
