import alt from '../alt';
import Api from '../api/app-api';

class AppActions {
    updateData(posts) {
        this.dispatch(posts);
    }

    fetchData() {
        this.dispatch();
        Api.fetchData()
            .done((data) => {
                this.actions.updateData(data);
            })
            .fail((err) => {
                this.actions.dataFailed('Oops, something happened while loading the data.');
            })
    }

    dataFailed(err) {
        this.dispatch(err);
    }
}

module.exports = alt.createActions(AppActions);