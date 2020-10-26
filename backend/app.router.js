const path = require('path');
const apiRoutes = require('./api');
const auth = require('./middleware/authorization');

// All routes used in application
const useRoutes = function (app) {
    app.use('/api/user', apiRoutes.userRoutes);
};

module.exports = {
    useRoutes: useRoutes
};