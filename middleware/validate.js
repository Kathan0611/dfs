const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      req.flash("errorMessage", errorMessage);
      //   return res.status(422).json({message: errorMessage});
      return res.render("register", { message: errorMessage });


    }
    next();
  };
};

// exports.errorMessage=validateRequest.errorMessage;

module.exports = validateRequest;
