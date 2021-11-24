const { google } = require("googleapis");
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function setSpreadSheetValues({ spreadsheetId, auth, sheetName, data }) {
  const res = await sheets.spreadsheets.values.append({
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

module.exports = { setZoData };
