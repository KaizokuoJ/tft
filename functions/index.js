const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./tft-cheatsheets-firebase-adminsdk-bcsn9-b3f19c1de2.json");

const teamCompositions = require("./functions/teamCompositionBuilding");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tft-cheatsheets.firebaseio.com"
  });
} catch (e) {
  console.log("App already initialized");
}

module.exports = {
  createTeamComposition:
    teamCompositions.buildTeamCompositionAndCreateInDatabase
};
