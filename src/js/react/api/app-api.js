import $ from 'jquery';

module.exports = {
    fetchData(opts) {

        let options = {
            url: 'http://jsonplaceholder.typicode.com/users',
            method: 'GET'
        }

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    }
}