const {authJwt} = require("../middleware");
const controller = require("../controllers/object.controller");

module.exports = function (app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('object/all',controller.showAll);
    app.post('object/create',controller.create);
    app.put('object/update/:id',controller.update);
    app.delete('object/delete/:id',controller.delete);
    app.get('object/:id',controller.show);
}