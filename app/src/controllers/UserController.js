import  bcrypt from 'bcrypt';
import sequelize from 'sequelize';
import { internalServerError } from '../helpers/errors.js';
import { User, Role } from '../models/index.js';

export const createUser = (req, res) => {
    var hash_password = bcrypt.hashSync(req.body.password, 10);
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash_password,
        document: req.body.document,
        birthdate: req.body.birthdate,
        phone_type: req.body.phone_type,
        phone: req.body.phone,
        addr_postal_code: req.body.addr_postal_code,
        addr_street: req.body.addr_street,
        addr_number: req.body.addr_number,
        addr_additional_info: req.body.addr_additional_info,
        neighbourhood: req.body.neighbourhood,
        city: req.body.city,
        state: req.body.state,
        enable_sms: req.body.enable_sms
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
        attributes: ['id', 'role_id', 'name', 'email', 'document']
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
        user.document = req.body.document || user.document;
        user.birthdate = req.body.birthdate || user.birthdate;
        user.phone_type = req.body.phone_type || user.phone_type;
        user.phone = req.body.phone || user.phone;
        user.addr_postal_code = req.body.addr_postal_code || user.addr_postal_code;
        user.addr_street = req.body.addr_street || user.addr_street;
        user.addr_number = req.body.addr_number || user.addr_number;
        user.addr_additional_info = req.body.addr_additional_info || user.addr_additional_info;
        user.neighbourhood = req.body.neighbourhood || user.neighbourhood;
        user.city = req.body.city || user.city;
        user.state = req.body.state || user.state;
        user.enable_sms = req.body.enable_sms || user.enable_sms
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

export const resetPassword = (req, res) => {
    res.status(200).send({
        success: true,
        message: "This isn't ready yet, don't get excited."
    })
}

export default createUser;