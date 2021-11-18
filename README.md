# Discord

## Generate Zomad

* through [jsdom](https://www.npmjs.com/package/jsdom)
* [referrance](https://github.com/pwichmann/SVG_on_nodeJS)

# Twitter

- [x] As soon as any comment is added to our tweet, we scan for a single ETH address. 
- [x] We validate if address is correct.
- [x] Then we check if handle follows us. 
- [x] Save his twitter ID. 
- [ ] Check if NFT already granted. If not, we generate with script his personalized image for the NFT.
- [ ] Then, we execute Web3 smart contract, send image to IPFS hosting, get link and mint personalized NFT for this individual.
- [x] As we get transaction validated. We paste the image along with transaction link on the same comment thread. 

### References

* [developer.twitter.com](https://developer.twitter.com/en/docs/tutorials/how-to-build-a-complete-twitter-autoresponder-autohook)
* [Event Types](https://stackoverflow.com/questions/61451068/twitter-account-activity-api-webhook-how-to-determine-which-type-of-event-occu)
* [twitter-webhook](https://hevodata.com/learn/twitter-webhook/#s4)
* [Real Time Twitter Bot](https://towardsdatascience.com/building-a-real-time-twitter-bot-that-replies-with-media-e353fff1c395)