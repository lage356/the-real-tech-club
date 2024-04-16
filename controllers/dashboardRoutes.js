const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

// This sends the user to dashboard in order to view all actual posts and to create a new post
router.get("/", withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const bloggers = blogs.map((project) => project.get({ plain: true }));
    res.render("dashboard", {
      bloggers,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post", withAuth, async (req, res) => {
  try {
    res.render("post", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    res.render("post");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
