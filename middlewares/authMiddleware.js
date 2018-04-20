var _ = require('lodash');
var AuthFailedException = require("raay-errors").AuthFailedException;
var config = require('../config');

exports.authenticated = function (req, res, next) {
    var sessionId = req.get('SID');
    var userId = req.get('auth-id');
    var bearer = req.get('auth-bearer');
    var brainCookie = '';

    if ((userId == undefined || bearer == undefined) && config.auth.use_cookie) {
        var error = new AuthFailedException("Forbidden");
        next(error);
    }

    req.fromApp = false;
    if ((userId == undefined && bearer == undefined) && config.auth.use_cookie) {
        if (sessionId != undefined) {
            brainCookie = sessionId;
            req.fromApp = true;
        } else if (req.cookies[config.Constants.SESSION_COOKIE]) {
            brainCookie = req.cookies[config.Constants.SESSION_COOKIE];
        } else {
            var error = new AuthFailedException("No session found");
            next(error);
        }
    }

    if ((userId != undefined && bearer != undefined) || brainCookie) {
        var checkAuth = checkAuthentication(userId, bearer, brainCookie);
        checkAuth.then((userData) => {
            req.session_data = userData;
            next();
        }).catch((error) => {
            next(error);
        }
        );
    } else {
        var error = new AuthFailedException("Forbidden");
        next(error);
    }
};

function checkAuthentication(userId, bearer, brainCookie, next) {
    var request_payload = {};
    if (!bearer && config.auth.use_cookie) {
        request_payload = { usercookie: brainCookie };
    } else {
        if (userId) {
            request_payload = { token: bearer, userId: userId };
        } else {
            request_payload = { token: bearer };
        }
    }
    var request = require('request');

    var options = {
        url: config.auth.auth_verify_url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_payload)
    };

    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
            var userData = JSON.parse(body);
            if (res && res.statusCode === 200 && userData.status_code == '200' && userData.data && userData.data.id) {
                resolve(userData.data);
            } else {
                var errorMsg = process.env.NODE_ENV == 'development' ? userData.status_message : "Unable to authenticate";
                var error = new AuthFailedException(errorMsg);
                reject(error);
            }
        });
    });
}
