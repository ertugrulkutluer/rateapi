var router = require("express").Router();
const auth = require("../../middlewares/auth");

router.use("/", auth.authenticateToken, require("./user.route"));
router.use("/", auth.authenticateToken, require("./order.route"));

// Catch errors
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
