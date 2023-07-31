var jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

exports.isAuthenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.json({ message: "please login to continue", value:false });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userSchema.findOne({ _id: id });

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
