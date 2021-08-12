const mongoose = require('mongoose');
const validator = require('validator'); //for validating emails and all....



require('./conn');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter valid email address");
            }
        },
        unique: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    }

})


const User = new mongoose.model('User', userSchema); //it will create a new model which will use the userSchema structure


const addToDB = async() => {
    const user1 = new User({
        name: "Jas",
        email: "jaskamal@exampleeree.com",
        age: 13
    });
    const user2 = new User({
        name: "Varun",
        email: "varun@exampleEmail.com",
        age: 10
    })
    try {
        // const res = await user1.save();  //for adding one document at a time
        const res = await User.insertMany([user1, user2]); //for addign multiple documents at once

        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

// addToDB();

const readData = async() => {
    try {
        const result = await User.find({ _id: "6113bbe346357f04db28ff16" }).select({ name: 1, _id: 0 });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// readData();


const updateData = async() => {

    try {
        const result = await User.updateOne({ _id: "6113bbe346357f04db28ff16" }, { $set: { age: 99 } }); //it will find the entry with the given id and set the given age
        console.log(result);
    } catch (err) {
        console.log(err);

    }

}

// updateData();


const deleteData = async() => {
    try {
        const result = await User.deleteMany({ _id: "6113bbe346357f04db28ff16" }) //it will delete the entry with the given ID
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

// deleteData();