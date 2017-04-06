// Load Module Dependencies.
var moment = require('moment');

// Load DAL & related models
var Subject = require('../models/subject');
var Researcher = require('../models/researcher');
var Finding = require('../models/finding');

var population = [
    {path: 'findings'},
    {path: 'researchers'}
];

/**
 * create a new subject.
 *
 * @desc  creates a new subject and saves it in the database
 *
 * @param {Object}   subjectData  Data for the Subject to create
 * @param {Function} cb     Callback for once saving is complete
 */
exports.create = function create(subjectData, cb) {
    // Create Subject
    var subjectModel = new Subject(subjectData);
    subjectModel.save(function saveSubject(err, subject) {
        if (err) {
            return cb(err);
        }

        cb(null, subject);
    });
};

/**
 * remove a subject
 *
 * @desc  delete data of the subject with the given id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.remove = function remove(query, cb) {

    Subject
        .findOne(query)
        .exec(function deleteSubject(err, subject) {
            if (err) {
                return cb(err);
            }
            if (!subject) {
                return cb(null, {});
            }
            subject.remove(function (err) {
                if (err) {
                    return cb(err);
                }

                // Remove researcher and findings references from related subjects
                Researcher.update({
                        _id: {$in: subject.subjects}
                    }, {
                        $pull: {subjects: subject._id}
                    }, {
                        multi: true
                    },
                    function(err){
                        if (err) {
                            return cb(err);
                        }

                        Finding.update({
                                _id: {$in: subject.findings}
                            }, {
                                $pull: {subjects: subject._id}
                            }, {
                                multi: true
                            },
                            function(err){
                                if (err) {
                                    return cb(err);
                                }

                                // Return removed subject
                                cb(null, subject);
                            }
                        );
                    }
                );
            });
        });
};

/**
 * update a subject
 *
 * @desc  update data of the subject with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
    var now = moment().toISOString();
    updates.updated_date = now;
    Subject
        .findOneAndUpdate(query, updates, {new: true}) // option to return the new document
        .populate(population)
        .exec(function updateSubject(err, subject) {
            if (err) {
                return cb(err);
            }
            cb(null, subject || {});
        });
};

/**
 * get a subject.
 *
 * @desc get a subject with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
    Subject
        .findOne(query)
        .populate(population)
        .exec(function (err, subject) {
            if (err) {
                return cb(err);
            }
            cb(null, subject || {});
        });
};