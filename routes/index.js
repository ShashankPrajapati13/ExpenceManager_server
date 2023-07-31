var express = require('express');
var router = express.Router();

const { Slashpage, CreateExpense, logOutUser, LoginUser, CreateUser, userExpenses, deleteExpense, editExpense, homePage, allExpenses } = require('../controller/indexController');
const { isAuthenticate } = require('../middleware/isAuthenticate');


/* GET / page. */
router.get('/', Slashpage);

router.post('/register',CreateUser);

router.post('/login',LoginUser)

router.get('/logout',logOutUser)


router.post('/createExpense', isAuthenticate ,CreateExpense)

router.get('/userAllexpense', isAuthenticate ,userExpenses)


router.get('/allexpense', isAuthenticate ,allExpenses)

router.get('/deleteExpense/:plc', isAuthenticate ,deleteExpense)

router.post('/editExpense/:plc', isAuthenticate ,editExpense)

router.get('/home', isAuthenticate , homePage);

router.get('/getuser',isAuthenticate, function(req,res,next){
    res.status(201).json({
        message:"user Found!",
        user:req.user,
})
})

module.exports = router;
