class SiteController {
  index(req, res) {
    res.send("home");
  }
  home(req, res) {
    res.render("user/home");
  }
}

module.exports = new SiteController();
