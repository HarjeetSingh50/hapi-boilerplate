const Joi = require("joi");
const ctrlr = require("../../controllers/files");

module.exports = [
  /**
   * Delete File
   */
  {
    method: "PUT",
    path: "/api/v1/files/delete-file/{id}",
    handler: ctrlr.deleteFile,
    config: {
      auth: 'basic',
      description: "Api service used to delete any uploaded image/file from the platform",
      tags: ["api", "files"],
      notes: `
      headers:
        'x-authorization': Joi.string().trim().required().label("Auth Token")
      params:
        id: Joi.string().trim().required().label("file id")
      `,
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().required().label("Auth Token")
        }).options({ allowUnknown: true }),
        params: {
          id: Joi.string().trim().required().label("file id")
        }
      }
    }
  },
  /**
   * Upload File
   */
  {
    method: "PUT",
    path: "/api/v1/files/upload-file",
    handler: ctrlr.uploadFile,
    config: {
      auth: 'basic',
      description: "Api service used to upload files(images/videos) on the platform. image_type: 'profile_image', 'gallery_image', 'therapy_image'",
      notes: `
      When uploading image from app and need to send the base64 image, all these parameters are mandatory - base64image, file_original_name, file_type, file_extension
      headers: 
        'x-authorization': Joi.string().trim().required().label("Auth Token")
      payload: 
        file: Joi.any().meta({ swaggerType: 'file' }).description('file to upload'),
        base64image: Joi.string().optional(),
        is_video: Joi.boolean().valid(true, false).default(false),
        image_type: Joi.string().valid('profile_image', 'gallery_image', 'therapy_image').default('profile_image'),
        file_original_name: Joi.string().optional().label('File name'),
        file_type: Joi.string().optional().label('File content type'),
        file_extension: Joi.string().optional().label('File extension')
      `,
      tags: ["api", "files"],
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().required().label("Auth Token")
        }).options({ allowUnknown: true }),
        payload: {
          file: Joi.any().meta({ swaggerType: 'file' }).description('file to upload'),
          base64image: Joi.string().optional(),
          is_video: Joi.boolean().valid(true, false).default(false),
          image_type: Joi.string().valid('profile_image', 'gallery_image', 'therapy_image').default('profile_image'),
          file_original_name: Joi.string().optional().label('File name'),
          file_type: Joi.string().optional().label('File content type'),
          file_extension: Joi.string().optional().label('File extension')
        }
      },
      payload: {
        maxBytes: 3000000000,
        parse: true,
        output: 'stream',
        timeout: false
      }
    }
  },
  /**
   * View File
   */
  {
    method: "GET",
    path: "/api/v1/files/view-file/{id}",
    handler: ctrlr.viewFile,
    config: {
      auth: false,
      description: "Api service used to view uploaded files(images/videos) on the platform",
      tags: ["api", "files"],
      notes: `
      params: {
        id: Joi.string().trim().required().label("file id")
      }`,
      validate: {
        params: {
          id: Joi.string().trim().required().label("file id")
        }
      }
    }
  }
];