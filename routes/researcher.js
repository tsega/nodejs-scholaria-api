// Load Module Dependencies
var express = require('express');

var Researcher = require('../controllers/researcher');

// Create a router
var router = express.Router();

/**
 * @api {post} /researchers/  Create researcher
 * @apiName CreateResearcher
 * @apiGroup Researcher
 * @apiVersion 0.0.1
 *
 * @apiParam {String} first_name The first name of the researcher.
 * @apiParam {String} last_name The last name of the researcher.
 * @apiParam {String} institution The institution of the researcher.
 * @apiParam {String} orchidId The ORCHID ID of the researcher.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		first_name: 'James',
 * 		last_name: 'Bond',
 * 	    institution: 'Universal Exports',
 * 	    orchidID: 'MI6-007'
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the newly created researcher.
 * @apiParam {String} first_name The first name of the researcher.
 * @apiParam {String} last_name The last name of the researcher.
 * @apiParam {String} institution The institution of the researcher.
 * @apiParam {String} orchidId The ORCHID ID of the researcher.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 201 Created
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		first_name: 'James',
 * 		last_name: 'Bond',
 * 	    institution: 'Universal Exports',
 * 	    orchidID: 'MI6-007',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.post('/', Researcher.createResearcher);

/**
 * @api {get} /researchers/search Search researchers
 * @apiName GetResearchers
 * @apiGroup Researcher
 * @apiVersion 0.0.1
 *
 * @apiParam {String} [filter]   The filtering to select the researchers to return.
 * @apiParam {String} [fields]   The fields of the Researcher document to return.
 * @apiParam {String} [limit]    The maximum number of researchers to return.
 * @apiParam {String} [page]     The page number used to determine how many documents to skip.
 * @apiParam {String} [sort]     The sort field to use in ascending or descending order.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		 filter: {last_update:'2017-02-13T17:19:08.404Z'}
 * 		 limit: 50
 * 		 sort: -date_created
 * 		 fields:firstName,lastName,date_created,last_modified,
 * 	 }
 *
 * @apiSuccess {Object} options  The query options used in the search the researchers.
 * @apiSuccess {Object[]} researchers  The resulting set of documents.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 options: {
 * 			 filter: {last_update:'2017-02-13T17:19:08.404Z'},
 * 			 fields: 'firstName,lastName,date_created,last_modified',
 * 			 limit: 50,
 * 			 sort: -date_created,
 * 		 },
 * 		 researchers: [{
 * 		    first_name: 'James',
 * 		    last_name: 'Bond',
 * 	        institution: 'Universal Exports',
 * 	        orchidID: 'MI6-007',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }]
 * 	 }
 *
 */
router.get('/search', Researcher.searchResearchers);

/**
 * @api {get} /researchers/:researcherId Get researcher
 * @apiName GetResearcher
 * @apiGroup Researcher
 * @apiVersion 0.0.1
 *
 * @apiParam {String} researcherId The ID of the researcher to fetch.
 *
 * @apiSuccess {String} _id  The ID of the researcher.
 * @apiSuccess {String} first_name The first name of the researcher.
 * @apiSuccess {String} last_name The last name of the researcher.
 * @apiSuccess {String} institution The institution of the researcher.
 * @apiSuccess {String} orchidId The ORCHID ID of the researcher.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		first_name: 'James',
 * 		last_name: 'Bond',
 * 	    institution: 'Universal Exports',
 * 	    orchidID: 'MI6-007',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.get('/:researcherId', Researcher.getResearcher);

/**
 * @api {put} /researchers/:researcherId Update researcher
 * @apiName UpdateResearcher
 * @apiGroup Researcher
 * @apiVersion 0.0.1
 *
 * @apiParam {String} researcherId The ID of the researcher to update.
 * @apiParam {Object} document An object containing any the fields of the researcher to update.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		 document: {
 * 			first_name: 'Alpha',
 * 		    last_name: 'Blondy',
 * 	        institution: 'Rasta Coffee',
 * 	        orchidID: 'HIM-009',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the researcher.
 * @apiParam {String} first_name The first name of the researcher.
 * @apiParam {String} last_name The last name of the researcher.
 * @apiParam {String} institution The institution of the researcher.
 * @apiParam {String} orchidId The ORCHID ID of the researcher
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 	    first_name: 'Alpha',
 * 		last_name: 'Blondy',
 * 	    institution: 'Rasta Coffee',
 * 	    orchidID: 'HIM-009',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.put('/:researcherId', Researcher.updateResearcher);

/**
 * @api {delete} /researchers/:researcherId Delete researcher
 * @apiName DeleteResearcher
 * @apiGroup Researcher
 * @apiVersion 0.0.1
 *
 * @apiParam {String} researcherId The ID of the researcher to delete.
 *
 * @apiSuccess {String} _id  The ID of the researcher.
 * @apiSuccess {String} first_name The first name of the researcher.
 * @apiSuccess {String} last_name The last name of the researcher.
 * @apiSuccess {String} institution The institution of the researcher.
 * @apiSuccess {String} orchidId The ORCHID ID of the researcher.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
* 		first_name: 'James',
 * 		last_name: 'Bond',
 * 	    institution: 'Universal Exports',
 * 	    orchidID: 'MI6-007',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 */
router.delete('/:researcherId', Researcher.removeResearcher);

// Export the router
module.exports = router;