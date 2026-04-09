function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Backend error";

  
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(val => val.message)
            .join(", ");
    }

    // Ensure statusCode is always a number (IMPORTANT FIX)
    statusCode = Number(statusCode) || 500;

    return res.status(statusCode).json({
        success: false,
        message
    });
}

module.exports = {
    errorHandler
};