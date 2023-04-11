module.exports.verifyAuth = (req, res, next) => {
  const temp = req.signedCookies;
  if (req.cookies.user) {
    next();
  } else {
    console.log("cookie not found");
  }
};

/*********** ADMIN API **************/
module.exports.verifyAdmin = (req, res, next) => {
  const temp = req.signedCookies;
  if (req.cookies.role === "admin") {
    next();
  } else {
    console.log("cookie not found");
  }
};
