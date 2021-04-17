const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../../models/user');
const Post = require('../../models/post');
const Notification =  require('../../models/notification')
const { registerValidation, loginValidation } = require('./validate');
const fs = require("fs");


/**
 *  API Register
 * @param {} data
 * @body data : phoneNumber, name, password, birth
 * 
 * Did validate, check username, email, create new user
 * 
 */

exports.register = async (data) => {
    let check = {
        phoneNumber: data.phoneNumber,
        password: data.password,
    }
    const checkValidate = await registerValidation(check);
    if (checkValidate.error) {
        return {
            error: "Validate Error",
            message: checkValidate.error
        }
    }
    const user = await User.findOne({ phoneNumber: data.phoneNumber });
    if (user) {
        return {
            message: "Phonenumber is exist. Please use other phonenumber",
            success: false,
        }
    }


    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    // create new user

    let newUser = await User.create({
        code: text,
        name: data.name,
        password: hashPassword,
        birth: data.birth,
        phoneNumber: data.phoneNumber,
        active: false,
    })

    return {
        newUser,
        success: true
    };
}

exports.getVerifyCode = async (phone) => {
    var user = await User.findOne({ phoneNumber: phone });
    return {
        success: true,
        code: user.code
    }
}

exports.checkVerifyCode = async (data) => {
    var user = await User.findOne({ phoneNumber: data.phoneNumber });
    if(user){
        if( data.code == user.code){
            const token = await jwt.sign({
                    _id: user._id,
                },
                process.env.TOKEN_SECRET
            );
            user.active = true;
            user.code = "";
            user.token.push(token);
            user.save()
            return {
                token: token,
                code: data.code,
                id: user._id,
                success: true,
                message: "Successful authentication"
            }
        } else {
            return {
                success: false,
                message: "Wrong code !!!"
            }
        }
    } else {
            return {
                succes: false,
                message: "Unregistered phone number"
            }
    }
}

exports.login = async (data) => {

    // check validate data
    const checkValidate = loginValidation(data);
    if (checkValidate.error) {
        return {
            status: 400,
            message: "validation error",
            error: checkValidate.error
        }
    }

    //check username, password

    const user = await User.findOne({ phoneNumber: data.phoneNumber });
    if (!user) {
        return {
            status: 404,
            message: "phone number or password is wrong"
        }
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (checkPassword) {
        const token = await jwt.sign({
            _id: user._id,
            },
            process.env.TOKEN_SECRET
        );

        user.token.push(token);
        user.save()

        let payload = {
            id: user._id,
            active: user.active,
            name: user.name,
            token: token,
            avatar: user.avatar,
        };

        return {
            payload: payload,
            success: true,
        }
    }
    else {
        return {
            status: 400,
            message: "password is wrong"
        }
    }

}

exports.logout = async(id, token) => {
    var user = await User.findById(id);
    var position = await user.token.indexOf(token);
    user.token.splice(position, 1);
    user.save();
    return user;
}

exports.changeInformation = async (
    id,
    name,
    avatar = undefined
) => {
    
    let user = await User.findById(id)

    let deleteAvatar = "." + user.avatar;
    user.name = name;
    if (avatar) {
        if (
            deleteAvatar !== "./upload/avatars/user.jpg" &&
            fs.existsSync(deleteAvatar)
        )
            fs.unlinkSync(deleteAvatar);
        user.avatar = avatar;
    }
    await user.save();

    return user;
};

exports.changeAvatar = async (
    id,
    described,
    avatar = undefined
) => {
    
    let user = await User.findById(id)
    let deleteAvatar = "." + user.avatar;
    if (avatar) {
        if (
            deleteAvatar !== "./upload/avatars/user.jpg" &&
            fs.existsSync(deleteAvatar)
        )
            fs.unlinkSync(deleteAvatar);
        user.avatar = avatar;
        let post = await Post.create({
            described: described,
            status: "Thay đổi ảnh đại diện",
            image: avatar,
            creator: id
        })
    }
    await user.save();

    return user;
};

exports.getProfile = async (id) => {
    let user = await User.findById(id)
                        .select("-password -active -token")

    if (user === null) throw ["user_not_found"];

    return user;
};

exports.getNotifications = async (id) => {
    let notification = await Notification.findOne({creator: id})
                        .populate({path: "data.from", populate: "users", select: "name avatar"})
                        .populate({path: "data.post", populate: "posts", select: ""})

    return notification;
};