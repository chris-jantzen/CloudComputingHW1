const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const File = require('./models/file')
const user = require('./models/user')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
  )
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
  } else {
    next()
  }
})

mongoose
  .connect('mongodb://localhost/hw1', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err.message))

app.post('/user/createUser', (req, res) => {
  const userInfo = req.body.user
  new User(userInfo).save((err, user) => {
    return err
      ? res.status(400).send({
          success: false,
          message: err.message,
        })
      : res.status(201).send({
          success: true,
          user,
        })
  })
})

app.post('/user/getUser', (req, res) => {
  User.find(req.body.searchProps, (err, user) => {
    return err
      ? res.status(400).send({
          success: false,
          message: 'Error Finding User',
        })
      : res.status(200).send({
          success: true,
          user: user[0],
        })
  })
})

app.post('/file/uploadFile', (req, res) => {
  const fileInfo = req.body.file
  new File(fileInfo).save((err, file) => {
    return err
      ? res.status(400).send({
          message: err.message,
          success: false,
        })
      : res.status(201).send({
          success: true,
          file,
        })
  })
})

app.put('/file/replaceFile', (req, res) => {
  const userId = req.body.userId
  const fileInfo = req.body.file
  File.findOneAndUpdate(userId, fileInfo, (err, file) => {
    return err
      ? res.status(400).send({
          message: err.message,
          success: false,
        })
      : res.status(204).send({
          file,
          success: true,
        })
  })
})

app.post('/file/getFile', (req, res) => {
  File.find({ userId: req.body.userId }, (err, file) => {
    if (!file)
      res.status(400).send({ success: false, message: 'No file found' })
    return err
      ? res.status(400).send({
          message: err.message,
          success: false,
        })
      : res.status(200).send({
          success: true,
          file: file[0],
        })
  })
})

const PORT = 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
