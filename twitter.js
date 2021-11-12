const Twitter = require("twitter-lite");
const client = new Twitter({
});

user_id = "1458666185906556934"
tweet_id = "1459050639149846529"

const stream = client
  .stream("statuses/filter", {
    follow: user_id + ",",
  })
  .on("start", (response) => console.log("start"))
  .on("data", (tweet) => {
    if (tweet.in_reply_to_status_id_str != null) {
      let status = tweet.in_reply_to_status_id_str;
      if (status === tweet_id) {
        client
          .get("followers/list", {
            user_id: tweet.sender_id_str,
          })
          .then((results) => {
            const zoacc = results.users.find(
              (element) => element.id_str === user_id
            );
            console.log(zoacc);
            if (zoacc != undefined) {
              let statusObj = {
                status:
                  "Hi @" +
                  tweet.user.screen_name +
                  " test success!",
                in_reply_to_status_id: tweet.id_str,
              };
              client
                .post("statuses/update", statusObj)
                .then((result) => {
                  console.log(
                    'You successfully tweeted this : "' + result.text + '"'
                  );
                })
                .catch(console.error);
            }
          })
          .catch(console.error);
      }
    }
  })
  .on("ping", () => console.log("ping"))
  .on("error", (error) => console.log("error", error))
  .on("end", (response) => console.log("end"));

