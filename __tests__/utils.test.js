const getArticleID = require("../db/seeds/utils");

describe("getArticleID", () => {
  test("returns empty object when passed an empty array", () => {
    const array = [];
    const result = getArticleID(array);
    expect(result).toEqual({});
  });
  test("returns object with single key-value pair when passed array containing single object", () => {
    const key1 = "key1";
    const key2 = "key2";
    const array = [{ key1: "value1", key2: "value2" }];
    const result = getArticleID(array, key1, key2);
    expect(result["value1"]).toBe("value2");
  });
  test("returns object with multiple key-value pairs when passed array containing multiple objects", () => {
    const key1 = "key1";
    const key2 = "key2";
    const array = [
      { key1: "value1", key2: "value2" },
      { key1: "value3", key2: "value4" },
    ];
    const result = getArticleID(array, key1, key2);
    expect(result["value3"]).toBe("value4");
  });

  test("Does not mutate the array or the objects within", () => {
    const key1 = "key1";
    const key2 = "key2";
    const array = [{ key1: "value1", key2: "value2" }];
    const array2 = JSON.parse(JSON.stringify(array));
    getArticleID(array, key1, key2);
    expect(array).toEqual(array2);
  });
});
