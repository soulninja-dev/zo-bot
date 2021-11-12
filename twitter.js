// require("dotenv").config();

// const { Autohook } = require("twitter-autohook");

// // import { getAddressAndSend } from './web3-eth';

// const config = require("./config");
// const twitter = require("twitter-lite");
// const client = new twitter(config);

// (async (start) => {
//   try {
//     const webhook = new Autohook();

//     await webhook.removeWebhooks();

//     webhook.on("event", async (event) => {
//       if (event.tweet.in_reply_to_status_id_str != null) {
//         let status = event.tweet.in_reply_to_status_id_str;
//         if (status === "1458781896263884800") {
//           client
//             .get("followers/list", {
//               user_id: event.tweet.sender_id,
//             })
//             .then((results) => {
//               const zoacc = results.users.find(
//                 (element) => element.id === "abhinav_marwaha"
//               );
//               if (zoacc !== undefined) {
//                 // getAddressAndSend(event.tweet);
//                 let statusObj = {
//                   status:
//                     "Hi @" +
//                     event.tweet.user.screen_name +
//                     "we sent you an NFT: " +
//                     "https://imgur.com/gallery/vPfazko",
//                   in_reply_to_status_id: event.tweet.id_str,
//                 };
//                 client
//                   .post("statuses/update", statusObj)
//                   .then((result) => {
//                     console.log(
//                       'You successfully tweeted this : "' + result.text + '"'
//                     );
//                   })
//                   .catch(console.error);
//               }
//             })
//             .catch(console.error);
//         }
//       }
//     });

//     await webhook.start();

//     await webhook.subscribe({
//       oauth_token: process.env.TWITTER_ACCESS_TOKEN,
//       oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
//     });
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// })();

const Twitter = require("twitter-lite");
const client = new Twitter({
});

// const parameters = {
//   follow: "1433070055038722048,",
// };

// const stream = client
//   .stream("statuses/filter", parameters)
//   .on("start", (response) => console.log("start"))
//   .on("data", (tweet) => {
//     console.log(tweet);
//     if (tweet.in_reply_to_status_id_str != null) {
//       let status = tweet.in_reply_to_status_id_str;
//       if (status === "1459045571105157122") {
//         client
//           .get("followers/list", {
//             user_id: tweet.sender_id_str,
//           })
//           .then((results) => {
//             console.log(results.users[0]);
//             const zoacc = results.users.find(
//               (element) => element.id_str === "1433070055038722048"
//             );
//             if (zoacc !== undefined) {
//               // getAddressAndSend(event.tweet);
//               let statusObj = {
//                 status:
//                   "Hi @" +
//                   tweet.user.screen_name +
//                   "we sent you an NFT: " +
//                   "https://imgur.com/gallery/vPfazko",
//                 in_reply_to_status_id: tweet.id_str,
//               };
//               client
//                 .post("statuses/update", statusObj)
//                 .then((result) => {
//                   console.log(
//                     'You successfully tweeted this : "' + result.text + '"'
//                   );
//                 })
//                 .catch(console.error);
//             }
//           })
//           .catch(console.error);
//       }
//     }
//   })
//   .on("ping", () => console.log("ping"))
//   .on("error", (error) => console.log("error", error))
//   .on("end", (response) => console.log("end"));



const parameters = {
  follow: "1458666185906556934,",
};

const stream = client
  .stream("statuses/filter", parameters)
  .on("start", (response) => console.log("start"))
  .on("data", (tweet) => {
    console.log(tweet);
    if (tweet.in_reply_to_status_id_str != null) {
      let status = tweet.in_reply_to_status_id_str;
      if (status === "1459050639149846529") {
        client
          .get("followers/list", {
            user_id: tweet.sender_id_str,
          })
          .then((results) => {
            console.log(results.users[0]);
            const zoacc = results.users.find(
              (element) => element.id_str === "1458666185906556934"
            );
            console.log(zoacc);
            if (zoacc != undefined) {
              // getAddressAndSend(event.tweet);
              let statusObj = {
                status:
                  "Hi @" +
                  tweet.user.screen_name +
                  "we sent you an NFT: " +
                  "https://imgur.com/gallery/vPfazko",
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

// let statusObj = {
//   status:
//     "Hi @dvcoolster" +
//     "we sent you an NFT: " +
//     "https://imgur.com/gallery/vPfazko",
//   in_reply_to_status_id_str: "1459051923999313923",
// };
// client
//   .post("statuses/update", statusObj)
//   .then((result) => {
//     console.log(
//       'You successfully tweeted this : "' + result.text + '"'
//     );
//   })
//   .catch(console.error);