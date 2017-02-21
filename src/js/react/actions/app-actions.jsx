import alt from '../alt';
import Api from '../api/app-api';

class AppActions {
    updateData(posts) {
        return posts;
    }

    updatePageData(pageData) {
        return pageData;
    }

    fetchData() {
        Api.fetchData()
            .done((data) => {
                let wikiData = data.query.random;
                this.updateData(wikiData);
            })
            .fail((err) => {
                this.dataFailed('Oops, something happened while loading the data.');
            });
        return true;
    }

    fetchPageDataById(pageId) {
        Api.fetchPageDataById({}, pageId)
            .done((data) => {
                this.updatePageData(data);
            })
            .fail((err) => {
                this.dataFailed('Oops, something went wrong when loading the page data.');
            })

        return true;
    }

    dataFailed(err) {
        return err;
    }
}

module.exports = alt.createActions(AppActions);