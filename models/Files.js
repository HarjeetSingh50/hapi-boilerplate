/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

//Mongoose.set('debug', true)

const FileSchema = new Schema({
    user_id: { type: String },
    file_original_name: { type: String },
    file_type: { type: String },
    type: { type: String, enum: ['profile_image', 'gallery_image'], default: 'profile_image' },
    file_extension: { type: String },
    is_video: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Number, default: Date.now },
    updated_at: { type: Number, default: Date.now }
});


const File = Mongoose.model('File', FileSchema);

module.exports = File;