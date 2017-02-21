import React       from 'react';
import AppStore    from '../stores/app-stores.jsx';
import AppActions  from '../actions/app-actions.jsx';

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
        return (
            <div>
                <span>{this.props.params.pageId}</span>
            </div>
        )
    }

}

export default PageDetails;