const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const GitHub = require('./config/auth.js')
const dotenv = require('dotenv')
const path = require('path')

const authRoutes = require('./routes/auth.js')
const bookRoutes = require('./routes/book.js')
const langRoutes = require('./routes/languages.js')
const chatbotRoutes = require('./routes/chatbot.js')

dotenv.config();


const PORT = process.env.PORT || 3001

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.get('/', (req, res) => {
  res.status(200).send('Shelfie API')
})

app.use('/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/languages', langRoutes)
app.use('/chatbot', chatbotRoutes)

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) =>
      res.sendFile(path.resolve('public', 'index.html'))
  )
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})