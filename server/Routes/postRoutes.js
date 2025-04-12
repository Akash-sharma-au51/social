const {createpost,deletepost,getAllPosts,updatepost,getpostbyid} = require('../controllers/postController')
const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/createpost', auth, createpost) //create new post
router.get('/getallposts', auth, getAllPosts) //get all post
router.get('/getpostbyid/:id', auth, getpostbyid) // get post by id
router.patch('/updatepost/:id', auth, updatepost) // update post
router.delete('/deletepost/:id', auth, deletepost) // delete posts

module.exports = router 
