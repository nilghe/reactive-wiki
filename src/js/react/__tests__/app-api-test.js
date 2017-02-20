// https://facebook.github.io/jest/docs/getting-started.html#content
// https://github.com/facebook/jest/tree/master/examples

jest.dontMock('../api/app-api.js');

describe('fetchData', () => {
    it('calls the fetchData $.ajax call with default options', () => {
        var $ = require('jquery');
        var fetchData = require('../api/app-api');

        fetchData.fetchData({});

        expect($.ajax).toBeCalledWith({
            url: 'http://jsonplaceholder.typicode.com/users',
            method: 'GET'
        });
    });
});