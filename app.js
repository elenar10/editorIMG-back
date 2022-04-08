import express from 'express';
import dotenv from 'dotenv';
import favoritesRouter from './src/IMG/router.img.js';



dotenv.config(); 


const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

app.use('/public', express.static('images'));

app.use('/favorites', favoritesRouter);

const MY_PORT = process.env.PORT;

app.listen(MY_PORT, ()=> console.log('servidor levantado en el puerto: '));