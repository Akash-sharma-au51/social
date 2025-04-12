const {registerUser,loginUser,logoutUser} = require('../controllers/usercontroller')
const {validationResult,body} = require('express-validator')
const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next()
}

// Validation rules
const registerValidation = [
    body('email').notEmpty().isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required')
]

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
]

router.post('/register', registerValidation, validate, registerUser)
router.post('/login', loginValidation, validate, loginUser)
router.post('/logout', auth, logoutUser)


module.exports = router