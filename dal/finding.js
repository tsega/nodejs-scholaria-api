// Load Module Dependencies.
var moment = require('moment');

// Load DAL & related models
var Finding = require('../models/finding');
var Researcher = require('../models/researcher');

var population = [
    {path: 'subjects'},
    {path: 'researchers'}
];

/**
 * create a new finding.
 *
 * @desc  creates a new finding and saves it in the database
 *
 * @param {Object}   findingData  Data for the Finding to create
 * @param {Function} cb     Callback for once saving is complete
 */
exports.create = function create(findingData, cb) {
    // Create Finding
    var findingModel = new Finding(findingData);
    findingModel.save(function saveFinding(err, finding) {
        if (err) {
            return cb(err);
        }

        cb(null, finding);
    });
};

/**
 * remove a finding
 *
 * @desc  delete data of the finding with the given id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.remove = function remove(query, cb) {

    Finding
        .findOne(query)
        .exec(function deleteFinding(err, finding) {
            if (err) {
                return cb(err);
            }
            if (!finding) {
                return cb(null, {});
            }
            finding.remove(function (err) {
                if (err) {
                    return cb(err);
                }

                // Remove finding references from related findings
                Researcher.update({
                        _id: {$in: finding.findings}
                    }, {
                        $pull: {findings: finding._id}
                    }, {
                        multi: true
                    },
                    function(err){
                        if (err) {
                            return cb(err);
                        }

                        cb(null, finding);
                    }
                );
            });
        });
};

/**
 * update a finding
 *
 * @desc  update data of the finding with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
    var now = moment().toISOString();
    updates.updated_date = now;
    Finding
        .findOneAndUpdate(query, updates, {new: true}) // option to return the new document
        .populate(population)
        .exec(function updateFinding(err, finding) {
            if (err) {
                return cb(err);
            }
            cb(null, finding || {});
        });
};

/**
 * get a finding.
 *
 * @desc get a finding with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
    Finding
        .findOne(query)
        .populate(population)
        .exec(function (err, finding) {
            if (err) {
                return cb(err);
            }
            cb(null, finding || {});
        });
};

/**
 * search the collection of findings
 *
 * @desc get a collection of findings from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.search = function search(options, cb) {
    Finding.find(options.filter, options.fields)
        .populate(population)
        .sort(options.sort)
        .limit(options.limit)
        .skip(options.limit * (options.page - 1))
        .exec(function searchFindings(err, findings) {
            if (err) {
                return cb(err);
            }
            return cb(null, findings);
        });
};