import express from 'express'
import bodyParser from 'body-parser';
import routes from './routes/user.routes.js';
import cors from 'cors'
import path from 'path'
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/bfhl", routes);
const PORT = process.env.PORT || 5000;
const __dirname=path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
