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

describe("GET /api/users", () => {
  test("responds with an array on key of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
      });
  });
  test("array contains four users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
      });
  });
  test("array contains user objects with username, name and avatar_url properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(
          body.users.forEach((user) => {
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("avatar_url");
          })
        );
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("responds with an object", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("responds with correct article object", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(2);
        expect(body.article).toHaveProperty("author");
        expect(body.article).toHaveProperty("title");
        expect(body.article).toHaveProperty("article_id");
        expect(body.article).toHaveProperty("body");
        expect(body.article).toHaveProperty("topic");
        expect(body.article).toHaveProperty("created_at");
        expect(body.article).toHaveProperty("votes");
        expect(body.article).toHaveProperty("article_img_url");
      });
  });

  test("responds with Not Found message for ID that is not in database", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article Not Found");
      });
  });
  test("responds with Invalid ID message for invalid IDs", () => {
    return request(app)
      .get("/api/articles/invalid-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("returns an array on key of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
      });
  });
  test("returns correct number of comments for given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(11);
      });
  });
  test("comments have properties comment_id, votes, created_at, author, body and article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });
  test("responds with comments sorted by most recent", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });
});

afterAll(() => {
  db.end();
});
