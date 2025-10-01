const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// aik file ko upload krne walay hain, pehle file humare server pr aye gi, phr wo file imagekit ke server pr jae gi... Ab humein nhi pta ke humare server se file imagekit ke server pr kitne time mai jae gi..., is liye humne promise use kia hai.... Jab file upload ho jae gi tb resolve call hoga, agr file upload na ho pae to reject call krenge...

// The imagekit.upload function returns a promise if a callback is not provided.
// We can directly return that promise, which simplifies the code and avoids the Promise constructor anti-pattern.

function uploadFile(file) {
  // The ImageKit SDK expects the parameter to be `fileName` (camelCase), not `filename`.
  return imagekit.upload({
    file: file.buffer,   // actual file data (binary buffer)
    fileName: file.originalname || "default-audio.mp3",
    folder: "moody-player", // audio files ko moody-player folder mai store krenge.
    
  });
}

module.exports = uploadFile 
