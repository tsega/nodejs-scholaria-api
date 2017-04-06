// Load Module Dependencies
var mongoose = require('mongoose');

// Define Subject schema
var SubjectSchema = mongoose.schema({
    name: {type: String},
    fieldOfStudy: {type: String},
    created_date: {type: Date},
    updated_date: {type: Date}
});

// Export Subject model
module.exports = mongoose.model('Subject', SubjectSchema);