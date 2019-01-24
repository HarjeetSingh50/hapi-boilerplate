const path = require("path")

const {
  viewFileS, uploadFileS, deleteFileS } = require("../services/files");
const msgs = require("../utilities/messages");

module.exports = {
  uploadFile: async (req, h) => {
    try {
      const fileData = await uploadFileS(req);
    
      if(fileData){
        return req.server.methods.successAction(h, fileData, msgs.fileUploaded);
      }
     
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  viewFile: async (req, h) => {
    try {
      const file = await viewFileS(req);
      if (file) {
        var url = path.join(__dirname, '../assets/' + file.user_id + "/" + file._id + "." + file.file_extension);
        return h.file(url);
      }
      else {
        throw new Error(msgs.noFileFound);
      }
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  deleteFile: async (req, h) => {
    try {
      await deleteFileS(req);
      return req.server.methods.successAction(h, null, msgs.fileDeleted);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  }
};