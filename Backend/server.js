import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import dotenv from 'dotenv';


connectDB()
app.listen(process.env.PORT, () => {
    console.log(`server is listening in port ${process.env.PORT}`);
});
