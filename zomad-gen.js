const axios = require("axios");
const sharp = require("sharp");
fs = require("fs");

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const fetchSeed = async () => {
  const response = await axios.get(
    "https://api.zostel.com/profile/api/v1/avatar/seed/"
  );
  return { ...response.data.avatar };
};

const WORKING_LAYERS = [1, 2, 3, 4, 5, 8, 10, 11];

let bases = [],
  backgroundColors = [],
  categories = [],
  categoryProbabilities = {};
let avatarName = "";

let localLayers = {},
  localBases = {};

let selectedBackground = "",
  zobuLayers = [],
  selectedBase = 1;

const getCategory = (name) => categories.find((c) => c.name === name);

const fetchAsset = async (category, asset) => {
  if (localLayers[category] && localLayers[category][asset]) {
    console.log("Fetching layer locally");
    return localLayers[category][asset];
  }
  try {
    console.log("Downloading layer");
    const assetObj = categories
      .find((c) => c.id === category)
      ?.assets.find((a) => a.id === asset);

    if (assetObj && assetObj.file) {
      const response = await axios.get(assetObj.file);
      return response.data.replace(/<\/?svg.*?>/g, "");
    } else {
      console.log("No file");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchBase = async (_base) => {
  if (localBases[_base]) {
    console.log("Fetching Base locally");
    return localBases[_base];
  }
  try {
    console.log("Downloading Base");
    const assetObj = bases.find((b) => b.id === _base);
    if (assetObj && assetObj.file) {
      const response = await axios.get(assetObj.file);
      return response.data.replace(/<\/?svg.*?>/g, "");
    } else {
      console.log("No file");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const createLayers = () => {
  console.log("Creating layers");
  const layers = categories.map((cat) => {
    return {
      category: cat.id,
      order: cat.order,
      asset: null,
      svg: null,
    };
  });
  zobuLayers = layers.sort((a, b) => a.order - b.order);
};

const handleChange = async (category, asset) => {
  const feature = asset ? await fetchAsset(category, asset) : null;
  const hairStyleCategory = getCategory("Hairstyle");
  const hatsCategory = getCategory("Hats");
  const topsCategory = getCategory("Tops");
  const bottomsCategory = getCategory("Bottoms");
  const outfitsCategory = getCategory("Outfit");

  const zobuLayersCopy = [...zobuLayers];
  const layer = zobuLayersCopy.find((l) => l.category === category);
  if (layer) {
    layer.svg = feature;
    layer.asset = asset;
  }
  if (asset !== null) {
    if (
      hairStyleCategory &&
      category === hairStyleCategory.id &&
      hatsCategory
    ) {
      const hatLayer = zobuLayersCopy.find(
        (l) => l.category === hatsCategory.id
      );
      if (hatLayer) {
        hatLayer.svg = null;
        hatLayer.asset = null;
      }
    } else if (
      hatsCategory &&
      category === hatsCategory.id &&
      hairStyleCategory
    ) {
      const hairStyleLayer = zobuLayersCopy.find(
        (l) => l.category === hairStyleCategory.id
      );
      if (hairStyleLayer) {
        hairStyleLayer.svg = null;
        hairStyleLayer.asset = null;
      }
    }
    if (
      ((topsCategory && category === topsCategory.id) ||
        (bottomsCategory && category === bottomsCategory.id)) &&
      outfitsCategory
    ) {
      const outfitLayer = zobuLayersCopy.find(
        (l) => l.category === outfitsCategory.id
      );
      if (outfitLayer) {
        outfitLayer.svg = null;
        outfitLayer.asset = null;
      }
    } else if (outfitsCategory && category === outfitsCategory.id) {
      if (topsCategory) {
        const topLayer = zobuLayersCopy.find(
          (l) => l.category === topsCategory.id
        );
        if (topLayer) {
          topLayer.svg = null;
          topLayer.asset = null;
        }
      }
      if (bottomsCategory) {
        const bottomLayer = zobuLayersCopy.find(
          (l) => l.category === bottomsCategory.id
        );
        if (bottomLayer) {
          bottomLayer.svg = null;
          bottomLayer.asset = null;
        }
      }
    }
  }
  zobuLayers = zobuLayersCopy;
};

const primalLayers = async () => {
  createLayers();
  const handCategory = getCategory("Hand");
  if (handCategory) {
    await handleChange(handCategory.id, handCategory.assets[0].id);
  }
};

let width = "2000px";
let height = "5120px";

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const randomZobu = async () => {
  const randomLayers = [];
  const newBase = getRandomItem([1, 2]);
  const hiddenLayers = newBase === 1 ? [1, 9] : [1, 9, 2, 5];
  await primalLayers();
  selectedBase = newBase;
  selectedBackground = getRandomItem(backgroundColors);

  categories
    .filter(
      (c) =>
        hiddenLayers.indexOf(+c.id) === -1 &&
        WORKING_LAYERS.indexOf(+c.id) !== -1
    )
    .forEach((_category) => {
      const assetsAccesible = _category.assets.filter(
        (a) => a.bases.indexOf(newBase) !== -1
      );
      let randomAsset = getRandomItem(assetsAccesible);
      if (randomAsset == null) {
        randomAsset = getRandomItem(assetsAccesible);
      }
      const categoryProbability = categoryProbabilities[_category.id];
      avatarName = randomAsset.name;
      console.log(`Avatar Name: ${randomAsset.name}`);
      if (categoryProbability) {
        const shouldAppear = Math.random() <= categoryProbability;
        console.log(categoryProbability, _category.name, shouldAppear);
        if (shouldAppear) {
          randomLayers.push([_category.id, randomAsset.id]);
        }
      }
    });

  shuffleArray(randomLayers);
  for (const _layer of randomLayers) {
    await handleChange(_layer[0], _layer[1]);
  }

  let zobuString = zobuLayers
    .map((layer) => {
      if (layer.svg) {
        return (
          "<g id=" +
          layer.category +
          " key=" +
          layer.category +
          ">" +
          layer.svg +
          "</g>"
        );
      } else {
        return "<g key=" + layer.category + "></g>";
      }
    })
    .join("");
  let resString =
    '<svg id="zomad" xmlns="http://www.w3.org/2000/svg" viewBox="154 0 200 512" style="background-color:' +
    selectedBackground +
    '">' +
    '<rect width="200%" height="100%" fill="' +
    selectedBackground +
    '" />' +
    +" <g id=" +
    selectedBase +
    ">" +
    localBases[selectedBase] +
    "</g>" +
    zobuString +
    "</svg>";

  resString = resString.replaceAll(/(<g([^>]+)>)/gi, "");
  resString = resString.replaceAll(/(<([^>]+)g>)/gi, "");
  resString += "</svg>";

  // let hash = selectedBackground.hashCode();
  // let r = (hash & 0xff0000) >> 16;
  // let g = (hash & 0x00ff00) >> 8;
  // let b = hash & 0x0000ff;

  fs.writeFileSync("./example.svg", resString, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  sharp(__dirname + "/example.svg", { density: 900 })
    .resize(1024, 1024, {
      kernel: sharp.kernel.nearest,
      fit: sharp.fit.cover,
      position: "top",
      // background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toFile(__dirname + "/example.png")
    .then(function (info) {
      console.log(info);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// fetchSeed().then((res) => {
//   categoryProbabilities = res.probabilities;
//   backgroundColors = res.background.colors;
//   bases = res.bases;
//   categories = res.categories;

//   downloadLayers()
//     .then(() => {
//       console.log("Downloaded Assets...");
//       randomZobu();
//     })
//     .catch((e) => {
//       console.log("Assets downloading failed");
//     })
//     .finally(() => {});
// });

const downloadLayers = async () => {
  const b = {};
  for (const base in bases) {
    if (bases.hasOwnProperty(base)) {
      const indieBase = bases[base];
      try {
        if (Object.keys(indieBase).length && indieBase.file) {
          b[indieBase.id] = await fetchBase(indieBase.id);
        } else {
          b[indieBase.id] = null;
        }
      } catch (error) {
        console.log(error);
        b[indieBase.id] = null;
      }
    }
  }
  localBases = b;
  return true;
};

const flow = async () => {
  let res = await fetchSeed();
  categoryProbabilities = res.probabilities;
  backgroundColors = res.background.colors;
  bases = res.bases;
  categories = res.categories;
  await downloadLayers();
  return randomZobu();
};

module.exports = { flow };
