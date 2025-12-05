const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(data);
});

describe("GET /api/topics", () => {
  test("responds with an array on key of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
      });
  });
  test("array contains three topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
          expect(topic).not.toHaveProperty("img_url");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with an array on key of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
      });
  });
  test("key of articles has array containing thirteen articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
      });
  });
  test("articles has author, title, article_id, topic, created_at, votes, article_img_url and comment_count properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
          expect(article).not.toHaveProperty("body");
        });
      });
  });
  test("comment_count should be a number", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(typeof Number(body.articles.comment_count)).toBe("number");
        // console.log(body.articles);
      });
  });

  test("created_at should be sorted in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const lastArticle = body.articles[body.articles.length - 1];
        const firstArticle = body.articles[0];
        expect(lastArticle.created_at.slice(0, 10)).toBe("2020-01-07");
        expect(firstArticle.created_at.slice(0, 10)).toBe("2020-11-03");
      });
  });
});

afterAll(() => {
  db.end();
});
