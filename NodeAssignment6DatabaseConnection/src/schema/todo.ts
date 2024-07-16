import Joi from "joi";

//for creating a todo
export const createTodoBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),

  description: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

// for updating todo
export const updateTodoBodySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
  }),

  title: Joi.string().optional(),

  description: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

// for getting tody by id a todo
export const getTodoQuerySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
  }),
}).options({
  stripUnknown: true,
});
