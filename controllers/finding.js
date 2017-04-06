// Load Module Dependencies
var events = require('events');

// Load Search Options library file
var searchOptions = require('../lib/search_options');

var moment = require('moment');

var FindingDal = require('../dal/Finding');

// Default fields to return on search if not provided
var defaultFields = ['title', 'abstract', 'created_date', 'updated_date'];

/*
 * Create Finding
 *
 *  1. Validate Data
 *  2. Create Finding
 *  3. Respond
 */
exports.createFinding = function createFinding(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateData', function validateData() {
        // Validate Finding data
        req.checkBody({
            title: {
                notEmpty: true,
                errorMessage: 'Invalid Title'
            },
            abstract: {
                notEmpty: true,
                errorMessage: 'Invalid Abstract'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit create Finding event
            workflow.emit('createFinding');
        }
    });

    workflow.on('createFinding', function createFinding() {
        FindingDal.create(req.body, function callback(err, finding) {
            if (err) {
                return next(err);
            }

            // On Success emit create profile event
            workflow.emit('respond', finding);
        });
    });

    workflow.on('respond', function respond(finding) {
        res.status(201);
        res.json(finding);
    });

    workflow.emit('validateData');
};

/*
 * Get Finding
 *
 *  1. Validate Finding Id
 *  2. Fetch Finding form database
 *  3. Respond
 */
exports.getFinding = function getFinding(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateFindingId', function validateFindingId() {
        // Validate Finding ID
        req.checkParams('findingId', 'Finding ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit fetch Finding event
            workflow.emit('fetchFinding', req.params.findingId);
        }
    });

    workflow.on('fetchFinding', function fetchFinding(findingId) {
        FindingDal.get({ _id: findingId }, function (err, finding) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', finding);
        });
    });

    workflow.on('respond', function respond(finding) {
        res.status(200);
        res.json(finding);
    });

    workflow.emit('validateFindingId');
};

/*
 * Search Findings
 *
 *  1. Validate Search Query
 *  2. Fetch Findings form database
 *  3. Respond
 */
exports.searchFindings = function searchFindings(req, res, next) {
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
            // On Success emit search Findings event
            workflow.emit('searchFindings');
        }
    });

    workflow.on('searchFindings', function searchFindings() {
        var opts = {
            filter: req.query.filter,
            fields: req.query.fields,
            sort: req.query.sort,
            limit: req.query.limit,
            page: req.query.page
        };

        FindingDal.search(opts, function (err, findings) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', opts, findings);
        });
    });

    workflow.on('respond', function respond(opts, findings) {
        res.status(200);
        res.json({
            "options": opts,
            "result":  findings
        });
    });

    workflow.emit('validateSearchQuery');
};

/*
 * Update Finding
 *
 *  1. Validate Finding Data
 *  2. Update Finding in database
 *  3. Respond
 */
exports.updateFinding = function updateFinding(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateFindingData', function validateFindingData() {
        // Validate Finding id
        req.checkParams('findingId', 'Finding ID Invalid!')
            .isObjectId();

        // Validate update document
        req.checkBody({
            title: {
                notEmpty: true,
                errorMessage: 'Invalid Title'
            },
            abstract: {
                notEmpty: true,
                errorMessage: 'Invalid Abstract'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit update Finding event
            workflow.emit('updateFinding');
        }
    });

    workflow.on('updateFinding', function updateFinding() {

        FindingDal.update({ _id: req.params.findingId }, req.body, function (err, finding) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', finding);
        });
    });

    workflow.on('respond', function respond(finding) {
        res.status(200);
        res.json(finding);
    });

    workflow.emit('validateFindingData');
};

/*
 * Remove Finding
 *
 *  1. Validate Finding Id
 *  2. Remove Finding form database
 *  3. Respond
 */
exports.removeFinding = function removeFinding(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateFindingId', function validateFindingId() {
        // Validate Finding id
        req.checkParams('findingId', 'Finding ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit remove Finding event
            workflow.emit('removeFinding');
        }
    });

    workflow.on('removeFinding', function removeFinding() {
        FindingDal.remove({ _id: req.params.findingId }, function (err, finding) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', finding);
        });
    });

    workflow.on('respond', function respond(finding) {
        res.status(200);
        res.json(finding);
    });

    workflow.emit('validateFindingId');
};


// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        message: "To Implemented"
    });
};