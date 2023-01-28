const path = require("path");
// const fs = require("fs/promises");

const Jimp = require("jimp");

const getFileUrl = (file, uploadDir, fileName, size) => {
  const avatarDir = path.join(process.cwd(), "public", uploadDir);

  const { filename, path: tempUpload } = file;

  const [extention] = filename.split(".").reverse();

  const avatarName = `${fileName}.${extention}`;
  const avatarUpload = path.join(avatarDir, avatarName);

  Jimp.read(tempUpload, (error, workfile) => {
    if (error) {
      console.log(error);
      throw error;
    }

    workfile.resize(...size).write(avatarUpload);
  });

  return path.join(uploadDir, avatarName);
};

module.exports = getFileUrl;
