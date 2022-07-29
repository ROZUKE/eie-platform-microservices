const { UserSchema } = require("../models/userModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { RolSchema } = require("../models/rolModel.js");

//Person associations
PersonSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_persona_id",
  },
});
UserSchema.belongsTo(PersonSchema);

RolSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_rol_id",
  },
});
UserSchema.belongsTo(RolSchema);
