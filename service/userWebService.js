const { UserSchema } = require("../models/userModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { RolSchema } = require("../models/rolModel.js");
const { Sequelize } = require("sequelize");
require("../associations");

class UserWebService {
  //Find fuctions

  async findUserByEmail(email) {
    return await UserSchema.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: PersonSchema,
        },
      ],
      attributes: ["usuarioId", "email", "estado", "rolId"],
    });
  }

  async findAllUsers() {
    return await PersonSchema.findAll({
      include: [
        {
          model: UserSchema,
          attributes: [],

          include: [
            {
              model: RolSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "personaId",
        "nombre",
        "apellidoPaterno",
        "apellidoMaterno",
        "tipo",
        [Sequelize.col("usuario.email"), "email"],
        [Sequelize.col("usuario.rol.nombre"), "rol"],
      ],
    });
  }

  // Create functions
  async createUser(user) {
    console.log("EMAIL");
    console.log(user.usuario.email);
    return await PersonSchema.create(user, {
      include: [UserSchema],
    });
  }

  async updateUser(userId, newPersonData, newUserData) {
    const person = await PersonSchema.findByPk(userId);
    await person.update(newPersonData);

    const user = UserSchema.findOne({
      where: {
        personaId: userId,
      },
    }).then((user) => {
      if (user) {
        user.update(newUserData);
      }
    });

    return { message: "User Updated" };
  }

  async destroyUser(userId) {
    const person = await PersonSchema.findByPk(userId);
    await person.destroy();
    return { message: "User Deleted" };
  }
}

// update functions

module.exports = { UserWebService };
