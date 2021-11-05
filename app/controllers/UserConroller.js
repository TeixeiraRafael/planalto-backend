import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const createUser = (req, res) => {
    var hash_password = bcrypt.hashSync(req.body.password, 10);
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash_password
    });

    newUser.save()
    .then((user) => {
        user.password = undefined;
        res.send(user);
    })
    .catch((err) => {
        if (err.name == "SequelizeUniqueConstraintError"){
            res.status(500).send({
                message: "An user with that email address is already registered"
            })
            return
        }
        res.status(500).send({
            err: err,
            message: err.message || "Failed to register User"
        })
    })
}

export default createUser;