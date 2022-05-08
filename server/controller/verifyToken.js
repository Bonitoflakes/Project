import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.header("access-token");
  if (!token)
    return res.status(401).json({ status: false, message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verified);
    // *adding the verified jwt return value to the header , which is available to the next middleware
    req.user = verified;
    // console.log(req.user.id);
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
};

export default verifyJWT;
