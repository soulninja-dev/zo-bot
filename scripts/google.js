const { google } = require("googleapis");
const request = require("request");
const sheets = google.sheets("v4");
const googleConfig = require("../google.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function setSpreadSheetValues({ spreadsheetId, auth, sheetName, data }) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    auth: auth,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: data,
    },
  });
  return res;
}

const spreadsheetId = "1x7GYDlkFQ29tfZlmRaNM2KUt1HE8jbMZvV5zj21i65U";
const sheetName = "main";

async function setZoData(data) {
  try {
    const auth = await getAuthToken();
    const response = await setSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
      data,
    });
    console.log("setSpreadSheetValues", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

const auth = new google.auth.JWT(
  "discord@zoworld.iam.gserviceaccount.com",
  null,
  googleConfig.private_key,
  ["https://www.googleapis.com/auth/spreadsheets.readonly"]
);

auth.getRequestHeaders().then((authorization) => {
  let qs = {
    gid: spreadsheetId,
    tqx: "out:csv",
    tq: `select B where A = 'thenikhilprakash#2887'`,
  };
  let options = {
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq`,
    qs: qs,
    method: "get",
    headers: authorization,
  };
  request(options, (err, res, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
});

module.exports = { setZoData };
