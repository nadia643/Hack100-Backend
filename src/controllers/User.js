const User = require('../models/User');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save()
    .then(() => {
      const sanitizedUser = user.sanitise();
      res.status(201).json(sanitizedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const EmailError = err.errors.email ? err.errors.email.message : null;
        res.status(400).json({
          errors: {
            email: EmailError,
          },
        });
      } else {
        res.sendStatus(500);
      }
    });
};

exports.find = (req, res) => {
    User.findById(req.params.userId, (err, userid) => {
        if(!userid) {
            res.status(404).json({ error:'The user could not be found.' });
        } else {
            res.status(200).json(userid);
        };
    });
}

