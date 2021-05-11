
const Post = require('../../models/post');
const User = require('../../models/user');
const Notification = require('../../models/notification')
const fs = require("fs");

exports.addPost = async (id, data, files = undefined) => {
    let listfile = []
    if(files){
        for(let i in files){
            let file = files[i].substring(1)
            listfile.push(file)
        }
    }
    let post = await Post.create({
        creator: id,
        created: new Date(),
        described: data.described,
        status: data.status,
        image: listfile
    })

    return post;
};

exports.editPost = async (id, data, files = undefined) => {
    let post = await Post.findById({_id: id})
    post.described = data.described
    post.modified = new Date()
    if(files){
        if( post.image.length !== 0){
            for(let i in post.image){
                let image = "." + post.image[i]
                if (fs.existsSync(image)){
                    fs.unlinkSync(image)
                }
            } 
        }
  
        post.image = files
    }
    post.save();

    return post;
};

exports.deletePost = async (id) => {
    let post = await Post.findById({_id: id})
        if( post.image.length !== 0){
            for(let i in post.image){
                if (fs.existsSync(post.image[i])){
                    fs.unlinkSync(post.image[i])
                }
            } 
        }
  

    post = await Post.findByIdAndDelete({_id: id})

    return {
        success: true,
    };
};

exports.getPost = async (id) => {
    let post = await Post.findById({_id: id})

    return post
};

exports.getListPost = async (id) => {
    let user = await User.findOne({_id: id})
    var listpost = [];
    // if(user && user.listfriends.length){
    //     for(let i in user.listfriend){
    //         let post = await Post.find({creator: user.listfriends[i]})
    //         if(post.length){
    //             listpost.push(post[i])
    //         }
    //     }
    // }

    let post = await Post.find({})
                        .populate({path: "creator", populate: "users", select: "name avatar"})
    
    for(let i = 0 ; i< 10; i++){
        listpost.push(post[post.length - i])
    }

    return listpost;
};

exports.getListPostPerson = async (id) => {
    let post = await Post.find({creator: id})
                        .populate({path: "creator", populate: "users", select: "name avatar"})

    return post;
};

exports.setComment = async (id, userId, data) => {
    let post = await Post.findByIdAndUpdate(id, 
        { $push: { 
            comment: {
                creator: userId,
                described: data.described,
                createAt: new Date()
            }   
        },
    })
    let notification = await Notification.findOne({creator: post.creator})
    if(notification){
        notification.data.push({
            post: id,
            type: "Comment",
            from: userId,
            createAt: new Date()
        })

        notification.save()
    } else {
        notification = await Notification.create({
            creator: post.creator,
            data: [{
                post: id,
                type: "Comment",
                from: userId,
                createAt: new Date()
            }]
        })
    }

    post = await Post.findById({_id: id})
    return post
}

exports.getComment = async (id) => {
    let post = await Post.findById({_id: id})
                         .populate({path: "comment.creator", populate: "users", select: "name avatar"})
    let comment = post.comment
    return comment
}


exports.likePost = async (userId, id) => {
    let post = await Post.findByIdAndUpdate(id, 
        { $push: { 
            like: {
                creator: userId,
                createAt: new Date()
            }   
        },
    })

    let notification = await Notification.findOne({creator: post.creator})
    if(notification){
        notification.data.push({
            post: id,
            type: "Like",
            from: userId,
            createAt: new Date()
        }),
        notification.save()
    } else {
        notification = await Notification.create({
            creator: post.creator,
            data: [{
                post: id,
                type: "Like",
                from: userId,
                createAt: new Date()
            }]
        })
    }

    post = await Post.findById({_id: id})
    return post
}

exports.unlikePost = async (userId, id) => {
    let post = await Post.findByIdAndUpdate(id, 
        { $pull: 
            { 
                like: {
                    creator: userId
                }   
            },
        })

    post = await Post.findById({_id: id})
    return post
}

exports.reportPost = async (userId, id, description) => {
    let post = await Post.findByIdAndUpdate(id, 
        { $push: { 
            reported: {
                creator: userId,
                createAt: new Date(),
                description: description
            }   
        },
    })

    post = await Post.findById({_id: id})
    return post
}