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
            getAddressAndSend(event.tweet);
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