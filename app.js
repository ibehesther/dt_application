const express = require("express");
const cors = require('CORS');
const Router = require("./routes");

const app = express();
const PORT = 3001;

app.use(cors({
    origin: "*"
}));

app.use(Router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


