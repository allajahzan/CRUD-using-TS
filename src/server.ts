import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './router/user'
import path from 'path'
// import morgan from 'morgan'

const app = express()
dotenv.config()

// mongo db connection
mongoose.connect(process.env.mongoDB_url as string)
   .then(() => {
      console.log("Connected to DB")
   })
   .catch((err) => {
      console.log(err)
   })

app.set('view engine', 'ejs');
app.set('views', [
   path.join(__dirname, 'views/admin')
]);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('src/public'))


// User routes
app.use('/', userRoute)

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});