const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',usersController.update_profile);

router.get('/sign-in',usersController.signIn);

router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);




// use passport as middle ware for authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);

module.exports = router;