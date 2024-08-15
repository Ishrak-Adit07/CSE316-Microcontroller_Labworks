import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

import loginRouter from './routes/login.route.js';
app.use("/login", loginRouter);

app.use("/", async(req, res)=>{
    res.status(201).send("Default Response");
});

export default app;