import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

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
            res.staus(501).send({
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

export default login;