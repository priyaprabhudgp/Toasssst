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
  bigMeat: { name: "Big Meat", img: "/gacha-bank/MeatPack/bigMeat.png" },
  blueFish: { name: "Blue Fish", img: "/gacha-bank/MeatPack/blueFish.png" },
  brownFish: { name: "Brown Fish", img: "/gacha-bank/MeatPack/BrownFish.png" },
  crab: { name: "Crab", img: "/gacha-bank/MeatPack/crab.png" },
  deadFish: { name: "Dead Fish", img: "/gacha-bank/MeatPack/deadFish.png" },
  longFish: { name: "Long Fish", img: "/gacha-bank/MeatPack/longFish.png" },
  penguin: { name: "Penguin", img: "/gacha-bank/MeatPack/pairPenguin.png" },
  shrimp: { name: "Shrimp", img: "/gacha-bank/MeatPack/shrimp.png" },
  tunaCan: { name: "Tuna Can", img: "/gacha-bank/MeatPack/tunaCan.png" },

  // Mold items
  moldGreen: { name: "Green Mold", img: "/gacha-bank/MoldPack/green.png" },
  moldBlue: { name: "Grey Mold", img: "/gacha-bank/MoldPack/grey.png" },
  moldPurple: { name: "Black Mold", img: "/gacha-bank/MoldPack/blackHole.png" },
  moldRed: { name: "Strawberry Mold", img: "/gacha-bank/MoldPack/strawberryMold.png" },
  moldYellow: { name: "Cheese Mold", img: "/gacha-bank/MoldPack/cheeseMold.png" },
  moldOrange: { name: "Rotten Meat", img: "/gacha-bank/MoldPack/meatMold.png" },
  moldBrown: { name: "Moldy Potato", img: "/gacha-bank/MoldPack/potatoMold.png" },

  // Mystery items
  mystery1: { name: "ishowspeed", img: "/gacha-bank/MysteryPack/ishowspeed.jpg" },
  mystery2: { name: "mike", img: "/gacha-bank/MysteryPack/mike.jpg" },
  mystery3: { name: "tungtungsahir", img: "/gacha-bank/MysteryPack/tungtungsahir.jpg" },
  mystery4: { name: "um pickle", img: "/gacha-bank/MysteryPack/umPickle.jpg" },
  mystery5: { name: "what", img: "/gacha-bank/MysteryPack/what.jpg" },
  mystery6: { name: "dog", img: "/gacha-bank/MysteryPack/dog.jpg" },
  mystery7: { name: "cat", img: "/gacha-bank/MysteryPack/cat.jpg" },
  mystery8: { name: "batman cat", img: "/gacha-bank/MysteryPack/batmanCat.jpg" },
  mystery9: { name: "ash baby", img: "/gacha-bank/MysteryPack/ashBaby.jpg" },
  mystery10: { name: "wow cat", img: "/gacha-bank/MysteryPack/wowCat.jpg" },
  mystery11: { name: "cry", img: "/gacha-bank/MysteryPack/cry.jpg" },

  // Spread items
  butter: { name: "Butter", img: "/gacha-bank/SpreadPack/butter.png" },
  cream: { name: "Cream", img: "/gacha-bank/SpreadPack/cream.png" },
  honey: { name: "Chocolate", img: "/gacha-bank/SpreadPack/choco.png" },
  margarine: { name: "Pickle", img: "/gacha-bank/SpreadPack/pickle.png" },
  peanutButter: { name: "Fish", img: "/gacha-bank/SpreadPack/fish.png" },
  tahini: { name: "Peanut", img: "/gacha-bank/SpreadPack/peanut.png" },
  cake: { name: "Cake", img: "/gacha-bank/SpreadPack/cake.png" },
  cheese: { name: "Cheese", img: "/gacha-bank/SpreadPack/cheese.png" },
  ice: { name: "Ice", img: "/gacha-bank/SpreadPack/ice.png" },
  rice: { name: "Rice", img: "/gacha-bank/SpreadPack/rice.png" },

  // Veggie items
  carrot: { name: "Broccoli", img: "/gacha-bank/VeggiesPack/brocoli.png" },
  cucumber: { name: "Garlic", img: "/gacha-bank/VeggiesPack/garlic.png" },
  lettuce: { name: "Spinach", img: "/gacha-bank/VeggiesPack/spinach.png" },
  onion: { name: "Green Onion", img: "/gacha-bank/VeggiesPack/greenOnion.png" },
  tomato: { name: "Tomato", img: "/gacha-bank/VeggiesPack/tomato.png" },
  zucchini: { name: "Potato", img: "/gacha-bank/VeggiesPack/potato.png" },
  chili: { name: "Chili", img: "/gacha-bank/VeggiesPack/chili.png" },
  ginger: { name: "Ginger", img: "/gacha-bank/VeggiesPack/ginger.png" },
  eggplant: { name: "Eggplant", img: "/gacha-bank/VeggiesPack/eggplant.png" },
  bigSprout: { name: "Big Sprout", img: "/gacha-bank/VeggiesPack/bigSprout.png" },


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
    items: ["bigMeat", "blueFish", "brownFish", "crab", "deadFish", "longFish", "lotsFish", "penguin", "shrimp", "tunaCan"],
  },
  {
    id: "moldPack",
    name: "Mold Pack",
    price: 30000,
    img: moldPackImg,
    items: ["moldGreen", "moldBlue", "moldPurple", "moldRed", "moldYellow", "moldOrange", "moldBrown"],
  },
  {
    id: "mysteryPack",
    name: "Mystery Pack",
    price: 10000,
    img: mysteryPackImg,
    items: ["mystery1", "mystery2", "mystery3", "mystery4", "mystery5", "mystery6", "mystery7", "mystery8", "mystery9", "mystery10", "mystery11"],
  },
  {
    id: "spreadPack",
    name: "Spread Pack",
    price: 5000,
    img: spreadPackImg,
    items: ["butter", "cream", "honey", "margarine", "peanutButter", "tahini", "cake", "cheese", "ice", "rice"],
  },
  {
    id: "veggiesPack",
    name: "Veggies Pack",
    price: 5000,
    img: veggiesPackImg,
    items: ["carrot", "cucumber", "lettuce", "onion", "tomato", "zucchini", "chili", "ginger", "eggplant", "bigSprout"],
  },
];
