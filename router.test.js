const request = require("supertest");
const server = require("./index")

describe("GET / ", () => {
  test("It should respond with station list", (done) => {
    request(server.listener).get("/").expect(200, function(err, response) {
      expect(response.body.length).toEqual(924)
      done()
    });
  });
});