require('dotenv').config()

const { Autohook } = require('twitter-autohook');

import { getAddressAndSend } from './web3-eth';

(async start => {
    try {
      const webhook = new Autohook();
      
      await webhook.removeWebhooks();

      webhook.on('event', async event => {
        if(event.tweet.in_reply_to_status_id_str != null){
          let status = event.tweet.in_reply_to_status_id_str;
          if(status===""){
            client
              .get("followers/list",{
                "user_id": event.tweet.sender_id
              })
              .then(results => {
                const zoacc = results.users.find(element => element.id === "our-id");
                if(zoacc!==undefined){
                  getAddressAndSend(event.tweet);
                }
              })
              .catch(console.error);
          }
        }

      });
      
      await webhook.start();
      
      await webhook.subscribe({oauth_token: process.env.TWITTER_ACCESS_TOKEN, oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET});  
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();