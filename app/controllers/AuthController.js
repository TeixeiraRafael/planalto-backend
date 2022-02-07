import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { send } from 'process';
import sequelize from 'sequelize';
import { internalServerError } from '../helpers/errors.js';

import { User } from '../models/User.js';

const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        ignoreTLS: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

export const login = (req, res) => {
    const input_password = req.body.password;

    const user = User.findOne({where: {"email": req.body.email}})
        .then((user) => {
            if(user){
                const hashed = user.password;
                const valid = bcrypt.compareSync(input_password, hashed);
                
                if(valid) {
                    user.password = undefined;
                    user.salt = undefined;

                    const access_token = jwt.sign({ user_id: user.id }, process.env.AUTH_SECRET, {expiresIn: '1h'});
                    const refresh_token = jwt.sign({ user_id: user.id }, process.env.REFRESH_SECRET, {expiresIn: '1y'});

                    res.status(200).send({
                        success: true,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        user: user,
                    });

                }else{
                    res.status(401).send({
                        success: false,
                        message: "Wrong username or password."
                    });    
                }
            }else{
                res.status(401).send({
                    success: false,
                    message: "User does not exists!"
                });    
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(501).send({
                success: false,
                message: "Failed logging in!"
            });
        });

}

export const logout = (req, res) => {
    console.log("Logout called!");
    res.send({
        status: 200,
        message: "Logout route called!"
    });
};

export const refresh = (req, res) => {
    jwt.verify(
        req.body.refresh_token, 
        process.env.REFRESH_SECRET, 
        (err, decoded) => {
            if(err){
                res.status(401).send({
                    success: false,
                    error: "Failed to authenticate token."
                })
            }else{
                User.findOne({where: {id: decoded.user_id}})
                    .then((user) => {
                        const access_token = jwt.sign({ user_id: user.id }, process.env.AUTH_SECRET, {expiresIn: '1h'});
                        const refresh_token = jwt.sign({ user_id: user.id }, process.env.REFRESH_SECRET, {expiresIn: '1y'});
                        
                        res.status(200).send({
                            access_token: access_token,
                            refresh_token: refresh_token
                        });
                    }).catch((error) => {
                        console.log(error);
                        res.status(401).send({
                            success: false,
                            error: "Failed to authenticate the token."
                        })
                    });
            }
        }
    );
};

export const forgotPassword = (req, res) => {
    var query = {
        where: {
            "email": req.body.email,
            "deleted_at": null
        }
    }

    const user = User.findOne(query)
    .then((user) => {
        const refresh_password_token = jwt.sign({ user_id: user.id }, process.env.PASSWORD_RESET_SECRET, {expiresIn: '15m'});
        const url = "http://" + process.env.SERVER_HOST + ":" + process.env.PORT + "/resetPassword?token=" + refresh_password_token

        let mail = transporter.sendMail({
            from: '"Contato Planalto" <contato@planaltosoftware.tech>',
            to: user.email,
            subject: "Password Reset Request",
            text: "Hello, \n\nhere is the link to reset your password: " + url, 
            html: "Hello <br><br> here is the <a href=\""+ url +"\">link</a> to reset your password",
        }).then((info) => {
            res.status(200).send({
                success: true,
                message: "Reset password requested",
                info
            })
        }).catch((err) => {
            res.status(500).send({
                success: false,
                err
            })
        });
    })
    .catch((err) => {
        if(err instanceof sequelize.EmptyResultError) {
            res.satus(402).send({
                success: false,
                message: "The informed email is not registered."
            });
            return false;
        }
        internalServerError(res);
        return false;
    });
}

export default login;