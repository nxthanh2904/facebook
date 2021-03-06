const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../../models/user');
const Post = require('../../models/post');
const Notification = require('../../models/notification')
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
        email: data.email,
        password: data.password,
    }
    const checkValidate = await registerValidation(check);
    if (checkValidate.error) {
        return {
            error: "Validate Error",
            message: checkValidate.error
        }
    }
    const user = await User.findOne({ email: data.email });
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

    let splitter = data.birthday.split("-");
    let dateISO = new Date(splitter[2], splitter[1] - 1, splitter[0])

    let newUser = await User.create({
        code: text,
        firstName: data.firstName,
        surName: data.surName,
        password: hashPassword,
        birthday: dateISO,
        email: data.email,
        gender: data.gender,
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
    if (user) {
        if (data.code == user.code) {
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

    const user = await User.findOne({ email: data.email });
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
            firstName: user.firstName,
            surName: user.surName,
            token: token,
            avatar: user.avatar,
            listfriend: user.listfriend,
            gender: user.gender,
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

exports.logout = async (id, token) => {
    var user = await User.findById(id);
    var position = await user.token.indexOf(token);
    user.token.splice(position, 1);
    user.save();
    return user;
}

exports.changeInformation = async (
    id,
    data,
    avatar = undefined
) => {
    console.log('dddd', data);
    const { firstName, surName, birthday, gender } = data;
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
    // let splitter = birthday.split("-");
    // let dateISO = new Date(splitter[2], splitter[1] - 1, splitter[0])
    user.firstName = firstName;
    user.surName = surName;
    user.birthday = birthday;
    user.gender = gender ? gender : user.gender;

    await user.save();

    return user;
};

exports.changeAvatar = async (
    id,
    content,
    avatar = undefined
) => {

    let user = await User.findById(id)
    let deleteAvatar = "." + user.avatar;
    let post;
    if (avatar) {
        if (
            deleteAvatar !== "./upload/avatars/user.jpg" &&
            fs.existsSync(deleteAvatar)
        )
            fs.unlinkSync(deleteAvatar);
        user.avatar = avatar;
        post = await Post.create({
            creator: id,
            created: new Date(),
            content: content ? content : "M??nh thay ???nh ?????i di???n r???i n?? !!",
            status: "???? thay ?????i ???nh ?????i di???n",
            images: avatar
        })
    }
    await user.save();

    return { user, post };
};

exports.getProfile = async (id) => {
    let user = await User.findById(id)
        .select("-password -active -token")
        .populate([
            { path: "listfriends", select: "id active firstName surName avatar birthday gender createdAt" },
        ]);
    if (user === null) throw ["user_not_found"];

    return user;
};
exports.getUser = async (id) => {
    let user = await User.findById(id)
        .select("id active firstName surName avatar birthday listfriends  gender createdAt")
        .populate([
            { path: "listfriends", select: "id active firstName surName avatar birthday gender createdAt" },
        ]);
    if (user === null) throw ["user_not_found"];
    return user;
};


exports.getNotifications = async (id) => {
    let notification = await Notification.findOne({ creator: id })
        .populate({ path: "data.from", populate: "users", select: "firstName surName avatar" })
        .populate({ path: "data.post", populate: "posts", select: "" })

    return notification;
};