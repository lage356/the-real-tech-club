const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          attributes:['username'],
        },
      ],
    });
    
    // Serialize data so the template can read it
    const bloggers = blogs.map((project) => project.get({ plain: true }));
    

    res.render("homepage", {
      
      bloggers,
      logged_in: req.session.logged_in,
    
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// This route takes the user to signup and renders it 
router.get('/signup',async (req,res)=>{
  try {
    
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("signup");

  } catch (error) {
    res.status(500).json(error);
  }
})
// This sends the user to dashboard in order to view all actual posts and to create a new post
router.get('/dashboard',  async (req,res)=>{
  try {
    
    res.render("dashboard");

  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/post', withAuth, async (req,res)=>{
  try {
   
    res.render("post");

  } catch (error) {
    res.status(500).json(error);
  }
})


router.get('/blog/:id',async (req,res)=>{
  try {
    const blogs = await Blog.findByPk(req.params.id,{
      include: [
        {
          model:User,
          attributes: ['username'],
        },
      ],
    });
    const blogger = blogs.get({plain: true});
    console.log(blogger);

    res.render("blog",{
      blogger,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
