const {v4 : uuidv4} = require("uuid")
const User = require("../models/user");
const { setUser } = require("../service/auth")

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name : name,
    email : email,
    password : password,
  });
  // return res.render("home");
  return res.redirect  ("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne( {email, password} );
  if(!user) return res.render("login", {
    error : "Invalid username or Password"
  })
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId)
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
