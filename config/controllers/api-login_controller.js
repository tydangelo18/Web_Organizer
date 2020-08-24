const user = require("../models/user.js");
const router = express.Router();


router.get("/users", function(req, res) {
    user.all(function(data) {
      const pugObject = {
        user: data
      };
    //   console.log(pugObject);
      res.render("index", pugObject);
    });
  });


  module.export = router;