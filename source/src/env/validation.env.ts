import * as Joi from 'joi';

export function validationEnv(): Joi.ObjectSchema<any> {
  return Joi.object({
    APP_ENV: Joi.valid('local').default('dev').required(),
    APP_VERSION: Joi.string().required(),
    HTTP_PORT: Joi.number().default(3200).required(),

    MASTER_HOST: Joi.string().required(),
    MASTER_PORT: Joi.number().required(),
    MASTER_USERNAME: Joi.string().required(),
    MASTER_PASSWORD: Joi.string().required(),
    MASTER_DATABASE: Joi.string().required(),

    SLAVE_HOST: Joi.string().required(),
    SLAVE_PORT: Joi.number().required(),
    SLAVE_USERNAME: Joi.string().required(),
    SLAVE_PASSWORD: Joi.string().required(),
    SLAVE_DATABASE: Joi.string().required(),
  });
}
