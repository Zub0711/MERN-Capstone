const expect = require("chai").expect;
//  I start if by importing chai and using expect
const request = require("request");
// I then  import request

// I then use describe to add my message followed by a arrow function
describe("Backend Status code", () => {
  //  I then use it in the event of a successful test it will respond with my message
  it("gives a successful response", (done) => {
    // I then use request to test my server
    request(
      "http://localhost:5000/Dashboard/Display",
      (error, response, body) => {
        // I then use expect and equal to 200 so if the response is a status 200 then my test was successful
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});
