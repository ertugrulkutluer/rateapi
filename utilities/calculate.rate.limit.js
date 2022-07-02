module.exports.rateLimit = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if(decoded && decoded.init_time && decoded.token){
        
    }

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Auth failed",
    });
  }
};