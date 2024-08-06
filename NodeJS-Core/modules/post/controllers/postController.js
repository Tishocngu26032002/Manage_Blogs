const responseUtils = require("utils/responseUtils");
const postService = require("../services/postService");

const postController = {
    createPost: async (req, res) => {
        let userid = req.body.userid;
        let posts = req.body.posts;
        let category = req.body.category;
        let status = req.body.status;
        try {
            let data = await postService.createPost(userid, category, status, posts);
            responseUtils.ok(res, data);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },
    getAllPostByLanguageId: async (req, res) => {
        console.log("đã vào getAll")
        try {
            let userId = req.query.userId;
            // let languageid = req.query.language_id;
            // console.log(userId, 'test getALL', languageid)
            let check = await postService.getAllPostByLanguageId(userId);
            responseUtils.ok(res, check);
        } catch (error) {
            responseUtils.error(res, error.message);
        }

    },

    getPostbyId: async (req, res) => {
        console.log("đã vào getPostbyId", req.query);
        try {
            let postid = req.query.id;
            console.log("id::::", postid)
            let check = await postService.getPostbyId(postid);
            responseUtils.ok(res, check);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },
    updatePost: async (req, res) => {
        let postId = req.body.postId;
        let posts = req.body.posts;
        let category = req.body.category;
        let status = req.body.status;
        try {
            let data = await postService.updatePost(postId, category, status, posts);
            responseUtils.ok(res, data);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },
    deletePost: (req, res) => {


    }
}

module.exports = postController;