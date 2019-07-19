/**
 * @description validateEmail - Used to validate emails on the backend with the help of Regex.
 * @param {String} mail - The mail id to validate
 */
function validateEmail(mail) {
  if (/\b[a-zA-Z0-9\u00C0-\u017F._%+-]+@[a-zA-Z0-9\u00C0-\u017F.-]+\.[a-zA-Z]{2,}\b/.test(mail)) {
      return (true)
  } return (false)
}

module.exports = validateEmail