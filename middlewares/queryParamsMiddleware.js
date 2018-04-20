var url = require('url');
const PER_PAGE = 5;
const DEFAULT_PAGE = 1;

exports.getPaginator = function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    req.query_params = query;
    req.pagination = {};
    if (query.no_pagination) {
        req.pagination.required = false;
    } else {
        req.pagination.required = true;
        if (query.per_page) {
            req.pagination.limit = parseInt(query.per_page);
        } else {
            req.pagination.limit = PER_PAGE;
        }
        if (query.page_no) {
            req.pagination.page = parseInt(query.page_no);
        } else {
            req.pagination.page = DEFAULT_PAGE;
        }
    }
    next();
};