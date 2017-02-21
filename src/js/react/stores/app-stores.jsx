import alt         from '../alt';
import PostActions from '../actions/app-actions.jsx';

class AppStore {
    constructor() {
        this.appData = [];
        this.pageData = {};
        this.errorMessage = null;

        this.bindListeners({
            handleUpdateData: PostActions.UPDATE_DATA,
            handleUpdatePageData: PostActions.UPDATE_PAGE_DATA,
            handleFetchData: PostActions.FETCH_DATA,
            handleFetchPageDataById: PostActions.FETCH_PAGE_DATA_BY_ID,
            handleDataFailed: PostActions.DATA_FAILED
        });
    }

    handleUpdateData(appData) {
        this.appData = appData;
        this.errorMessage = null;
    }

    handleUpdatePageData(data) {
        this.pageData = data;
        this.errorMessage = null;
    }

    handleFetchData() {
        this.appData = [];
    }

    handleFetchPageDataById() {
        this.pageData = {};
    }

    handleDataFailed(err) {
        this.errorMessage = err;
    }
}

module.exports = alt.createStore(AppStore, 'AppStore');