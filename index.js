// To connect with your mongoDB database
const mongoose = require('mongoose');

// For backend and express
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/',
    {
        dbName: 'Booking',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => (err ? console.log(err) :
        console.log('Connected to eehuu database')),
);

// Schema for hotel Booking
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    }
});

const UserCollection = mongoose.model('users', UserSchema);
UserCollection.createIndexes();

const CarSchema = new mongoose.Schema({
    carnumber: {
        type: String,
        required: true,
        unique: true,
    },
    carmodel: {
        type: String,
        required: true,
    },
    carseat: {
        type: Number,
        required: true,
    },
    carstatus: {
        type: String,
        required: true,
    }
});

const CarCollection = mongoose.model('cars', CarSchema);
CarCollection.createIndexes();

const BookSchema = new mongoose.Schema({
    bookuser: {
        type: String,
        required: true,
    },
    bookstart: {
        type: Date,
        required: true,
    },
    bookend: {
        type: Date,
        required: true,
    },
    bookcarmodel: {
        type: String,
        required: true,
    },
    bookcarnumber: {
        type: String,
        required: true,
    },
    bookstatus: {
        type: String,
        required: true,
    }
});

const BookCollection = mongoose.model('books', BookSchema);
BookCollection.createIndexes();

// Setting User details
app.post('/api/setuser', async (req, resp) => {
    try {
        const user = new UserCollection(req.body);
        let result = await user.save();
        console.log("result: ", result);

        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('User already register');
        }
    } catch (e) {
        resp.send('Something Went Wrong');
    }
});

// Getting User details
app.get('/api/getuser', async (req, resp) => {
    try {
        const details = await UserCollection.find({});
        resp.send(details);
    } catch (error) {
        console.log(error);
    }
});

// Setting Car details
app.post('/api/setcar', async (req, resp) => {
    try {
        const user = new CarCollection(req.body);
        let result = await user.save();
        console.log("result: ", result);

        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('User already register');
        }
    } catch (e) {
        console.log("e:", e);
        resp.send('Something Went Wrong');
    }
});

// Getting Car details
app.get('/api/getcar', async (req, resp) => {
    try {
        const details = await CarCollection.find({});
        resp.send(details);
    } catch (error) {
        console.log(error);
    }
});

// Setting Book details
app.post('/api/setbook', async (req, resp) => {
    try {
        const user = new BookCollection(req.body);
        console.log("user: ", user);
        let result = await user.save();
        console.log("result: ", result);

        result = result.toObject();
        console.log("resultobj: ", result);
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('User already register');
        }
    } catch (e) {
        resp.send('Something Went Wrong: ');
    }
});

// Getting Book details
app.get('/api/getbook', async (req, resp) => {
    try {
        const details = await BookCollection.find({});
        resp.send(details);
    } catch (error) {
        console.log(error);
    }
});

// Server setup
app.listen(5000, () => {
    console.log('App listen at port 5000');
});