const { getElapsedTimeInMs } = require(".");

module.exports = (req, data) => ({ 
    data, 
    meta: {
        method: req.method,
        endpoint: req.originalUrl,
        responseTime: `${getElapsedTimeInMs(req.startHrTime)}ms`
    }
})