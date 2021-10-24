//Is easygraphql-tester
const supertest = require("supertest");
let baseURL = supertest("http://localhost:4000/graphql");
let list_users = `{
    movie(id:"1234595830") {
      name
      id
      actor {
        name
        age
        id
      }
    }
  }
  `;
describe("POST Request", async () => {
  let post_resp;
  it("makes a POST call ", async () => {
    post_resp = await baseURL.post(list_users);
    await console.log(post_resp.body);
    //Do any other validation here.
  });
});
