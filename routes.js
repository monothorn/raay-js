// module.exports = [
//     ['/notifications/list', 'notificationController#getNotifications', 'authMiddleware#authenticated', 'queryParamsMiddleware#getPaginator',
//         'GET'],
// ];


module.exports = [
    {
        type: "get", route: "test1", middlewares: [], controller: "test1/test1Controller#method1", version: "1"
    },
    {
        type: "get", route: "test1", middlewares: [], controller: "test2/test2Controller#method2", version: "2"
    },
    {
        type: "get", route: "test1/:id", middlewares: [], controller: "test2/test2Controller#method2", version: "1"
    },
];