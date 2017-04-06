// Load Module Dependencies
var events = require('events');

// Load Search Options library file
var searchOptions = require('../lib/search_options');

var moment = require('moment');

var ResearcherDal = require('../dal/researcher');

// Default fields to return on search if not provided
var defaultFields = ['name', 'fieldOfStudy', 'created_date', 'updated_date'];

/*
 * Create Researcher
 *
 *  1. Validate Data
 *  2. Create Researcher
 *  3. Respond
 */
exports.createResearcher = function createResearcher(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateData', function validateData() {
        // Validate Researcher data
        req.checkBody({
            first_name: {
                notEmpty: true,
                errorMessage: 'Invalid First Name'
            },
            last_name: {
                notEmpty: true,
                errorMessage: 'Invalid Last Name'
            },
            institution: {
                notEmpty: true,
                errorMessage: 'Invalid Institution'
            },
            orchid_id: {
                notEmpty: true,
                errorMessage: 'Invalid ORCHID ID'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit create Researcher event
            workflow.emit('createResearcher');
        }
    });

    workflow.on('createResearcher', function createResearcher() {
        ResearcherDal.create(req.body, function callback(err, researcher) {
            if (err) {
                return next(err);
            }

            // On Success emit create profile event
            workflow.emit('respond', researcher);
        });
    });

    workflow.on('respond', function respond(researcher) {
        res.status(201);
        res.json(researcher);
    });

    workflow.emit('validateData');
};

/*
 * Get Researcher
 *
 *  1. Validate Researcher Id
 *  2. Fetch Researcher form database
 *  3. Respond
 */
exports.getResearcher = function getResearcher(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateResearcherId', function validateResearcherId() {
        // Validate Researcher ID
        req.checkParams('researcherId', 'Researcher ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit fetch Researcher event
            workflow.emit('fetchResearcher', req.params.researcherId);
        }
    });

    workflow.on('fetchResearcher', function fetchResearcher(researcherId) {
        ResearcherDal.get({ _id: researcherId }, function (err, researcher) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', researcher);
        });
    });

    workflow.on('respond', function respond(researcher) {
        res.status(200);
        res.json(researcher);
    });

    workflow.emit('validateResearcherId');
};

/*
 * Search Researchers
 *
 *  1. Validate Search Query
 *  2. Fetch Researchers form database
 *  3. Respond
 */
exports.searchResearchers = function searchResearchers(req, res, next) {
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
            // On Success emit search Researchers event
            workflow.emit('searchResearchers');
        }
    });

    workflow.on('searchResearchers', function searchResearchers() {
        var opts = {
            filter: req.query.filter,
            fields: req.query.fields,
            sort: req.query.sort,
            limit: req.query.limit,
            page: req.query.page
        };

        ResearcherDal.search(opts, function (err, researchers) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', opts, researchers);
        });
    });

    workflow.on('respond', function respond(opts, researchers) {
        res.status(200);
        res.json({
            "options": opts,
            "result":  researchers
        });
    });

    workflow.emit('validateSearchQuery');
};

/*
 * Update Researcher
 *
 *  1. Validate Researcher Data
 *  2. Update Researcher in database
 *  3. Respond
 */
exports.updateResearcher = function updateResearcher(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateResearcherData', function validateResearcherData() {
        // Validate Researcher id
        req.checkParams('researcherId', 'Researcher ID Invalid!')
            .isObjectId();

        // Validate update document
        req.checkBody({
            first_name: {
                notEmpty: true,
                errorMessage: 'Invalid First Name'
            },
            last_name: {
                notEmpty: true,
                errorMessage: 'Invalid Last Name'
            },
            institution: {
                notEmpty: true,
                errorMessage: 'Invalid Institution'
            },
            orchid_id: {
                notEmpty: true,
                errorMessage: 'Invalid ORCHID ID'
            }
        });

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit update Researcher event
            workflow.emit('updateResearcher');
        }
    });

    workflow.on('updateResearcher', function updateResearcher() {

        ResearcherDal.update({ _id: req.params.researcherId }, req.body, function (err, researcher) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', researcher);
        });
    });

    workflow.on('respond', function respond(researcher) {
        res.status(200);
        res.json(researcher);
    });

    workflow.emit('validateResearcherData');
};

/*
 * Remove Researcher
 *
 *  1. Validate Researcher Id
 *  2. Remove Researcher form database
 *  3. Respond
 */
exports.removeResearcher = function removeResearcher(req, res, next) {
    var workflow = new events.EventEmitter();

    workflow.on('validateResearcherId', function validateResearcherId() {
        // Validate Researcher id
        req.checkParams('researcherId', 'Researcher ID Invalid!')
            .isObjectId();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
        } else {
            // On Success emit remove Researcher event
            workflow.emit('removeResearcher');
        }
    });

    workflow.on('removeResearcher', function removeResearcher() {
        ResearcherDal.remove({ _id: req.params.researcherId }, function (err, researcher) {
            if (err) {
                // handle error
                return next(err);
            }

            workflow.emit('respond', researcher);
        });
    });

    workflow.on('respond', function respond(researcher) {
        res.status(200);
        res.json(researcher);
    });

    workflow.emit('validateResearcherId');
};


// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        message: "To Implemented"
    });
};