const Joi = require("joi");
const ctrlr = require("../../controllers/users");

module.exports = [
  /**
   * Change Password
   */
  {
    method: "PUT",
    path: "/api/v1/users/change-password",
    handler: ctrlr.changePassword,
    config: {
      auth: "basic",
      description: "Api service used to change user password.",
      tags: ["api", "user"],
      notes: `
      headers: 
        'x-authorization': Joi.string().trim().required().label("Auth Token")
      
      payload:
        oldPassword: Joi.string().trim().required().label('Old Password'),
        newPassword: Joi.string().trim().required().min(6).max(10).label('NewPassword')
      `,
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().required().label("Auth Token")
        }).options({ allowUnknown: true }),
        payload: {
          oldPassword: Joi.string().trim().required().label('Old Password'),
          newPassword: Joi.string().trim().required().min(6).max(10).label('NewPassword')
        }
      }
    }
  },
  /**
   * Edit Profile
   */
  {
    method: "PUT",
    path: "/api/v1/users/edit-profile",
    handler: ctrlr.editProfile,
    config: {
      auth: 'basic',
      description: "Api service used for edit profile for user",
      tags: ["api", "user"],
      notes: `
      headers:
        'x-authorization': Joi.string().trim().required().label("Auth Token")
      
      payload: 
        first_name: Joi.string().trim().optional().label("First Name"),
        last_name: Joi.string().trim().optional().label("Last Name"),
        phone: Joi.object().keys({
          country_code: Joi.string().optional(),
          number: Joi.string().optional()
        }),
        address: Joi.object().keys({
          address: Joi.string().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required()
        }),
        profile_image: Joi.string().optional().label('Profile Image')
      `,
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().required().label("Auth Token")
        }).options({ allowUnknown: true }),
        payload: {
          first_name: Joi.string().trim().optional().label("First Name"),
          last_name: Joi.string().trim().optional().label("Last Name"),
          phone: Joi.object().keys({
            country_code: Joi.string().optional(),
            number: Joi.string().optional()
          }),
          address: Joi.object().keys({
            address: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
          }),
          profile_image: Joi.string().optional().label('Profile Image')
        }
      }
    }
  }
  ,
  /**
   * Forgot Password
   */
  {
    method: "PUT",
    path: "/api/v1/users/forgot-password",
    handler: ctrlr.forgotPassword,
    config: {
      auth: false,
      description: "Api service used for forgot password.",
      tags: ["api", "user"],
      notes: `
      payload: 
        email: Joi.string().trim().email().lowercase().required().label("Email"),
        role: Joi.string().trim().optional().valid("admin", "user").label("Role")
      `,
      validate: {
        payload: {
          email: Joi.string().trim().email().lowercase().required().label("Email"),
          role: Joi.string().trim().optional().valid("admin", "user").label("Role")
        }
      }
    }
  }
  ,
  /**
   * Login
   */
  {
    method: "POST",
    path: "/api/v1/users/login",
    handler: ctrlr.login,
    config: {
      description: "Api service used to login a user.",
      tags: ["api", "user"],
      notes: `
      payload: 
        email: Joi.string().trim().email().lowercase().required().label("Email"),
        password: Joi.string().trim().required().label("Password"),
        role: Joi.string().trim().required().valid("admin", "user").label("Role"),
        device_info: Joi.object().optional()
          .keys({
            device_token: Joi.string().trim().optional(),
            device_type: Joi.string().trim().valid('android', 'ios').optional()
          })
      `,
      validate: {
        payload: {
          email: Joi.string().trim().email().lowercase().required().label("Email"),
          password: Joi.string().trim().required().label("Password"),
          role: Joi.string().trim().required().valid("admin", "user").label("Role"),
          device_info: Joi.object().optional()
            .keys({
              device_token: Joi.string().trim().optional(),
              device_type: Joi.string().trim().valid('android', 'ios').optional()
            })
        }
      }
    }
  }
  ,
  /**
   * Logout
   */
  {
    method: "PUT",
    path: "/api/v1/users/logout",
    handler: ctrlr.logout,
    config: {
      auth: false,
      description: "Api service for user logout.",
      tags: ["api", "user"],
      notes: `
      payload:
        token: Joi.string().trim().required().label("token")
      `,
      validate: {
        payload: {
          token: Joi.string().trim().required().label("token")
        }
      }
    }
  }
  ,
  /**
   * Register
   */
  {
    method: "POST",
    path: "/api/v1/users",
    handler: ctrlr.register,
    config: {
      description: "Api service used to register a user.",
      tags: ["api", "user"],
      notes: `
      payload:
        email: Joi.string().trim().email().lowercase().required().label("Email"),
        first_name: Joi.string().trim().required().label("First Name"),
        last_name: Joi.string().trim().required().label("Last Name"),
        password: Joi.string().trim().min(6).max(10).required().label("Password"),
      `,
      validate: {
        payload: {
          email: Joi.string().trim().email().lowercase().required().label("Email"),
          first_name: Joi.string().trim().required().label("First Name"),
          last_name: Joi.string().trim().required().label("Last Name"),
          // role: Joi.string().trim().required().valid("user").label("Role"),
          /*------------
          Password & Confirm password field for sp user role
          -------------- */
          password: Joi.string().trim().min(6).max(10).required().label("Password"),
        }
      }
    }
  }
  ,
  /**
   * Reset Password
   */
  {
    method: "PUT",
    path: "/api/v1/users/reset-password",
    handler: ctrlr.resetPassword,
    config: {
      auth: false,
      description: "Api service used to reset user password.",
      tags: ["api", "user"],
      notes: `
      payload: 
        token: Joi.string().trim().required().length(32).label("token"),
        password: Joi.string().trim().required().min(6).max(20).label('Password')
      `,
      validate: {
        payload: {
          token: Joi.string().trim().required().length(32).label("token"),
          password: Joi.string().trim().required().min(6).max(10).label('Password')
        }
      }
    }
  }
  ,
  /**
   * Get single user info
   */
  {
    method: "GET",
    path: "/api/v1/users/{_id}",
    handler: ctrlr.single,
    config: {
      auth: 'admin',
      description: "Api service used to get single user info.",
      tags: ["api", "user"],
      notes: `
      headers: 
        'x-authorization': Joi.string().trim().optional().label("Auth Token")
      
      params: 
        _id: Joi.string().trim().required().label("_id")
      `,
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().optional().label("Auth Token")
        }).options({ allowUnknown: true }),
        params: {
          _id: Joi.string().trim().required().label("_id"),
        }
      }
    }
  }
  ,
  /**
   * Verify Email
   */
  {
    method: "PUT",
    path: "/api/v1/users/verify-email",
    handler: ctrlr.verifyEmail,
    config: {
      auth: false,
      description: "Api service used to get verify user email.",
      tags: ["api", "user"],
      notes: `
      payload: 
        token: Joi.string().trim().required().length(32).label("token")
      `,
      validate: {
        payload: {
          token: Joi.string().trim().required().length(32).label("token")
        }
      }
    }
  }
  ,
  /**
   * Verify Reset Password
   */
  {
    method: "PUT",
    path: "/api/v1/users/verify-reset-password",
    handler: ctrlr.verifyResetPassword,
    config: {
      auth: false,
      description: "Api service used to verify reset passwork link.",
      tags: ["api", "user"],
      notes: `
      payload: 
        token: Joi.string().trim().required().length(32).label("token")
      `,
      validate: {
        payload: {
          token: Joi.string().trim().required().length(32).label("token")
        }
      }
    }
  }
];