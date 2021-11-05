import  bcrypt from 'bcrypt';
import sequelize from 'sequelize';
import { internalServerError } from '../helpers/errors.js';
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
        return true;
    })
    .catch((err) => {
        if (err instanceof sequelize.UniqueConstraintError){
            res.status(412).send({
                message: "An user with that email address is already registered"
            })
            return false;
        }
        internalServerError(res);
    })
}

export const getUser = (req, res) => {
    var user = User.findOne({
        where: {
            id:  req.params.id,
            deleted_at: null
        },
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
        return true;
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(402).send({
                success: false,
                message: "User not found"
            })
            return false;
        }
        internalServerError(res)
        return false;
    })
}

export const getAll = (req, res, next) => {
    var user = User.findAll({
        where: {
            deleted_at: null
        },
        attributes:[
            'id',
            'role_id',
            'name',
            'email',
            'created_at',
            'updated_at'
        ]
    })
    .then((users) => {
        res.status(200).send({
            success: true,
            users
        })
        return true;
    })
    .catch((err) => {
        internalServerError(res);
        return false;
    })
}

export const updateUser = (req, res) => {
    var query = {
        where: {
            id: req.params.id,
            deleted_at: null
        }
    };
    var user = User.findOne({query, include: Role})
    .then((user) => {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.updated_at = new Date().toISOString();
        user.save().then((updatedUser) => {
            updatedUser.password = undefined;
            updatedUser.created_at = undefined;
            updatedUser.deleted_at = undefined;
            res.status(200).send({ success: true, user: updatedUser });
        }).catch((error) => {
            res.status(501).send({ success: true, message: "Failed to update user data" });
        })
    }).catch((err) => {
        if(err instanceof sequelize.EmptyResultError){
            res.status(402).send({
                success: false,
                message: "User not found"
            })
            return false;
        }
        internalServerError(res);
        return false;
    })
}

export const deleteUser = (req, res) => {
    var query = {
        where: {
            id: req.params.id,
            deleted_at: null
        }
    };
    var user = User.findOne({query})
    .then((user) => {
        user.deleted_at = new Date().toISOString();

        user.save().then((updatedUser) => {
            updatedUser.password = undefined;
            updatedUser.created_at = undefined;
            updatedUser.updated_at = undefined;

            res.status(200).send({ success: true, user: updatedUser });

        }).catch((error) => {
            res.status(501).send({ success: true, message: "Failed to update user data" });
        })
    }).catch((err) => {
        internalServerError(res);
        return false;
    })
}
export default createUser;