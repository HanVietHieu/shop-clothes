const express = require("express");
const router = express.Router();
const db = require("../models/index");
const Users = require("../models/users");
const { Op } = require("sequelize");

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", (req, res) => {
  res.send({
    data: "[]",
    message: 200,
  });
});

router.get("/about", (req, res) => {
  res.send("About birds");
});

router.post("/login", async (req, res) => {
  const { user_name, pass_word } = req.body;
  // const user = await db.users.findAll({
  //   where: { userName: user_name, passWord: pass_word },
  // });
  try {
    const order = await db.Orders.findAll();

    return;
    if (existingUser) {
      return res.status(400).send("Tên người dùng đã tồn tại");
    }

    const newUser = await User.create({ username, password });
    res.status(201).send("Đăng ký thành công");
  } catch (error) {
    console.error("Lỗi đăng ký người dùng:", error);
    res.status(500).send("Đã xảy ra lỗi");
  }

  // console.log("user", user);
  return res.status(200).json({
    data: {},
  });
});

router.post("/register", async (req, res) => {
  const { user_name, pass_word, email, full_name } = req.body || {};

  if (!user_name || !pass_word || !email || !full_name) {
    return res.status(401).json({
      message: "vui lòng kiểm tra lại data",
    });
  }

  const isCheckData = await db.Users.findOne({
    where: {
      [Op.or]: [{ userName: user_name }, { email }],
    },
  });
  console.log(11111111111111, isCheckData);
  if (isCheckData) {
    let titleError = "email";

    if (isCheckData.userName == user_name) {
      titleError = "Tên tài khoản";

      if (isCheckData.email == email) {
        titleError = "Tên tài khoản và email";
      }
    }
    // console.log(1234, isCheckData);
    return res.status(404).json({
      message: `${titleError} đã được tạo`,
      data: isCheckData,
    });
  }

  const data = await db.Users.create({
    userName: user_name,
    passWord: pass_word,
    email: email,
    fullName: full_name,
  });

  // const a = new Promise(async (resolve, reject) => {
  //   try {
  //     const data = db.users
  //       .create({
  //         userName: user_name,
  //         passWord: pass_word,
  //         email: email,
  //         fullName: full_name,
  //       })
  //       .then((user) => {
  //         console.log("Bản ghi đã được chèn vào cơ sở dữ liệu:", user.toJSON());
  //       })
  //       .catch((err) => {
  //         res.json({
  //           err: err,
  //         });
  //         if (err.name === "SequelizeUniqueConstraintError") {
  //           // Xử lý khi gặp lỗi ràng buộc duy nhất
  //           console.error("Lỗi: ", err.fields, " đã tồn tại.");
  //         } else {
  //           // Xử lý các lỗi khác
  //           console.error("Lỗi khi chèn bản ghi:", err);
  //         }
  //       });
  //     return data;
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
  // a();
  // const data = db.users.create({
  //   userName: user_name,
  //   passWord: pass_word,
  //   email: email,
  //   fullName: full_name,
  // });
  return res.status(200).json({
    data,
    isCheckData,
    message: "tạo tài khoản mới thành công",
  });
});

router.post("/upload", (req, res) => {});

module.exports = router;
