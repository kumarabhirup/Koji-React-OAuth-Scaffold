/**
 * @description generateToken - This function is used to generate Ids and tokens.
 * @param {number} length  - Determine the length of the generated string
 * @param {object} options - { lower: Boolean } For allowing only lower-case letters in the string
 */
function generateToken(length, options = {}){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("")
    if (options.lower) {
      var a = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
    }
    var b = []
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0)
        b[i] = a[j]
    }
    return b.join("")
}

module.exports = generateToken