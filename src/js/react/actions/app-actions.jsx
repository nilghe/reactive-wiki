import alt from '../alt';
import Api from '../api/app-api';

class AppActions {
    updateData(posts) {
        return posts;
    }

    fetchData() {
        Api.fetchData()
            .done((data) => {
                let wikiData = data.query.random;
                console.log(wikiData);
                this.updateData(wikiData);
            })
            .fail((err) => {
                this.dataFailed('Oops, something happened while loading the data.');
            })
        return true;
    }

    dataFailed(err) {
        return err;
    }
}

module.exports = alt.createActions(AppActions);