const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
module.exports = {
  uploadImg: (name) => {
    return multer({
      storage: storage,
    }).single(name);
  },
  uploadImgs: (name) => {
    return multer({
      storage: storage,
    }).array(name);
  },
};
