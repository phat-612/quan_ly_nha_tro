class SiteController {
  index(req, res) {
    res.send("home");
  }
  home(req, res) {
    res.render("user/home");
  }
  login(req, res) {
    res.render("site/login");
  }
}

module.exports = new SiteController();
