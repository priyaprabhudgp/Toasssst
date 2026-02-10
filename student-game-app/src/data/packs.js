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
  ham: { name: "Ham", img: "/gacha-bank/MeatPack/ham.png" },
  salmon: { name: "Salmon", img: "/gacha-bank/MeatPack/salmon.png" },
  turkey: { name: "Turkey", img: "/gacha-bank/MeatPack/turkey.png" },

  // Mold items
  moldGreen: { name: "Green Mold", img: "/gacha-bank/MoldPack/moldGreen.png" },
  moldBlue: { name: "Blue Mold", img: "/gacha-bank/MoldPack/moldBlue.png" },
  moldPurple: { name: "Purple Mold", img: "/gacha-bank/MoldPack/moldPurple.png" },
  moldRed: { name: "Red Mold", img: "/gacha-bank/MoldPack/moldRed.png" },
  moldYellow: { name: "Yellow Mold", img: "/gacha-bank/MoldPack/moldYellow.png" },
  moldOrange: { name: "Orange Mold", img: "/gacha-bank/MoldPack/moldOrange.png" },

  // Mystery items
  mystery1: { name: "Mystery 1", img: "/gacha-bank/MysteryPack/mystery1.png" },
  mystery2: { name: "Mystery 2", img: "/gacha-bank/MysteryPack/mystery2.png" },
  mystery3: { name: "Mystery 3", img: "/gacha-bank/MysteryPack/mystery3.png" },
  mystery4: { name: "Mystery 4", img: "/gacha-bank/MysteryPack/mystery4.png" },
  mystery5: { name: "Mystery 5", img: "/gacha-bank/MysteryPack/mystery5.png" },
  mystery6: { name: "Mystery 6", img: "/gacha-bank/MysteryPack/mystery6.png" },

  // Spread items
  butter: { name: "Butter", img: "/gacha-bank/SpreadPack/butter.png" },
  cream: { name: "Cream", img: "/gacha-bank/SpreadPack/cream.png" },
  honey: { name: "Honey", img: "/gacha-bank/SpreadPack/honey.png" },
  margarine: { name: "Margarine", img: "/gacha-bank/SpreadPack/margarine.png" },
  peanutButter: { name: "Peanut Butter", img: "/gacha-bank/SpreadPack/peanutButter.png" },
  tahini: { name: "Tahini", img: "/gacha-bank/SpreadPack/tahini.png" },

  // Veggie items
  carrot: { name: "Carrot", img: "/gacha-bank/VeggiesPack/carrot.png" },
  cucumber: { name: "Cucumber", img: "/gacha-bank/VeggiesPack/cucumber.png" },
  lettuce: { name: "Lettuce", img: "/gacha-bank/VeggiesPack/lettuce.png" },
  onion: { name: "Onion", img: "/gacha-bank/VeggiesPack/onion.png" },
  tomato: { name: "Tomato", img: "/gacha-bank/VeggiesPack/tomato.png" },
  zucchini: { name: "Zucchini", img: "/gacha-bank/VeggiesPack/zucchini.png" },
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
