import React       from 'react';
import AppStore    from '../stores/app-stores.jsx';
import AppActions  from '../actions/app-actions.jsx';
import _           from 'lodash';

class PageDetails extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        AppActions.fetchPageDataById(this.props.params.pageId);
        this.setState({
            currentArticle: {}
        });
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange(state) {

        if (!_.isEmpty(state.pageData)) {
            this._setArticleAdditionalData(
                state.pageData,
                state.appData,
                this.props.params.pageId
            );
        }

        this.setState(state);
    }

    _getArticleIndex(articles, id) {
        return _.findIndex(articles, function(obj) {
            return obj.id == id;
        });
    }

    _getArticleObject(articles, id) {
        return _.find(articles, function(obj) {
            return obj.id == id;
        });
    }

    _setArticleAdditionalData(singleArticle, allArticles, currentArticleId) {
        const index = this._getArticleIndex(
            allArticles,
            currentArticleId
        );
                    
        let currentArticle = allArticles[index];
        currentArticle.categories = singleArticle.parse.categories;
        currentArticle.images = singleArticle.parse.images;
        allArticles[index] = currentArticle;

        /* 
         * The API call needs the filenames of the images in the following format
         * File:filename.jpg|File:myimage.gif
         */
        const fileListFormatted = 'File:' + currentArticle.images.join('|File:');
        // TODO This isn't working and I need to fix it to get the URLS of the images
        // AppActions.fetchImageUrls(fileListFormatted);

        this.setState({
            currentArticle: currentArticle,
            appData: allArticles
        });
    }

    render() {

        if (_.isEmpty(this.state.currentArticle)) {
            return (
                <div>Loading!</div>
            )
        }

        // TODO Better handling if there are no categories or images
        return (
            <div>
                <h1>{this.state.currentArticle.title}</h1>
                <h2>Categories</h2>
                <ul className='wiki-list'>
                    {this.state.currentArticle.categories.map((category, index) => {
                        return (
                            <li>{category['*']}</li>
                        )
                    })}
                </ul>

                {this.state.currentArticle.images.map((image) => {
                    return (
                        <img src={image}></img>
                    )
                })}
            </div>
        )
    }

}

export default PageDetails;