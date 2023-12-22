import bcrypt from 'bcrypt';
import { Users } from '../model/userModel.js';
import _ from 'lodash';

export const register = async (req, res, next) => {
    try {
        req.body.username = _.toLower(req.body.username);
        const { username, password, email } = req.body;
        const usernamecheck = await Users.findOne({ username });
        const emailcheck = await Users.findOne({ email });
        if (usernamecheck)
            return res.json({ msg: "Username already taken, Try another", status: false });
        if (emailcheck)
            return res.json({ msg: "Account with Email already exists, Try logging in or use diffrent Email address", status: false });
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await Users.create({
            username: username,
            email: email,
            password: hashedPass
        });

        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        req.body.username = _.toLower(req.body.username);
        const { username, password } = req.body;
            const user = await Users.findOne({$or: [ {'username':username },{'email':username}]});

        if (!user)
            return res.json({ msg: "User with this Email or Username does not exist", status: false });
        if(!user.password){
            return res.json({ msg: "Account registered using Google or Facebook,Try logging in with same method", status: false });
        }

        const IsPassValid = await bcrypt.compare(password, user.password);
        if (!IsPassValid)
            return res.json({ msg: "Incorect Password", status: false });

        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
}

export const setavatar = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await Users.findByIdAndUpdate(id, {
            IsAvatarImageSet: true,
            AvatarImage: req.body.image
        }, { new: true });

        return res.json({ isSet: user.IsAvatarImageSet, setimage: user.AvatarImage });

    } catch (error) {
        next(error);
    }
}

export const getallusers = async (req, res, next) => {
    try {
        const id = req.params.id;
        const users = await Users.find({ _id: { $ne: id } }).select(
            [
                "username",
                "IsAvatarImageSet",
                "AvatarImage",
                "_id"
            ]
        );
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export const googlelogin = async (req, res, next) => {
    try {

        var { username, email, buffer } = req.body;
        const emailcheck = await Users.findOne({ email });

        if (emailcheck && emailcheck.password)
            return res.json({ msg: "Account with Email already exists, Try logging in with password or use diffrent Email address", status: false });
        else if(emailcheck){
            return res.json({ status: true, user:emailcheck });
        }
        username = username + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

        while (await Users.findOne({ username })) {
            username = username + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        }

        const user = await Users.create({
            username: username,
            email: email,
            profilePic: buffer
        });
        return res.json({ status: true, user });

    } catch (error) {
        next(error)
    }
}

export const fblogin = async (req,res,next) => {
    try {
        var { username, email, buffer } = req.body;
        const emailcheck = await Users.findOne({ email });

        if (emailcheck && emailcheck.password)
            return res.json({ msg: "Account with Email already exists, Try logging in with password or use diffrent Email address", status: false });
        else if(emailcheck){
            return res.json({ status: true, user:emailcheck });
        }

        username = username + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

        while (await Users.findOne({ username })) {
            username = username + (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        }

        const user = await Users.create({
            username: username,
            email: email,
            profilePic: buffer
        });
        return res.json({ status: true, user });
        
    } catch (error) {
        next(error);
    }
}