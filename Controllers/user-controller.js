import User from "../Models/User.js";

// export const getAllUsers = async (req, res, next) => {
//   let users;
//   try {
//     users = await User.find();
//   } catch (error) {
//     console.log(error);
//   }
//   if (!users) {
//     return res.status(404).json({ message: "No users found" });
//   }
//   return res.status(200).json({ users });
// };

export const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  let checkUserExist;
  try {
    checkUserExist = await User.findOne({ email });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ message: "try gagin later." });
  }
  if (checkUserExist) {
    return res.status(400).json({ message: "Email ID already taken." });
  }
  const user = new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ message: "invalid data." });
  }
  return res.status(201).json({
    userId: user._id,
    name: user.name,
    email: user.email,
  });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let checkUserExist;
  try {
    checkUserExist = await User.findOne({ email, password });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Try again later." });
  }
  if (!checkUserExist) {
    return res.status(400).json({ message: "user not found!!!" });
  }
  return res.status(201).json({
    userId: checkUserExist._id,
    name: checkUserExist.name,
    email: checkUserExist.email,
  });
};
