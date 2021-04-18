const friendsService = require('./friends.services');



exports.sendRequest = async (req, res) => {
    try {
        const sendRequest = await friendsController.sendRequest(req.user._id, req.body.id);
        
        res.status(200).json({
            success: true,
            messages: ['send_request_success'],
            content: sendRequest
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['send_request_faile'],
            content: error
        });
    }
};

exports.editSendRequest = async (req, res) => {
    try {
        const sendRequest = await friendsController.editSendRequest(req.params.id, req.body.status);
        
        res.status(200).json({
            success: true,
            messages: ['edit_send_request_success'],
            content: sendRequest
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['edit_send_request_faile'],
            content: error
        });
    }
};

