const User = require('../../models/user');
const Request = require('../../models/request_friend');


exports.sendRequest = async (userId, id) => {
    let request = await Request.create({
        from: userId,
        to: id,
        status: 1,
        createAt: new Date(),
    });

    return request;
}

exports.editSendRequest = async (id, status) => {
    let request = await Request.findByIdAndUpdate(id, 
        {
            status: status,
        });

    if(status == 'accept'){
        var user = await User.findOne(request.from)
        user.listfriends.push(request.to)
        user.save()
        
        var user2 = await User.findOne(request.to)
        user2.listfriends.push(request.from)
        user2.save()
    }    
    
    return request;
}

