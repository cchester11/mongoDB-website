const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connect the mongoose database (or create one if you havent made one)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongo-website', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Use this to log mongo queries being executed
mongoose.set('debug', true);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));