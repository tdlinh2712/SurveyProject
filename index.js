const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//routing in production
if(process.env.NODE_ENV=== 'production') {
    //express will serve up production assets like our main.js or main.css files
    app.use(express.static('client/build')); //if express doesnt recognize the route, try to look into client/build to see if there's anything that matches

    //express will serve up index.html file if it doesnt recognize the route
    //for if there is nothing in routes folder and client/build => give index.html
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

