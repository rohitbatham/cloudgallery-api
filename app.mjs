import "./_config/envconfig.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import apiRoutes from "./api-routes.js";
const app = express();
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* Home Route for testing */
app.get('/', (req, res)=> { 
    res.send('API server is up.');
});

apiRoutes(app);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});