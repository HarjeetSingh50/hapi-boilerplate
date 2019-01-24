const Joi = require("joi");
const ctrlr = require("../../controllers/notifications");

module.exports = [
  /**
   * List Notifications
   */
  {
    method: "GET",
    path: "/api/v1/notifications",
    handler: ctrlr.list,
    config: {
      auth: 'basic',
      description: "Api service used to list notifications.",
      tags: ["api", "notifications"],
      notes: `
      headers:
        'x-authorization': Joi.string().trim().required().label("Auth Token")
      query:
        sort_key: Joi.string().valid("created_at").default("created_at").optional().label("Sort Key"),
        sort_order: Joi.number().valid(1, -1).default(-1).optional().label("Sort Order"),
        skip: Joi.number().default("0").optional().label("Skip"),
        limit: Joi.number().default(10).optional().label("Limit"),
        receiver_user_id: Joi.string().optional().length(24).label("Receiver User ID")`,
      validate: {
        headers: Joi.object({
          'x-authorization': Joi.string().trim().required().label("Auth Token")
        }).options({ allowUnknown: true }),
        query: {
          sort_key: Joi.string().valid("created_at").default("created_at").optional().label("Sort Key"),
          sort_order: Joi.number().valid(1, -1).default(-1).optional().label("Sort Order"),
          skip: Joi.number().default("0").optional().label("Skip"),
          limit: Joi.number().default(10).optional().label("Limit"),
          receiver_user_id: Joi.string().optional().length(24).label("Receiver User ID")
        }
      }
    }
  }
];