import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './routers/products';
import usersRouter from './routers/users';
import { getProducts } from './controllers/productsController';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


// middleware 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));





// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running with TypeScript!');
  res.json('Backend is running with TypeScript!');
});

app.get('/api/products', getProducts);


app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use('/api/', productsRouter); 
app.use("/login", usersRouter);
app.use("/api/users", usersRouter);



// Start server


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
