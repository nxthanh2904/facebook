const Post = require('../../models/post');
const User = require('../../models/user');
const Search = require('../../models/search');

exports.searchPost = async (keyword) => {
    if (keyword === "") return {
        post: [],
        user: []
    };
    let post = await Post.find({ content: { $regex: keyword } }).populate("creator");
    let user = await User.find({ $or: [{ surName: { $regex: keyword } }, { firstName: { $regex: keyword } }] })
    // var listPost = []
    // if (post) {
    //     for (let i in post) {
    //         let str = post[i].content;
    //         console.log("strrrrrrr", str);
    //         // if (str.indexOf(keyword) !== -1) {
    //         //     listPost.push(post[i])
    //         // }
    //     }
    // }
    // let search = await Search.find({ creator: userId })
    // if (search.length) {
    //     search[0].data.push({
    //         keyword: keyword,
    //         createAt: new Date,
    //     })
    //     search[0].save()
    // } else {
    //     search = await Search.create({
    //         creator: userId,
    //         data: [{
    //             keyword: keyword,
    //             createAt: new Date,
    //         }]
    //     })
    // }
    return {
        post,
        user
    };
};
exports.searchPost2 = async (userId, keyword) => {
    let post = await Post.find();
    let user = await User.find();
    post.concat(user);
    console.log("====\n\n\n=======", post);
    var listPost = []
    if (post) {
        for (let i in post) {
            let str = post[i].described;
            if (str.indexOf(keyword) !== -1) {
                listPost.push(post[i])
            }
        }
    }
    let search = await Search.find({ creator: userId })
    if (search.length) {
        search[0].data.push({
            keyword: keyword,
            createAt: new Date,
        })
        search[0].save()
    } else {
        search = await Search.create({
            creator: userId,
            data: [{
                keyword: keyword,
                createAt: new Date,
            }]
        })
    }

    return listPost;
};


exports.getSearchPost = async (userId) => {
    let search = await Search.find({ creator: userId })

    return search;
};

exports.deleteSearch = async (userId, id) => {
    let findSearch = await Search.find({ creator: userId })
    let search = await Search.findByIdAndUpdate(findSearch[0]._id,
        {
            $pull:
            {
                data: {
                    _id: id
                }
            },
        })

    search = await Search.findOne({ creator: userId })

    return search;
};

exports.deleteAllSearch = async (userId) => {
    let findSearch = await Search.findOne({ creator: userId })
    findSearch.data = [];
    findSearch.save();
    return findSearch;
};