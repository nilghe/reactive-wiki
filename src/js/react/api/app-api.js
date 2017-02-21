import $ from 'jquery';

module.exports = {
    fetchData(opts) {

        let options = {
            url: 'https://en.wikipedia.org/w/api.php?action=query&&list=random&rnlimit=10&format=json',
            method: 'GET',
            dataType: 'jsonp'
        }

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    },

    fetchPageDataById(opts, pageId) {
        console.log('getting page details with id:' + pageId);
        let options = {
            url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&pageid=${pageId}`,
            method: 'GET',
            dataType: 'jsonp'
        }   

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    }
}