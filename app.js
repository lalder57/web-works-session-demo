import express from "express"
import nunjucks from "nunjucks"
import session from "express-session"

const PORT = 8888;

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'some random string',
  })
);


nunjucks.configure("views", {
  autoescape: true,
  express: app,
})


app.get("/", (req, res) => {
  res.render("index.html");
});

// displays the login page when link is clicked
app.get("/login", (req, res) => {
  // if req.session.username exists, then this client has
  // previously "logged in" and take them to the dashboard. Else,
  // take them to the login page
  if (req.session.username) {
    res.render("dashboard.html", {
      username: req.session.username,
    })
  } else {
      res.render("login.html");
    }
});

// handles the login submit and takes the user to the dashboard.html
app.post("/login", (req, res) => {
  req.session.username = req.body.username;

  res.render("dashboard.html", {
    username: req.session.username,
  });
});

// redirects the user to the homepage once the session is "destroyed"
app.get("/logout", (req, res) => {
  // Destroy the session and navigate back home
  req.session.destroy();

  res.redirect("/");
});








app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));



