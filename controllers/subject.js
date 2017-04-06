// Load Module Dependencies
var events = require('events');

// Load Search Options library file
var searchOptions = require('../lib/search_options');

var moment = require('moment');

var SubjectDal = require('../dal/Subject');

// Default fields to return on search if not provided
var defaultFields = ['name', 'field_of_study', 'created_date', 'updated_date'];

/*
 * Create Subject
 *
 *  1. Validate Data
 *  2. Create Subject
 *  3. Respond
 */
exports.createSubject = function createSubject(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateData', function validateData() {
        // Validate Subject data
        req.checkBody({
            name: {
                notEmpty: true,
                errorMessage: 'Invalid Name'
            },
            field_of_study: {
                notEmpty: true,
                errorMessage: 'Invalid Field of Study'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit create Subject event
            workflow.emit('createSubject');
        }
    });

    workflow.on('createSubject', function createSubject() {
        SubjectDal.create(req.body, function callback(err, subject) {
            if (err) {
                return next(err);
            }

            // On Success emit create profile event
            workflow.emit('respond', subject);
        });
    });

    workflow.on('respond', function respond(subject) {
        res.status(201);
        res.json(subject);
    });

    workflow.emit('validateData');
};

/*
 * Get Subject
 *
 *  1. Validate Subject Id
 *  2. Fetch Subject form database
 *  3. Respond
 */
exports.getSubject = function getSubject(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateSubjectId', function validateSubjectId() {
        // Validate Subject ID
        req.checkParams('subjectId', 'Subject ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit fetch Subject event
            workflow.emit('fetchSubject', req.params.subjectId);
        }
    });

    workflow.on('fetchSubject', function fetchSubject(subjectId) {
        SubjectDal.get({ _id: subjectId }, function (err, subject) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', subject);
        });
    });

    workflow.on('respond', function respond(subject) {
        res.status(200);
        res.json(subject);
    });

    workflow.emit('validateSubjectId');
};

/*
 * Search Subjects
 *
 *  1. Validate Search Query
 *  2. Fetch Subjects form database
 *  3. Respond
 */
exports.searchSubjects = function searchSubjects(req, res, next) {
    var workflow = new events.EventEmitter();

    // Set default search parameter options
    req.query.filter = searchOptions.getFilter(req);
    req.query.fields = searchOptions.getFields(req, defaultFields);
    req.query.page = searchOptions.getPage(req);
    req.query.limit = searchOptions.getLimit(req);
    req.query.sort = searchOptions.getSort(req);

    workflow.on('validateSearchQuery', function validateSearchQuery() {
        // Validate search parameters

        req.checkQuery('filter', 'Filter is empty!')
            .notEmpty();
        req.checkQuery('page', 'Page should be a number!')
            .isInt();
        req.checkQuery('limit', 'Limit should be a number!')
            .isInt();
        req.checkQuery('sort', 'Sort field is empty!')
            .notEmpty();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit search Subjects event
            workflow.emit('searchSubjects');
        }
    });

    workflow.on('searchSubjects', function searchSubjects() {
        var opts = {
            filter: req.query.filter,
            fields: req.query.fields,
            sort: req.query.sort,
            limit: req.query.limit,
            page: req.query.page
        };

        SubjectDal.search(opts, function (err, subjects) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', opts, subjects);
        });
    });

    workflow.on('respond', function respond(opts, subjects) {
        res.status(200);
        res.json({
            "options": opts,
            "result":  subjects
        });
    });

    workflow.emit('validateSearchQuery');
};

/*
 * Update Subject
 *
 *  1. Validate Subject Data
 *  2. Update Subject in database
 *  3. Respond
 */
exports.updateSubject = function updateSubject(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateSubjectData', function validateSubjectData() {
        // Validate Subject id
        req.checkParams('subjectId', 'Subject ID Invalid!')
            .isObjectId();

        // Validate update document
        req.checkBody({
            name: {
                optional: true,
                errorMessage: 'Invalid Name'
            },
            field_of_study: {
                optional: true,
                errorMessage: 'Invalid Field of Study'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit update Subject event
            workflow.emit('updateSubject');
        }
    });

    workflow.on('updateSubject', function updateSubject() {

        SubjectDal.update({ _id: req.params.subjectId }, req.body, function (err, subject) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', subject);
        });
    });

    workflow.on('respond', function respond(subject) {
        res.status(200);
        res.json(subject);
    });

    workflow.emit('validateSubjectData');
};

/*
 * Remove Subject
 *
 *  1. Validate Subject Id
 *  2. Remove Subject form database
 *  3. Respond
 */
exports.removeSubject = function removeSubject(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateSubjectId', function validateSubjectId() {
        // Validate Subject id
        req.checkParams('subjectId', 'Subject ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit remove Subject event
            workflow.emit('removeSubject');
        }
    });

    workflow.on('removeSubject', function removeSubject() {
        SubjectDal.remove({ _id: req.params.subjectId }, function (err, subject) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', subject);
        });
    });

    workflow.on('respond', function respond(subject) {
        res.status(200);
        res.json(subject);
    });

    workflow.emit('validateSubjectId');
};


// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        message: "To Implemented"
    });
};