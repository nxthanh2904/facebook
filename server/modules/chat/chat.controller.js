const ChatServices = require('./chat.service');

exports.getAllConversations = async (req, res) => {
  //  try {
        const conversations = await ChatServices.getAllConversations(req.user._id);
        res.status(200).json({
            success: true,
            messages: ['get_all_conversation_success'],
            content: conversations
        })
    // } catch (error) {
    //      res.status(400).json({
    //         success: false,
    //         messages: Array.isArray(error) ? error : ['change_user_information_faile'],
    //         content: error
    //     });
    // }
}

exports.createConversation = async (req, res) => {
  //  try {
        const conversations = await ChatServices.createConversation(req.body);
        res.status(200).json({
            success: true,
            messages: ['get_all_conversation_success'],
            content: conversations
        })
    // } catch (error) {
    //      res.status(400).json({
    //         success: false,
    //         messages: Array.isArray(error) ? error : ['change_user_information_faile'],
    //         content: error
    //     });
    // }
}