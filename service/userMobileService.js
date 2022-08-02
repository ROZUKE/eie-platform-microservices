const { PersonSchema } = require("../models/personModel");
const { UserSchema } = require("../models/userModel");
const { Sequelize } = require("sequelize");
require("../associations");

class UserMobileService {
  // find functions
  async findUserByEmail(email) {
    return await UserSchema.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: PersonSchema,
          attributes: [],
        },
      ],
      attributes: [
        "usuarioId",
        "email",
        "estado",
        [
          Sequelize.fn(
            "concat",
            Sequelize.col("persona.nombre"),
            " ",
            Sequelize.col("persona.apellido_paterno"),
            " ",
            Sequelize.col("persona.apellido_materno")
          ),
          "nombre",
        ],
        [Sequelize.col("persona.tipo"), "tipo"],
      ],
    });
  }
}

module.exports = { UserMobileService };
