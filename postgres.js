const Activities = require('pg').Activities

const activity = new Activity ({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/activities',
})

module.exports = activity;
