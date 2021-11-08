import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import { User, Role } from '../models/index.js';

var notDeletedById = {
    where: {
        id: null,
        deleted_at: null
    },
    include: {
        model: Role
    }
};

const loggedIn = (req, res, next) => {
    var token = req.body.access_token || req.query.access_token
    if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decode) => {
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
    notDeletedById.where.id = req.user_id
    var user = User.findOne(notDeletedById)
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
        internalServerError(res);
        return false;
    });    
}

const managerUser = (req, res, next) => {
    notDeletedById.where.id = req.user_id
    var user = User.findOne(notDeletedById)
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
        internalServerError(res);
        return false;
    });  
}

const rootUser = (req, res, next) => {
    notDeletedById.where.id = req.user_id
    var user = User.findOne(notDeletedById)
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
        internalServerError(res);
        return false;
    });  
}

const selfOrRoot = (req, res, next) => {
    notDeletedById.where.id = req.user_id
    var user = User.findOne(notDeletedById)
    .then((user) => {
        var id = user.Role.id
        if(id == 3 || req.user_id == req.params.id || req.user_id == req.body.user_id){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        handleError(err, res);
        return false;
    });
}

const selfOrManager = (req, res, next) => {
    notDeletedById.where.id = req.user_id
    var user = User.findOne(notDeletedById)
    .then((user) => {
        var id = user.Role.id
        if(id== 3 || id == 2 || req.user_id == req.params.id){
            next();
            return true;
        }
        permissionError(res);
        return false;
    })
    .catch((err) => {
        handleError(err, res);
        return false;
    });
}

const handleError = (err, res) => {
    if( err instanceof sequelize.EmptyResultError){
        deletedUser(res);
        return false;
    }
    internalServerError(res);
    return false;
}
const permissionError = (res) => {
    res.status(403).send({
        success: false,
        message: "You do not have permission to perform such action"
    })
}

const deletedUser = (res) => {
    res.status(403).send({
        success: false,
        message: "The requesting user has been deleted"
    })
}

const internalServerError = (res) => {
    res.status(500).send({
        success: false,
        message: "Internal Server Error."
    })
}
export const acl = {
    loggedIn,
    basicUser,
    managerUser,
    rootUser,
    selfOrRoot,
    selfOrManager
}