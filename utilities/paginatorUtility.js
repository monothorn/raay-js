function updatePagination(current_page, limit, total) {
    return {
        total_pages: Math.ceil((total / limit)),
        total_items: total,
        limit: limit,
        current: current_page
    }
}

module.exports = {
    updatePagination: updatePagination
}