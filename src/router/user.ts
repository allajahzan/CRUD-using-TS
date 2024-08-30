import { Router } from 'express'
import { getLandingPage, getUsersData, addUser, editUser, deleteUser } from '../controller/user'
import { validate } from '../validation/user'
import multer from 'multer'
const router = Router()

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const upload = multer({
  storage: storage,
});

// get landing page
router.get('/', getLandingPage)

// get users, add users, edit users, delete users
router.route('/users').get(getUsersData).post(upload.any(),validate, addUser).patch(upload.any(),validate, editUser).delete(deleteUser)

export default router