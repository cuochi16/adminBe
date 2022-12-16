const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./route/userRoute');
const orderRoute = require('./route/orderRoute');
const postRoute = require('./route/postRoute');
const commentRoutes = require('./route/commentRoutes');
const typeRoute = require('./route/typeRoute')
const supportRoute = require('./route/supportRoute');


const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

// routes
app.use('/user',userRoute);
app.use('/post',postRoute);
app.use('/order',orderRoute);
app.use('/support',supportRoute)
app.use("/comments",commentRoutes);
app.use("/types", typeRoute);
module.exports = app;