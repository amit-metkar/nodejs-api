const { getElapsedTimeInMs } = require(".");

module.exports = (req, error) => ({ 
    error, 
    meta: {
        method: req.method,
        endpoint: req.originalUrl,
        responseTime: `${getElapsedTimeInMs(req.startHrTime)}ms`
    }
})