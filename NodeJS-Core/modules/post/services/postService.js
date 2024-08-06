const db = require("models/index");

function slugFunction(title) {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}

const postService = {
    createPost: async (userid, category, status, posts) => {
        let post;
        post = await db.post.create({ status: status, deleted: "false", user_id: userid });
        await db.post_category.create({
            category_id: category,
            post_id: post.id
        });

        const createContent = posts.forEach(async item => {
            if (item) {
                let postid = post.id;
                let postSlug = slugFunction(item.title);
                let check = await db.contentpost.create({ title: item.title, content: item.content, language_id: item.languageid, original_post_id: postid, slug: postSlug });
            }
        });
        return post;
    },

    getAllPostByLanguageId: async (userId) => {
        // get list post_id
        let listPost = await db.post.findAll({
            where: { user_id: userId, deleted: false },
            include: [
                {
                    model: db.contentpost,
                    attributes: ['id', 'title', 'content'],
                },
                {
                    model: db.post_category,
                    attributes: ['category_id'],
                    include: {
                        model: db.category,
                        attributes: ['title']
                    }
                }
            ]
        });
        return listPost;
    },

    getPostbyId: async (postid) => {
        if (!postid) return null;

        try {
            let post = await db.post.findOne({
                where: { id: postid },
                include: [
                    {
                        model: db.contentpost,
                        attributes: ['id', 'title', 'content', 'language_id'],
                        include: {
                            model: db.language,
                            attributes: ['code']
                        }
                    },
                    {
                        model: db.post_category,
                        attributes: ['category_id'],
                        include: {
                            model: db.category,
                            attributes: ['title']
                        }
                    }

                ]
            });
            return post;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    updatePost: async (postId, category, status, posts) => {
        const transaction = await db.sequelize.transaction();
        try {
            // Cập nhật bảng post
            // console.log("data", postId, category, status, posts)
            const updatePost = await db.post.update(
                { status: status },
                {
                    where: { id: postId },
                    transaction
                }
            );
            console.log("posts::", updatePost)

            // Cập nhật bảng post_category
            const updatePostCategory = await db.post_category.update({
                category_id: category
            },
                {
                    where: {
                        post_id: postId
                    },
                    transaction
                }
            );

            console.log("postcategory::", updatePostCategory)

            console.log("first", posts[0].title, "aaaaaaaaaaaaaaaaa", posts[0].content)

            // Cập nhật bảng contentpost cho ngôn ngữ Vietnamese (language_id: 1)
            const updateContentPost1 = await db.contentpost.update(
                { title: posts[0].title, content: posts[0].content },
                {
                    where: { original_post_id: postId, language_id: 1 },
                    transaction
                }
            );

            console.log("contentpost1::", updateContentPost1)

            // Cập nhật bảng contentpost cho ngôn ngữ English (language_id: 2)
            const updateContentPost2 = await db.contentpost.update(
                { title: posts[1].title, content: posts[1].content },
                {
                    where: { original_post_id: postId, language_id: 2 },
                    transaction
                }
            );

            console.log("firstContentPost2", updateContentPost2)

            // Cập nhật bảng contentpost cho ngôn ngữ khác (language_id: 3)
            const updateContentPost3 = await db.contentpost.update(
                { title: posts[2].title, content: posts[2].content },
                {
                    where: { original_post_id: postId, language_id: 3 },
                    transaction
                }
            );

            console.log("updateContentPost3", updateContentPost3)
            // Commit transaction nếu tất cả các thao tác thành công
            await transaction.commit();
            return { success: true, message: 'Post updated successfully' };
        } catch (error) {
            // Rollback transaction nếu có lỗi xảy ra
            await transaction.rollback();
            throw error; // Quăng lỗi để xử lý ở tầng trên (nếu cần)
        }
    },
    deletePost: async (postid, userid) => {
        if (!postid || !userid) return -1;

        try {
            let result = await db.post.update(
                { deleted: "true" },
                {
                    where: { id: postid, userid: userid }
                }
            );

            if (result[0] > 0) return 1; // Kiểm tra nếu có ít nhất một dòng bị thay đổi
            return 0;
        } catch (err) {
            console.error(err);
            return -1;
        }
    },

}

module.exports = postService;