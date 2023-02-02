const cloudinary = require("cloudinary").v2;
// const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: false,
});

const resize = async (workFile, size) => {
  const image = await Jimp.read(workFile);

  image.resize(...size);

  await image.writeAsync(workFile);
};

const uploadToCloudinary = async (file, uploadDir, fileName, size) => {
  const { filename, path: tempUpload } = file;

  try {
    await resize(tempUpload, size);

    const [extention] = filename.split(".").reverse();

    const filePathOnCloudinary = `${uploadDir}/${fileName}.${extention}`;

    const result = await cloudinary.uploader.upload(tempUpload, {
      public_id: filePathOnCloudinary,
    });

    console.log(tempUpload);
    return { url: result.url, public_id: result.public_id };
  } catch (error) {
    console.log(error);
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = uploadToCloudinary;
