const errorResponse = require("./errorResponse");

function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        return res.status(400).json(errorResponse(req, err));
    } else if (err === 'UnauthorizedError') {
        return res.status(401).json(errorResponse(req, 'user is not authenticated'));
    } else {
        return res.status(500).json(errorResponse(req, err.message));
    }
}

module.exports = errorHandler