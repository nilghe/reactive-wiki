import alt from '../alt';
import Api from '../api/app-api';
import WikiArticle from '../objects/app-objects.js';
import _           from 'lodash';

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
                const wikiData = data.query.random;
                const wikiDataFormatted = [];
                wikiData.map((articleData) => {

                    /*
                     * The API only returns the ID and Title
                     * of the items. So, we have to get the images
                     * and category for each article when the user
                     * clicks for more details.
                     */
                    const ARTICLE = new WikiArticle(
                        articleData.id,
                        articleData.title, 
                        [],
                        []);
                    wikiDataFormatted.push(ARTICLE);
                });
                this.updateData(wikiDataFormatted);
            })
            .fail((err) => {
                // TODO Better error handling
                this.dataFailed('Oops, something happened while loading the data.');
            });
        return true;
    }

    fetchPageDataById(pageId) {
        Api.fetchPageDataById({}, pageId)
            .done((singleArticleData) => {
                this.updatePageData(singleArticleData);
                // get all image names
                // put them into a nice array
                // name.jpg|name.svg
                // send to fetchImageURLByFileName
                // Once we have the file names, add them to images store
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