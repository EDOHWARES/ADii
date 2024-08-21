// Imports
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import commodityRouter from './routes/commodityRoute.js';
import emailRouter from './routes/emailRouter.js';
import adminRouter from './routes/adminRoute.js';
import restrictMobile from './middlewares/restrictMobileAccess.js';
import userRouter from './routes/userRoute.js';


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
app.use('/api/email', emailRouter);
app.use('/api/admin', restrictMobile,  adminRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API is WORKING...')
})


// Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

// mongodb+srv://edohemmanuel4real:ADii1234567890@cluster0.v1k9b.mongodb.net/?