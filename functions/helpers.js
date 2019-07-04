const admin = require("firebase-admin");

module.exports = {
  resolvePromiseIfLastIteration: (i, errors, len, resolve, reject) => {
    if (i < (len - 1) && errors.length === 0) {
      resolve()
    } else if (i < (len - 1) && errors.length !== 0) {
      reject(errors)
    }
  }
}