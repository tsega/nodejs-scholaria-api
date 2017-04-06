// Load Module Dependencies
var express = require('express');

var Finding = require('../controllers/subject');

// Create a router
var router = express.Router();

/**
 * @api {post} /subjects/  Create subject
 * @apiName CreateFinding
 * @apiGroup Finding
 * @apiVersion 0.0.1
 *
 * @apiParam {String} title The title of the subject.
 * @apiParam {String} abstract The field of study of the subject.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		title: 'The role of human H-Pilory virus in child toxicology.',
 * 		abstract: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with'
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the newly created subject.
 * @apiSuccess {String} title The title of the subject.
 * @apiSuccess {String} abstract The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 201 Created
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		title: 'The role of human H-Pilory virus in child toxicology.',
 * 		abstract: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.post('/', Finding.createFinding);

/**
 * @api {get} /subjects/search Search subjects
 * @apiName GetFindings
 * @apiGroup Finding
 * @apiVersion 0.0.1
 *
 * @apiParam {String} [filter]   The filtering to select the subjects to return.
 * @apiParam {String} [fields]   The fields of the Finding document to return.
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
 * 		    title: 'The role of human H-Pilory virus in child toxicology.',
 * 		    abstract: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }]
 * 	 }
 *
 */
router.get('/search', Finding.searchFindings);

/**
 * @api {get} /subjects/:subjectId Get subject
 * @apiName GetFinding
 * @apiGroup Finding
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to fetch.
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} title The title of the subject.
 * @apiSuccess {String} abstract The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		title: 'The role of human H-Pilory virus in child toxicology.',
 * 		abstract: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.get('/:subjectId', Finding.getFinding);

/**
 * @api {put} /subjects/:subjectId Update subject
 * @apiName UpdateFinding
 * @apiGroup Finding
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to update.
 * @apiParam {Object} document An object containing any the fields of the subject to update.
 *
 * @apiParamExample {json} Request-Example:
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 		 document: {
 * 			title: 'Male pattern baldness',
 * 		    abstract: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
 * 			date_created: 2017-02-13T17:19:08.404Z,
 * 			last_modified: 2017-02-13T17:19:08.404Z,
 * 		 }
 * 	 }
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} title The title of the subject.
 * @apiSuccess{String} abstract The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 	    title: 'Male pattern baldness',
 * 		abstract: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 *
 */
router.put('/:subjectId', Finding.updateFinding);

/**
 * @api {delete} /subjects/:subjectId Delete subject
 * @apiName DeleteFinding
 * @apiGroup Finding
 * @apiVersion 0.0.1
 *
 * @apiParam {String} subjectId The ID of the subject to delete.
 *
 * @apiSuccess {String} _id  The ID of the subject.
 * @apiSuccess {String} title The title of the subject.
 * @apiSuccess {String} abstract The field of study of the subject.
 * @apiSuccess {Date} date_created The date on which the comment entry was created.
 * @apiSuccess {Date} last_modified The date on which the comment entry was last updated.
 *
 * @apiSuccessExample {json} Success-Response:
 * 	 HTTP/1.1 200 OK
 * 	 {
 * 		 _id: '58a1ea8b36dfb71d975384af',
 * 	    title: 'Male pattern baldness',
 * 		abstract: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan',
 * 		date_created: 2017-02-13T17:19:08.404Z,
 * 		last_modified: 2017-02-13T17:19:08.404Z,
 * 	 }
 */
router.delete('/:subjectId', Finding.removeFinding);

// Export the router
module.exports = router;