const Web3 = require("web3");

var provider = "ADD_YOUR_ETHEREUM_NODE_URL";
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ", result);
});

// import TwitterApi from 'twitter-api-v2';
// const twitterClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAG0LVgEAAAAAWroYJBnrELkr2TXTwzI%2BrNjqqgc%3DDatwoyzx6mCk9ia3lNteIueAitmZatrXr1laQT9XFfB5nqDKce');
// const roClient = twitterClient.readOnly;
// const user = await roClient.v2.userByUsername('The_Zo_World');

const config = require("./config");
const twitter = require("twitter-lite");
const client = new twitter(config);

function sendTxn(toAddr, tweet) {
  web3.eth
    .sendTransaction({ from: "0x123...", data: toAddr })
    .once("sending", function (payload) {})
    .once("sent", function (payload) {})
    .once("transactionHash", function (hash) {})
    .once("receipt", function (receipt) {})
    .on("confirmation", function (confNumber, receipt, latestBlockHash) {})
    .on("error", function (error) {})
    .then(function (receipt) {
      let statusObj = {
        status:
          "Hi @" +
          tweet.user.screen_name +
          "we sent you an NFT, txn id: " +
          receipt.txn,
        in_reply_to_status_id: tweet.id_str,
      };
      client
        .post("statuses/update", statusObj)
        .then((result) => {
          console.log('You successfully tweeted this : "' + result.text + '"');
        })
        .catch(console.error);
    });
}

function getAddressAndSend(msg) {
  let start = msg.indexOf("0x");
  let end = msg.indexOf(" ", start + 1);
  let addr = msg.substring(start, end);
  let verified = isAddress(addr);
  if (verified) {
    sendTxn(addr, msg);
  } else {
    web3.eth.ens.getAddress(addr).then(function (address) {
      if (isAddress(address)) {
        sendTxn(addr, msg); 
      } else console.log("Invalid address");
    });
  }
}

var isAddress = function (address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  } else {
    return isChecksumAddress(address);
  }
};

var isChecksumAddress = function (address) {
  address = address.replace("0x", "");
  var addressHash = sha3(address.toLowerCase());
  for (var i = 0; i < 40; i++) {
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

module.exports = { getAddressAndSend };
