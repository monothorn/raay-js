var jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    alogrithm = 'AES-256-CBC',
    salt = '248ca64cfe8898c9176b6615c7941de414bb4e98',
    iv = 1234123412341234,
    bitwiseDisjunction = 0,
    jwtPassKey = 'somekey',
    tokenValidity = 180, // in minutes
    refreshTokenValidity = 200; // in minutes

function getEncryptedToken(data) {
    var jwtData = jwt.sign(data, salt, {
        expiresIn: tokenValidity * 60
    });
    if (jwtData) {
        var cipher = crypto.createCipher(alogrithm, jwtPassKey);
        var crypted = cipher.update(jwtData, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    return '';
}

function getDecryptedToken(token) {
    var decipher = crypto.createDecipher(alogrithm, jwtPassKey);
    var dec = decipher.update(token, 'hex', 'utf8')
    dec += decipher.final('utf8');
    jwt.verify(dec, salt, function (err, user_data) {
        if (err) {
            return err;
        } else {
            return user_data;
        }
    });
}

module.exports = {
    getEncryptedToken: getEncryptedToken,
    getDecryptedToken: getDecryptedToken
}