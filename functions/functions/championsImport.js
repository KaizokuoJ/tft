const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const admin = require("firebase-admin/lib/index");
const serviceAccount = require("../tft-cheatsheets-firebase-adminsdk-bcsn9-b3f19c1de2.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tft-cheatsheets.firebaseio.com"
  });
} catch (e) {
  console.log("App already initialized");
}

const champions = {
  RekSai: {
    id: "421",
    key: "RekSai",
    name: "Rek'Sai",
    origin: [
      "Void"
    ],
    class: [
      "Brawler"
    ],
    cost: 2,
    ability: {
      name: "Burrow",
      description: "Rek'Sai burrows for a short duration becoming untargetable and healing. When Rek'Sai unburrows she deals damage and knocks up the closest enemy.",
      type: "Active",
      manaCost: 150,
      manaStart: 0,
      stats: [
        {
          type: "Damage",
          value: "150 / 200 / 250"
        },
        {
          type: "Heal Amount",
          value: "300 / 400 / 500"
        },
        {
          type: "Heal Tick Rate",
          value: "0.5s"
        },
        {
          type: "Burrow Duration",
          value: "2s"
        },
        {
          type: "Knockup Duration",
          value: "1s"
        }
      ]
    },
    stats: {
      offense: {
        damage: 40,
        attackSpeed: 0.65,
        dps: 26,
        range: 1
      },
      defense: {
        health: 650,
        armor: 20,
        magicResist: 20
      }
    },
    items: [
      "frozenheart",
      "phantomdancer",
      "dragonsclaw"
    ]
  }
};

for (const [key, value] of Object.entries(champions)) {
  admin
    .firestore()
    .collection("champions")
    .doc(key)
    .set(value);
}