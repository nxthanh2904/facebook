const express = require('express');
const router = express.Router();
const searchController = require('./search.controller');
const { auth } = require('../../middleware/index');

router.post("/search-post", auth, searchController.searchPost)
router.get("/search-post", auth, searchController.getSearchPost)
router.patch("/search-post/:id", auth, searchController.deleteSearch)
router.patch("/delete-all-search", auth, searchController.deleteAllSearch )

module.exports = router;