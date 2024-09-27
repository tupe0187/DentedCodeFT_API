import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { singJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User signup
router.post("/", async (req, res, next) => {
  try {
    // encrypt the password

    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);
    //inser the user
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message: "Error creating user. Please try again later.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is another user have used this email, try to login or use different email to signup!";
    }

    error.statusCode = 200;
    next(error);
  }
});

// Login user
router.post("/login", async (req, res, next) => {
  try {
    //1. receive email and password
    const { email, password } = req.body;
    if (email && password) {
      //2. find the suer by email
      const user = await getUserByEmail(email);
      if (user?._id) {
        //3. match the password
        const isMatched = comparePassword(password, user.password);
        if (isMatched) {
          // the user actually authenticated
          //4. JWT and store the jwt in db then return the user {} with jwt token

          const accessJWT = singJWT({
            email: email,
          });

          user.password = undefined;
          res.json({
            status: "success",
            message: "Loged in successfully",
            user,
            accessJWT,
          });

          return;
        }
      }
    }

    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    next(error);
  }
});

// User profile from he accessJWT
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
