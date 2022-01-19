const db = require('../models');
const Object = db.object;

exports.showAll = (req, res) => {
    Object.find({}, (err, objects) => {
        if (err) {
            res.json(err);
        }
        res.json(objects);
    });
};

exports.show = (req, res) => {
    var id = req.params.id;
    Object.findOne(
        { _id: id },
        function (err, object) {
            if (err) return res.status(500).json({ message: err.message });
            if (!object) return res.status(404).json({ message: "Object not found" });
            return res.status(200).json({ object });
        }
    );

}

exports.create = (req, res) => {
    var object = new Object({
        title: req.body.title,
        description: req.body.description,
        lost: req.body.lost,
        type: req.body.type
        
    })
    object.save(function (err, object) {
        if (err) return res.status(500).json({ message: err.message });
        return res.status(200).json({ object });
    }
    );
};

exports.update = (req, res) => {
    var id = req.params.id;
    Object.findOne({ _id: id }, function (err, object) {
        if (err) return res.status(500).json({ message: err.message });
        if (!object) return res.status(404).json({ message: "Object not found" });
        object.title = req.body.title;
        object.description = req.body.description;
        object.save(function (err, object) {
            if (err) return res.status(500).json({ message: "Error update object" });
            return res.status(200).json({ object });
        });
    });
}

exports.delete = (req, res) => {
    var id = req.params.id;
    Object.findOneAndRemove({ _id: id }, function (err, object) {
        if (err) return res.status(500).json({ message: err.message });
        if (!object) return res.status(404).json({ message: "Object not found" });
        return res.status(200).json({ message: "object destroyed" });
    });
}