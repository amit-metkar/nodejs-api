const { getElapsedTimeInMs } = require(".");

module.exports = (req, message) => ({ 
    error: {
        message,
        code: 0
    }, 
    meta: {
        method: req.method,
        endpoint: req.originalUrl,
        responseTime: `${getElapsedTimeInMs(req.startHrTime)}ms`
    }
})