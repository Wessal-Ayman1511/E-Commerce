import path from "path";
import express from "express";
import multer from "multer";

const uploads_router = express.Router();
const __dirname = path.resolve();
const uploadPath = path.join("../Client/src/assets/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const image = `${file.fieldname}-${Date.now()}${extname}`
    cb(null, image);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

uploads_router.post("/uploads", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
    //const imagePath = req.file.path.replace(/\\/g, "/");
    const relativePath = '../../../assets/uploads/'
    const imageName = req.file.filename
    const imagePath = relativePath + imageName

      res.status(200).send({
        message: "Image uploaded successfully",
        image: `${imagePath}`,
        // ../../../assets/uploads/image-1739618816628.jpeg
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default uploads_router;