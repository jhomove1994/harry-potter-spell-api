import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from './routes/route';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(route);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
