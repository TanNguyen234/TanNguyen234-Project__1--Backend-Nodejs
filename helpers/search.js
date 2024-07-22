module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }

    if (query.keyword) {           //Chức năng tìm kiếm
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
}