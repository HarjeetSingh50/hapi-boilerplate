const File = require("../models/Files");
const User = require("../models/User");
const msgs = require("../utilities/messages");
const Path = require("path")
const fs = require('fs');
const fsp = require('fs.promises');

module.exports = {

  uploadFileS: async (req) => {

    let filepath = Path.join(__dirname, "../assets/" + req.auth.credentials.user._id);
    let mode = "777";
    let res;
    if (!req.payload.base64image) {
      var extension = req.payload.file.hapi.filename.split('.').pop();
    }
    else {
      extension = req.payload.file_extension
    }

    fs.mkdir(filepath, mode, function (err, res) {
      if (err) {
        if (err.code == 'EEXIST') {
          return true;
        } else {
          throw err
        }
      } else {
        return true
      }
    })

    let newFile = new File({
      user_id: req.auth.credentials.user._id,
      file_original_name: !req.payload.base64image ? req.payload.file.hapi.filename : req.payload.file_original_name,
      file_type: !req.payload.base64image ? req.payload.file.hapi.headers["content-type"] : req.payload.file_type,
      file_extension: !req.payload.base64image ? extension : req.payload.file_extension,
      is_video: req.payload.is_video ? req.payload.is_video : false,
      type: req.payload.image_type
    });
    let fileName = await newFile.save();

    let writePath = filepath + '/' + fileName._id + '.' + extension;

    if (!req.payload.base64image) {
      let fileStream = fs.createWriteStream(writePath);

      return new Promise((resolve, reject) => {
        req.payload.file.on('error', function (err) {
          reject(err);
        });

        req.payload.file.pipe(fileStream);
        req.payload.file.on('end', function (err) {
          if (err) {
            reject(err);
          };
          const res = {
            fileId: fileName._id,
            is_video: req.payload.is_video
          };
          resolve(res);
        });
      });
    }
    else {
      let base64Image = req.payload.base64image.split(';base64,').pop();
      let imageBuffer = new Buffer(base64Image, 'base64');

      try {
        await fsp.writeFile(writePath, imageBuffer);
        console.info("File created successfully");
        res = {
          fileId: fileName._id,
          is_video: req.payload.is_video
        }
        return res;
      } catch (error) {
        console.error(error);
        throw error
      }
    }
  },

  viewFileS: async (req) => {
    return await File.findById(req.params.id);
  },

  deleteFileS: async (req) => {
    let updateObj = {};
    // Check if file exists in file model, find the path and remove it
    let fileInfo = await File.findOne({ _id: req.params.id });

    if (fileInfo != null) {

      let filePath = Path.join(__dirname, "../assets/" + fileInfo.user_id + "/" + fileInfo._id + "." + fileInfo.file_extension);

      //Remove the file from assets folder
      fs.unlinkSync(filePath);

      //Remove th edocument for that file in file model
      let fileModel = await File.remove({ _id: req.params.id });
    }
    else {
      throw new Error(msgs.noFileFound)
    }

    if (fileInfo.type == 'profile_image') {
      Modelname = 'User'
      updateObj = { $unset: { profile_image: 1 } }
    }

    await User
      .findOneAndUpdate(
        { _id: req.auth.credentials.user._id }, updateObj
        , {
          new: true
        });

    return fileInfo;
  }
};

