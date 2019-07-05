const firebase = require("firebase");
require("firebase/firestore");

const serviceAccount = require("./tft-cheatsheets-firebase-adminsdk-bcsn9-b3f19c1de2.json");
const admin = require("firebase-admin");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tft-cheatsheets.firebaseio.com"
  });
} catch (e) {
  console.log("App already initialized");
}

const origins = {
  "demon": {
    "key": "demon",
    "name": "Demon",
    "description": "Attacks from Demons have a chance to burn all of an enemy's mana and deal that much true damage.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Aatrox_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "40% chance on hit to Mana Burn"
      },
      {
        "needed": 4,
        "effect": "60% chance on hit to Mana Burn"
      },
      {
        "needed": 6,
        "effect": "80% chance on hit to Mana Burn"
      }
    ]
  },
  "dragon": {
    "key": "dragon",
    "name": "Dragon",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/AurelionSol_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "Dragons are immune to Magic damage"
      }
    ]
  },
  "exile": {
    "key": "exile",
    "name": "Exile",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Yasuo_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 1,
        "effect": "If an Exile has no adjacent allies at the start of combat, they gain a shield equal to a 100% max health."
      }
    ]
  },
  "glacial": {
    "key": "glacial",
    "name": "Glacial",
    "description": "On hit, Glacials have a chance to stun for 2s.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Anivia_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "20% chance"
      },
      {
        "needed": 4,
        "effect": "30% chance"
      },
      {
        "needed": 6,
        "effect": "45% chance"
      }
    ]
  },
  "imperial": {
    "key": "imperial",
    "name": "Imperial",
    "description": "Imperials deal Double Damage.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Swain_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "1 random Imperial"
      },
      {
        "needed": 4,
        "effect": "All Imperials"
      }
    ]
  },
  "noble": {
    "key": "noble",
    "name": "Noble",
    "description": "Nobles grant +100 Armor and heal for 35 on hit",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Garen_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 3,
        "effect": "1 random ally"
      },
      {
        "needed": 6,
        "effect": "All allies"
      }
    ]
  },
  "ninja": {
    "key": "ninja",
    "name": "Ninja",
    "description": "Ninjas gain a percentage of Attack Damage.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Akali_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 1,
        "effect": "1 Ninja only: Ninja gains +40% Attack Damage"
      },
      {
        "needed": 4,
        "effect": "4 Ninjas: All Ninjas gain +60% Attack Damage"
      }
    ]
  },
  "pirate": {
    "key": "pirate",
    "name": "Pirate",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Gangplank_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 3,
        "effect": "Earn up to 4 additional gold after combat against another player."
      }
    ]
  },
  "phantom": {
    "key": "phantom",
    "name": "Phantom",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Mordekaiser_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "Curse a random enemy at the start of combat, setting their HP to 100."
      }
    ]
  },
  "robot": {
    "key": "robot",
    "name": "Robot",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Blitzcrank_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 1,
        "effect": "Robots start combat at full mana"
      }
    ]
  },
  "void": {
    "key": "void",
    "name": "Void",
    "description": null,
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/RekSai_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 3,
        "effect": "Your team's basic attacks ignore 50% of the enemy's Armor"
      }
    ]
  },
  "wild": {
    "key": "wild",
    "name": "Wild",
    "description": "Attacks generate stacks of Fury (up to 5). Each stack of Fury grants 7% Attack Speed.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Rengar_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 2,
        "effect": "Wild allies only"
      },
      {
        "needed": 4,
        "effect": "All allies"
      }
    ]
  },
  "yordle": {
    "key": "yordle",
    "name": "Yordle",
    "description": "Attacks against ally Yordles have a chance to miss.",
    "accentChampionImage": "https://cdn.blitz.gg/blitz/centered/Poppy_Splash_Centered_0.jpg",
    "bonuses": [
      {
        "needed": 3,
        "effect": "25% chance to miss."
      },
      {
        "needed": 6,
        "effect": "60% chance to miss."
      }
    ]
  }
};

for (let [key, value] of Object.entries(origins)) {
  admin.firestore().collection('origins').doc(key).set(value)
}
