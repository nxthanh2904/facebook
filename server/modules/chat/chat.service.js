const Chat = require('../../models/chat')


/**
 *
 * @param {*} id user
 */
exports.getAllConversations = async (id) => {
    console.log('id', id);
    let contv = await Chat.find({})

    let conversations = await Chat.find({ listuser: id })
        .populate([
            { path: "listuser", select: "id active firstName surName avatar birthday" },
            { path: "message.creator", select: "id active firstName surName avatar birthday" }
        ]).lean(); // chuyển giá trị trả về thành 1 plain object js


    // console.log('convert', contv);

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

exports.createConversation = async (data) => {
    let allChat = await Chat.find({ listuser: data.user });
    let dataList = data.listuser.map(e => String(e));
    let checkExistConversation = allChat.find(e => {
        let listuser = e.listuser.map(e => String(e));
        console.log('listuser.sort()', listuser.sort(), dataList.sort());
        return (
            listuser.length === dataList.length &&
            listuser.sort().every(function (value, index) { return value === dataList.sort()[index] })
        )
    })

    console.log('checkExistConversation', checkExistConversation);
    if (!checkExistConversation) {
        let conversation = await Chat.create({
            listuser: data.listuser,
        })
    }

    return this.getAllConversations(data.user);
}

exports.saveMessage = async (data) => {

    let conversation = await Chat.findById(data.roomId);
    const message = {
        creator: data.creator._id,
        content: data.message,
    };
    conversation.message.push(message);
    await conversation.save();
    //console.log('saveeeee', conversation);
    return conversation;
}


exports.getConversation = async (data) => {
    let conversation = await Chat.findById(data);
    return conversation;
}


