const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const data = [
      {
        name: "Fernando"
      },
      {
        name: "Vinnie"
      },
    ]

    res.render('homepage', {
      data,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', (req, res)=> {
  res.render('about')
})

router.get('/login', (req,res)=> {
  res.render('login')
})

// router.get('/login', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;