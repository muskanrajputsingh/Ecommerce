const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
require('./db/conection');

// Import JWT middleware function
// const authJwt = require('./helper/jwt');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(express.json());

// Use authJwt as middleware
// app.use(authJwt());

// Routes
const categoryRoutes = require('./routes/category');
const productRoute = require('./routes/product');
const subCatRoute = require('./routes/subCat');
const userRoute = require('./routes/User');
const cartRoute = require('./routes/cart');
const searchRoute = require('./routes/search')

app.get("/get", (req, res) => {
    res.json({ message: "Direct GET route on /get is working!" });
  });  

app.use('/api', categoryRoutes);
app.use('/api', productRoute);
app.use('/api', subCatRoute);
app.use('/api/user', userRoute);
app.use('/api/cart',cartRoute);
app.use('/api',searchRoute);

const PORT = process.env.PORT || 12000;
app.listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`);
});




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbnNpbmdoNzEwNUBnbWFpbC5jb20iLCJpZCI6IjY3ZGVjMTNkN2RhMjdhZTY5MGV
// jNGQ3ZCIsImlhdCI6MTc0MjY1MTcwOX0.W37eR0i9OJTejRx9hIDjyAC6iSZIDHqHDDPgsHhsu94
