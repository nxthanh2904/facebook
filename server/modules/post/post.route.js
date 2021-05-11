const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const {auth, uploadFile } = require('../../middleware/index');


router.post("/add-post", auth, uploadFile([{name:'post', path:'/posts'}], 'array') , postController.addPost)
router.patch("/edit-post/:id", auth, uploadFile([{name:'post', path:'/posts'}], 'array') , postController.editPost)
router.delete("/delete-post/:id", postController.deletePost)
router.get("/get-post/:id", postController.getPost)
router.get("/get-list-post", auth, postController.getListPost)
router.get("/get-list-post-person/:id", postController.getListPostPerson)

router.post("/set-comment/:id", auth, postController.setComment)
router.get("/get-comment/:id", postController.getComment)

router.post("/like-post/:id", auth, postController.likePost)
router.post("/unlike-post/:id", auth, postController.unlikePost)

router.post("/report-post/:id", auth, postController.reportPost)

module.exports = router;