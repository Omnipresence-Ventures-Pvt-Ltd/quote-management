/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { DataTypes, Model } from "sequelize";
import databaseConnection from "#database/index";
import { DateTime } from "luxon";
import { Utils } from "utils/utils";

export default class User extends Model {
  declare id: number;

  declare name: string;

  declare mobile: string | null;

  declare email: string | null;

  declare createdAt: DateTime;

  declare updatedAt: DateTime;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: () => Utils.getRandomId,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
      field: "mobile",
      validate: {
        isNumeric: { msg: "Invalid Mobile entered, only a numeric allowed" },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "email",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
      get() {
        return DateTime.fromSQL(this.getDataValue("createdAt") as string);
      },
      set(value?: DateTime) {
        let dateTime: string;

        if (value?.isValid) {
          dateTime = value.toISO() as string;
        } else {
          dateTime = DateTime.now().toISO();
        }

        this.setDataValue("createdAt", dateTime);
        return dateTime;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      //   defaultValue: () => DateTime.now().toISO(),
      field: "updated_at",
      get() {
        return DateTime.fromSQL(this.getDataValue("updatedAt") as string);
      },
      set(value?: DateTime) {
        let dateTime: string;

        if (value?.isValid) {
          dateTime = value.toISO() as string;
        } else {
          dateTime = DateTime.now().toISO();
        }

        this.setDataValue("updatedAt", dateTime);
        return dateTime;
      },
    },
    firstName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.name?.split(" ")?.[0];
      },
    },
    lastName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.name?.split(" ")?.at(-1);
      },
    },
  },
  {
    sequelize: databaseConnection,
    tableName: "users",
    underscored: true,
    indexes: [
      { fields: ["id"] },
      { fields: ["createdAt"] },
      { fields: ["updatedAt"] },
      { fields: ["mobile"], unique: true },
    ],
  },
);
