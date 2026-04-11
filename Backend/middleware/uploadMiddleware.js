const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, "uploads/images");
        } else if (file.mimetype.startsWith("audio")) {
            cb(null, "uploads/audio");
        }
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
const bulkUpload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = {
    upload,bulkUpload
};