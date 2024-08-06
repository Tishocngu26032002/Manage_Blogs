const { BodyWithLocale, QueryWithLocale } = require("kernels/rules");

const postValidation = {
    create: [
        new BodyWithLocale('userid').notEmpty(),
        new BodyWithLocale('posts').notEmpty()
        //other rules goes here
    ],

    getAllPostByLanguageId: [
        new QueryWithLocale('userId').notEmpty()
    ],

    getPostById: [
        new QueryWithLocale('id').notEmpty()
    ],

    updatePost: [
        new BodyWithLocale('postId').notEmpty(),
        new BodyWithLocale('category').notEmpty(),
        new BodyWithLocale('status').notEmpty(),
        new BodyWithLocale('posts').notEmpty()
    ]

}

module.exports = postValidation