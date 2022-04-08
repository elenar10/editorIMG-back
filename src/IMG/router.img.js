import express from 'express';
import multer from 'multer';
import {setNewFavorite} from './controller.img.js';


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



router.route('/')
    .post(upload, setNewFavorite);


export default router;