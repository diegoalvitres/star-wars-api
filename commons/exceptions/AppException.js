/* eslint-disable default-param-last */

class AppException extends Error {
  constructor(
    code,
    message,
    exception
  ) {
    super();
    
    this.code = code;
    this.message = Array.isArray(message) ? message : [message];
    this.name = 'AppException';
    if (exception) {
      console.log(exception);
    }
  }

  throw(condition) {
    const appException = this;
    appException.message = appException.toString();
    if (typeof condition === 'undefined') {
      throw appException;
    }
    if (condition instanceof Function) {
      if (condition()) {
        throw appException;
      }
    }
    if (condition) {
      throw appException;
    }
  }

  toString() {
    return JSON.stringify({ statusCode: this.code, message: this.message });
  }
}

module.exports = AppException;
