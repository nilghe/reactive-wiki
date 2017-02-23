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
        let options = {
            url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&pageid=${pageId}`,
            method: 'GET',
            dataType: 'jsonp'
        }   

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    },

    fetchImageURLByFileName(opts, formatedFileList) {
        let options = {
            url: `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${formatedFileList}`,
            method: 'GET',
            dataType: 'jsonp'
        }

        if (opts) {
            $.extend(options, opts);
        }

        return $.ajax(options);
    }
}