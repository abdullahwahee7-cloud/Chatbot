const { replyTopic } = require("./infodata");

let session = {};

function test(input) {
    console.log("================================");
    console.log("User:", input);
    console.log("Bot :", replyTopic(input, session));
    console.log("Session:", session);
}

test("library");
test("thd");
test("opening hours");