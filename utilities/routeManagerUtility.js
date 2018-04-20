/**
 *  ---------- DON"T DELETE ----------
 * Author : Saurabh Rayakwar
 * This class manages routes.
 * -----------------------------------
 */

let _ = require('lodash');

module.exports = {
    handle: handle
}

function handle(routes) {
    let managedRoutes = [];
    _.map(routes, function (route) {
        let managedRoute = [];
        route['middlewares'].length > 0 ?
            managedRoute.push(
                'api/v' + route['version'] + '/' + route['route'],
                route['controller'],
                route['middlewares'],
                route['type']
            )
            :
            managedRoute.push(
                'api/v' + route['version'] + '/' + route['route'],
                route['controller'],
                route['type']
            );

        managedRoutes.push(managedRoute);
    });
    return managedRoutes;
}