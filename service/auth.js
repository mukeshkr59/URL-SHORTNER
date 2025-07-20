// const sessionIdToUserMap = new Map(); // we are maintaining the state of the user

const jwt = require("jsonwebtoken");
const secret = "process.env.JWT_SECRET";

// function setUser(id, user) {
//   // return sessionIdToUserMap.set(id, user);
//   const payload = {
//     id,
//     ...user,
//   };
//   return jwt.sign( payload ,secret );
// }

function setUser(user){
  return jwt.sign({
    _id : user.id,
    email : user.email
  }, process.env.JWT_SECRET)
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
