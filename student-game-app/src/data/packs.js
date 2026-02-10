// Import pack images from assets
import jamPackImg from "../assets/toaster_jam.png";
import meatPackImg from "../assets/toaster_seafood.png";
import moldPackImg from "../assets/toaster_mold.png";
import mysteryPackImg from "../assets/toaster_mystery.png";
import spreadPackImg from "../assets/toaster_butter.png";
import veggiesPackImg from "../assets/toaster_veggie.png";

// Map individual item IDs to their images using public paths
export const ITEM_IMAGES = {
  // Jam items
  banana: { name: "Banana", img: "/gacha-bank/JamPack/banana.png" },
  blueberry: { name: "Blueberry", img: "/gacha-bank/JamPack/blueberry.png" },
  cherry: { name: "Cherry", img: "/gacha-bank/JamPack/cherry.png" },
  grape: { name: "Grape", img: "/gacha-bank/JamPack/grape.png" },
  raspberry: { name: "Raspberry", img: "/gacha-bank/JamPack/raspberry.png" },
  strawberry: { name: "Strawberry", img: "/gacha-bank/JamPack/strawberry.png" },

  // Meat items
  bacon: { name: "Bacon", img: "/gacha-bank/MeatPack/bacon.png" },
  beef: { name: "Beef", img: "/gacha-bank/MeatPack/bigMeat.png" },
  chicken: { name: "Penguin", img: "/gacha-bank/MeatPack/pairPenguin.png" },
  ham: { name: "Ham", img: "/gacha-bank/MeatPack/crab.png" },
  salmon: { name: "Salmon", img: "/gacha-bank/MeatPack/deadFish.png" },
  turkey: { name: "Turkey", img: "/gacha-bank/MeatPack/blueFish.png" },

  // Mold items
  moldGreen: { name: "Green Mold", img: "/gacha-bank/MoldPack/green.png" },
  moldBlue: { name: "Blue Mold", img: "/gacha-bank/MoldPack/grey.png" },
  moldPurple: { name: "Purple Mold", img: "/gacha-bank/MoldPack/blackHole.png" },
  moldRed: { name: "Red Mold", img: "/gacha-bank/MoldPack/strawberryMold.png" },
  moldYellow: { name: "Yellow Mold", img: "/gacha-bank/MoldPack/cheeseMold.png" },
  moldOrange: { name: "Orange Mold", img: "/gacha-bank/MoldPack/meatMold.png" },

  // Mystery items
  mystery1: { name: "Mystery 1", img: "/gacha-bank/MysteryPack/ishowspeed.jpg" },
  mystery2: { name: "Mystery 2", img: "/gacha-bank/MysteryPack/mike.jpg" },
  mystery3: { name: "Mystery 3", img: "/gacha-bank/MysteryPack/tungtungsahir.jpg" },
  mystery4: { name: "Mystery 4", img: "/gacha-bank/MysteryPack/umPickle.jpg" },
  mystery5: { name: "Mystery 5", img: "/gacha-bank/MysteryPack/what.jpg" },
  mystery6: { name: "Mystery 6", img: "/gacha-bank/MysteryPack/dog.jpg" },

  // Spread items
  butter: { name: "Butter", img: "/gacha-bank/SpreadPack/butter.png" },
  cream: { name: "Cream", img: "/gacha-bank/SpreadPack/cream.png" },
  honey: { name: "Chocolate", img: "/gacha-bank/SpreadPack/choco.png" },
  margarine: { name: "Pickle", img: "/gacha-bank/SpreadPack/pickle.png" },
  peanutButter: { name: "Fish", img: "/gacha-bank/SpreadPack/fish.png" },
  tahini: { name: "Peanut", img: "/gacha-bank/SpreadPack/peanut.png" },

  // Veggie items
  carrot: { name: "Broccoli", img: "/gacha-bank/VeggiesPack/brocoli.png" },
  cucumber: { name: "Garlic", img: "/gacha-bank/VeggiesPack/garlic.png" },
  lettuce: { name: "spinach", img: "/gacha-bank/VeggiesPack/spinach.png" },
  onion: { name: "Green Onion", img: "/gacha-bank/VeggiesPack/greenonion.png" },
  tomato: { name: "Tomato", img: "/gacha-bank/VeggiesPack/tomato.png" },
  zucchini: { name: "potato", img: "/gacha-bank/VeggiesPack/potato.png" },
};

// Pack definitions
export const PACKS = [
  {
    id: "jamPack",
    name: "Jam Pack",
    price: 4000,
    img: jamPackImg,
    items: ["banana", "blueberry", "cherry", "grape", "raspberry", "strawberry"],
  },
  {
    id: "meatPack",
    name: "Meat Pack",
    price: 3000,
    img: meatPackImg,
    items: ["bacon", "beef", "chicken", "ham", "salmon", "turkey"],
  },
  {
    id: "moldPack",
    name: "Mold Pack",
    price: 30000,
    img: moldPackImg,
    items: ["moldGreen", "moldBlue", "moldPurple", "moldRed", "moldYellow", "moldOrange"],
  },
  {
    id: "mysteryPack",
    name: "Mystery Pack",
    price: 10000,
    img: mysteryPackImg,
    items: ["mystery1", "mystery2", "mystery3", "mystery4", "mystery5", "mystery6"],
  },
  {
    id: "spreadPack",
    name: "Spread Pack",
    price: 5000,
    img: spreadPackImg,
    items: ["butter", "cream", "honey", "margarine", "peanutButter", "tahini"],
  },
  {
    id: "veggiesPack",
    name: "Veggies Pack",
    price: 5000,
    img: veggiesPackImg,
    items: ["carrot", "cucumber", "lettuce", "onion", "tomato", "zucchini"],
  },
];
