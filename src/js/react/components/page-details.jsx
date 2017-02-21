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
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        if (_.isEmpty(this.state.pageData)) {
            return (
                <div>Loading!</div>
            )
        }

        return (
            <div>
                <span>{this.state.pageData.parse.title}</span>
                <div className='content' 
                     dangerouslySetInnerHTML={{__html: this.state.pageData.parse.text['*']}}>
                </div>
            </div>
        )
    }

}

export default PageDetails;