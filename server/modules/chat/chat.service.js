const Chat = require('../../models/chat')


/**
 * 
 * @param {*} id user
 */
exports.getAllConversations = async (id) => {
    let conversations = await Chat.find({ listuser: id })
        .populate([
            { path: "listuser", select: "id active firstName surName avatar birthday" }
        ]).lean();

    for (let i in conversations) {
        const tmp = conversations[i].listuser;
        const guest = tmp.filter(y => y._id.toString() !== id);
        const name = guest.map(y => y.firstName).join(', ');
        conversations[i].name = name;
        conversations[i].guest = guest;
        conversations[i].userId = id;
    }
    return conversations;

}

exports.createConversation = async (data) =>{
    
    let conversation = await Chat.create({
        listuser: data.listuser,
    })
    

    return conversation;
}



