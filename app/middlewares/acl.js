import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';

const loggedIn = (req, res, next) => {
    if (req.body.access_token) {
        jwt.verify(req.body.access_token, process.env.AUTH_SECRET, (err, decode) => {
            if(err){
                req.user = undefined;
                console.error(err)
                return res.status(401).send({
                    message: err.message || "Authentication required"
                });    
            }
            req.user_id = decode.user_id;
            next();
        });
    }else{
        res.status(401).send({
            message: "Missing authorization token"
        });
    }
}

const basicUser = (req, res, next) =>{
    var user = User.findOne({
        id: req.user_id,
        include: {
            model: Role
        }
    })
    .then((user) => {
        var id = user.Role.id
        if(id == 1 || id == 2 || id == 3){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        console.error(err);
    });    
}

const managerUser = (req, res, next) => {
    var user = User.findOne({
        id: req.user_id,
        include: {
            model: Role
        }
    })
    .then((user) => {
        var id = user.Role.id
        if(id == 2 || id == 3){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        console.error(err);
    });  
}

const rootUser = (req, res, next) => {
    var user = User.findOne({
        id: req.user_id,
        include: {
            model: Role
        }
    })
    .then((user) => {
        var id = user.Role.id
        if(id == 3){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        console.error(err);
    });  
}

const permissionError = (res) => {
    res.status(401).send({
        success: false,
        message: "You do not have permission to perform such action"
    })
}

const validateRequiredLevel = (req, res, next, level) => {
    var user = User.findOne({
        id: req.user_id,
        include: {
            model: Role
        }
    })
    .then((user) => {
        if(user.Role.id == level){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        console.error(err);
    });
}

export const acl = {
    loggedIn,
    basicUser,
    managerUser,
    rootUser
}