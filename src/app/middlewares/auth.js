const isLogin = (req, res, next) => {
  if (req.session.isLogin) {
    next();
  } else {
    res.redirect("/login");
  }
};
const logined = (req, res, next) => {
  if (req.session.isLogin) {
    res.redirect("/admin");
  } else {
    next();
  }
};
module.exports = {
  isLogin,
  logined,
};
