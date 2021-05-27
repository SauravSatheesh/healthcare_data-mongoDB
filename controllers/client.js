const mongoose = require("mongoose");
const Client = require("../models/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.loginClient = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const client = await Client.findOne({ username: username });
    if (client) {
       const login = await bcrypt.compare(password,client.password);
        if (login) {

            const token = jwt.sign({ id: client._id }, process.env.jwtSecret, { expiresIn: 3600 });
            res.status(200).json({
                token,
                client: {
                    id: client._id,
                    username: client.username
                }
            });

        }
        else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    }
    else {
        res.status(404).json({ message: "Invalid credentials" });
    }
}

exports.addClient = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2=req.body.password2;
    const client = await Client.findOne({ username: username });
    if (client) {
        res.status(409).json({ message: "Username already taken" });
    }
    else {
        if(password!==password2){
            return res.status(404).json({message:"Password does not match"})
        }
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');
        const newClient = new Client({
            username: username,
            password: hash
        });
        await newClient.save();
        const token = jwt.sign({ id: newClient._id }, process.env.jwtSecret, { expiresIn: 3600 });
        res.status(200).json({
            token,
            client: {
                id: newClient._id,
                username: newClient.username
            }
        });
    }
}


exports.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.client.id).select('-password');
        res.status(200).json({id:client._id,username:client.username});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}