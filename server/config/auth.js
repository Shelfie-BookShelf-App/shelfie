const GitHubStrategy = require('passport-github2');
const { pool } = require('./database.js');

const dotenv = require('dotenv')

dotenv.config();
const callbackURL = process.env.CLIENT_URL
    ? `${process.env.CLIENT_URL}/auth/github/callback`
    : 'http://localhost:3001/auth/github/callback';

const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL,
};

// console.log(callbackURL)

const verify = async (accessToken, refreshToken, profile, done) => {
    const { _json: { id, name, login, avatar_url, email } } = profile;
    const userData = {
        githubId: id,
        username: login,
        avatarUrl: avatar_url,
        accessToken,
        email,
        name,
    }

    try {
        const results = await pool.query('SELECT * FROM users WHERE username = $1', [userData.username])
        const user = results.rows[0]

        if (!user) {
            const results = await pool.query(
                `INSERT INTO users (githubid, name, username, avatarurl, accesstoken, email)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *`,
                [userData.githubId, userData.name, userData.username, userData.avatarUrl, accessToken, userData.email]
            )

            const newUser = results.rows[0]
            return done(null, newUser)            
        }

        return done(null, user)

     }

    catch (error) {
        return done(error)
    }
}

const GitHub = new GitHubStrategy(options, verify);
module.exports = GitHub;