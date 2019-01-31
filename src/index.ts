import app from './App'

const mongoose = require('mongoose')
const port = process.env.PORT || 3000
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error"))

db.once('open',function(){
  console.log("connected")
})
app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
