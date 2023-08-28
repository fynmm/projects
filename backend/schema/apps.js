const joi = require('joi');
const id = joi.number().integer().min(1).required();

exports.select_apps_rules = {
  body: {
    id,
  }
}