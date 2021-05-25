const searchService = require('./search.services');

exports.searchUser = async (req, res) => {
    try {
        let data = {
            keyword: req.query.keyword,
            page: req.query.page,
            limit: req.query.limit,
            type: req.query.type,
        }
        const users = await searchService.searchUser(data);

        res.status(200).json({
            success: true,
            messages: ['search_user_success'],
            content: users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['search_user_faile'],
            content: error
        });
    }
};

exports.searchPost = async (req, res) => {
    try {
        const post = await searchService.searchPost(req.body.keyword);

        res.status(200).json({
            success: true,
            messages: ['search_post_success'],
            content: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['search_post_faile'],
            content: error
        });
    }
};


exports.getSearchPost = async (req, res) => {
    try {
        const search = await searchService.getSearchPost(req.user._id);

        res.status(200).json({
            success: true,
            messages: ['get_search_post_success'],
            content: search
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['get_search_post_faile'],
            content: error
        });
    }
};

exports.deleteSearch = async (req, res) => {
    try {
        const search = await searchService.deleteSearch(req.user._id, req.params.id);

        res.status(200).json({
            success: true,
            messages: ['delete_search_post_success'],
            content: search
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['delete_search_post_faile'],
            content: error
        });
    }
};



exports.deleteAllSearch = async (req, res) => {
    try {
        const search = await searchService.deleteAllSearch(req.user._id);

        res.status(200).json({
            success: true,
            messages: ['delete_all_search_post_success'],
            content: search
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['delete_all_search_post_faile'],
            content: error
        });
    }
};