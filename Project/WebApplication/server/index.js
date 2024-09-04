import app from "./app.js"
const PORT = 4000;

app.listen(PORT, (req, res)=>{
    console.log(`Laser Tag server is running at http://localhost:${PORT}`);
});