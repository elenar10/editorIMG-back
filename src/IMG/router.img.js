import express from 'express';
import multer from 'multer';
import { deleteOneFavorite, getAllImagesByUser, setNewFavorite, getAllFavorites, getOneImageById } from './controller.img.js';



const router = express.Router();

const storage = multer.diskStorage({ 
    destination:'images/',   
    filename:(req, file, cb) =>{
        cb(null, file.originalname)
}})



const upload = multer({
    storage,
    dest: 'public/images/', 
    limits: {fileSize: 1000000} //  1MB
    }).single('imagen');



router.route("/")
  .get(getAllImagesByUser)
  .post(upload, setNewFavorite)
  .delete(deleteOneFavorite);

router.route('/edit/:id')
  .get(getOneImageById);

router.route("/all")
    .get(getAllFavorites);

export default router;