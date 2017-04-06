// Load Module Dependencies

module.exports = {
    // HTTP PORT
    HTTP_PORT: process.env.HTTP_PORT || 8000,
    // Mongodb URL
    MONGODB_URL: 'mongodb://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@ds155080.mlab.com:55080/scholaria',
    // DEFAULT PAGE SIZE
    MAX_PAGE_SIZE: 100,
    // DEFAULT SORT FIELD
    DEFAULT_SORT: 'last_updated'
};