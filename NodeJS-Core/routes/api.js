require("express-router-group");
const express = require("express");
const middlewares = require("kernels/middlewares");
const { validate } = require("kernels/validations");
const exampleController = require("modules/examples/controllers/exampleController");
const roleController = require('../modules/roles/controllers/roleController');
const authController = require("modules/auth/controllers/authCotroller");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("kernels/middlewares/authMiddleware");
const postController = require("modules/post/controllers/postController");
const authValidation = require("modules/auth/validations/authValidation");
const postValidation = require("modules/post/validations/postValidation");
const middlewareAuth = require("middleware/auth_middleware");

const multer = require('multer');
const path = require('path');


// ===== EXAMPLE Request, make this commented =====
// router.group("/posts",middlewares([authenticated, role("owner")]),(router) => {
//   router.post("/create",validate([createPostRequest]),postsController.create);
//   router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//   router.delete("/delete/:postId", postsController.destroy);
// }
// );

router.group("/example", validate([]), (router) => {
  router.get('/', exampleController.exampleRequest)
})

router.get('/getrole', roleController.getRoles);
router.post('/login', validate([authValidation.login]), authController.login);
router.post('/register', validate([authValidation.register]), authController.register);
router.post('/refresh-token', authController.refreshTokenRequest);
router.post('/send-email', validate([authValidation.sendEmail]), authController.sendEmail);
router.post('/valid-otp', validate([authValidation.validOTP]), authController.validOTP);
router.post('/reset-password', validate([authValidation.resetPassword]), authController.resetPassword);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đặt thư mục đích để lưu trữ file upload
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Đặt tên file bao gồm tên gốc và thời gian hiện tại
  }
});

const upload = multer({ storage: storage }); // Khởi tạo Multer với cấu hình lưu trữ đã định nghĩa

// Đường dẫn để upload file
router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) { // Kiểm tra xem file có được upload hay không
    res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` }); // Trả về phản hồi JSON nếu upload thành công
  } else {
    res.status(400).json({ message: 'Không có file nào được upload.' }); // Trả về lỗi nếu không có file nào được upload
  }
});

router.group("/manager-post", middlewareAuth.authenticateToken, (router) => {
  router.post("/create-post", validate([postValidation.create]), postController.createPost);
  router.get('/getAll', validate([postValidation.getAllPostByLanguageId]), postController.getAllPostByLanguageId);
  router.get('/getpostbyid', validate([postValidation.getPostById]), postController.getPostbyId);
  router.put('/updatepost', validate([postValidation.updatePost]), postController.updatePost);
})

module.exports = router;
