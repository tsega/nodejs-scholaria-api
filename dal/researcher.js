// Load Module Dependencies.
var moment = require('moment');

// Load DAL & related model
var Researcher = require('../models/researcher');
var Finding = require('../models/finding');

var population = [
    {path: 'subjects'},
    {path: 'findings'}
];

/**
 * create a new researcher.
 *
 * @desc  creates a new researcher and saves it in the database
 *
 * @param {Object}   researcherData  Data for the Researcher to create
 * @param {Function} cb     Callback for once saving is complete
 */
exports.create = function create(researcherData, cb) {
    // Create Researcher
    var researcherModel = new Researcher(researcherData);
    researcherModel.save(function saveResearcher(err, researcher) {
        if (err) {
            return cb(err);
        }

        cb(null, researcher);
    });
};

/**
 * remove a researcher
 *
 * @desc  delete data of the researcher with the given id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.remove = function remove(query, cb) {

    Researcher
        .findOne(query)
        .exec(function deleteResearcher(err, researcher) {
            if (err) {
                return cb(err);
            }
            if (!researcher) {
                return cb(null, {});
            }
            researcher.remove(function (err) {
                if (err) {
                    return cb(err);
                }

                // Remove researcher references from related findings
                Finding.update({
                        _id: {$in: researcher.findings}
                    }, {
                        $pull: {researchers: researcher._id}
                    }, {
                        multi: true
                    },
                    function(err){
                        if (err) {
                            return cb(err);
                        }

                        cb(null, researcher);
                    }
                );
            });
        });
};

/**
 * update a researcher
 *
 * @desc  update data of the researcher with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
    var now = moment().toISOString();
    updates.updated_date = now;
    Researcher
        .findOneAndUpdate(query, updates, {new: true}) // option to return the new document
        .populate(population)
        .exec(function updateResearcher(err, researcher) {
            if (err) {
                return cb(err);
            }
            cb(null, researcher || {});
        });
};

/**
 * get a researcher.
 *
 * @desc get a researcher with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
    Researcher
        .findOne(query)
        .populate(population)
        .exec(function (err, researcher) {
            if (err) {
                return cb(err);
            }
            cb(null, researcher || {});
        });
};

/**
 * search the collection of researchers
 *
 * @desc get a collection of researchers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.search = function search(options, cb) {
    Researcher.find(options.filter, options.fields)
        .populate(population)
        .sort(options.sort)
        .limit(options.limit)
        .skip(options.limit * (options.page - 1))
        .exec(function searchResearchers(err, researchers) {
            if (err) {
                return cb(err);
            }
            return cb(null, researchers);
        });
};