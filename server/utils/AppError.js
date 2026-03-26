class ApiError extends Error {
  constructor(statusCode = 500, message = "Something went wrong", errors = []) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.errors = errors
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError