const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const GitHub = require('./config/auth.js')

const authRoutes = require('./routes/auth.js')
const bookRoutes = require('./routes/book.js')
const langRoutes = require('./routes/languages.js')
const chatbotRoutes = require('./routes/chatbot.js')

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})