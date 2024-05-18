import Sequelize from "sequelize";

const sequelize = async () => {
  const connectDb = new Sequelize("shop_clothe", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
  try {
    await connectDb.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
