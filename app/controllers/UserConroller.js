import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';

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
        user.deleted_at = undefined;
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

export const getUser = (req, res) => {
    var user = User.findOne({
        id: req.user_id,
        include: {
            model: Role
        }
    })
    .then((user) => {
        user.password = undefined
        user.created_at = undefined
        user.updated_at = undefined

        res.status(200).send({
            success: true,
            user
        })
        return;
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    })
}
export default createUser;