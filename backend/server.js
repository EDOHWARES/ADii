// Imports
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import 'dotenv/config.js';
import commodityRouter from './routes/commodityRoute.js';


// Declarations
const app = express();
const port = 3003;

// Middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// Endpoints
app.use('/api/commodity', commodityRouter);

app.get('/', (req, res) => {
    res.send('API is WORKING...')
})


// Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

// mongodb+srv://edohemmanuel4real:ADii1234567890@cluster0.v1k9b.mongodb.net/?