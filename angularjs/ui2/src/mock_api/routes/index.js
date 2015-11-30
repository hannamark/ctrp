var _ = require('lodash');

module.exports = function(app) {
    var api = '/api';
    var data = [
        {"id": 1, "name": "David", "age": 30},
        {"id": 2, "name": "Thomas", "age": 23}
    ];

    app.get(api + '/person/:id', getPerson);
    app.get(api + '/persons', getPersons);

    function getPerson(req, res, next) {
        // var person = _.findWhere(data, {"id": req.params.id});
        var person = _.find(data, 'id', req.params.id);
        console.log('peson id received: ', req.params.id);
        res.send(person);
        next();
    }

    function getPersons(req, res, next) {
        res.send(data);
        next();
    }
};
