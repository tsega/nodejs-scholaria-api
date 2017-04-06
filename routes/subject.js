// Load Module Dependencies
var express = require('express');

var Subject = require('../controllers/subject');

// Create a router
var router = express.Router();

/**
 * @api {post} /subjects/  Create subject
 * @apiName CreateSubject
 * @apiGroup Subject
 * @apiVersion 0.0.1
 *
 * @apiParam {String} name The name of the subject.
 * @apiParam {String} field_of_study The field of study of the subject.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		name: 'Toxicology',
 * 		field_of_study: 'Animal Science'
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the newly created subject.
 * @apiSuccess {String} name The name of the subject.
 * @apiSuccess {String} field_of_study The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 201 Created
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		name: 'Toxicology',
 * 		field_of_study: 'Animal Science',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.post('/', Subject.createSubject);

/**
 * @api {get} /subjects/search Search subjects
 * @apiName GetSubjects
 * @apiGroup Subject
 * @apiVersion 0.0.1
 *
 * @apiParam {String} [filter]   The filtering to select the subjects to return.
 * @apiParam {String} [fields]   The fields of the Subject document to return.
 * @apiParam {String} [limit]    The maximum number of subjects to return.
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
 * @apiSuccess {Object} options  The query options used in the search the subjects.
 * @apiSuccess {Object[]} subjects  The resulting set of documents.
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
 * 		 subjects: [{
 * 		    name: 'Toxicology',
 * 		    field_of_study: 'Animal Science',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }]
 * 	 }
 *
 */
router.get('/search', Subject.searchSubjects);

/**
 * @api {get} /subjects/:subjectId Get subject
 * @apiName GetSubject
 * @apiGroup Subject
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to fetch.
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} name The name of the subject.
 * @apiSuccess {String} field_of_study The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		name: 'Toxicology',
 * 		field_of_study: 'Animal Science',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.get('/:subjectId', Subject.getSubject);

/**
 * @api {put} /subjects/:subjectId Update subject
 * @apiName UpdateSubject
 * @apiGroup Subject
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to update.
 * @apiParam {Object} document An object containing any the fields of the subject to update.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		 document: {
 * 			name: 'Reproduction',
 * 		    field_of_study: 'Genetics',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} name The name of the subject.
 * @apiSuccess{String} field_of_study The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 	    name: 'Reproduction',
 * 		field_of_study: 'Genetics',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.put('/:subjectId', Subject.updateSubject);

/**
 * @api {delete} /subjects/:subjectId Delete subject
 * @apiName DeleteSubject
 * @apiGroup Subject
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to delete.
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} name The name of the subject.
 * @apiSuccess {String} field_of_study The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 	    name: 'Reproduction',
 * 		field_of_study: 'Genetics',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 */
router.delete('/:subjectId', Subject.removeSubject);

// Export the router
module.exports = router;