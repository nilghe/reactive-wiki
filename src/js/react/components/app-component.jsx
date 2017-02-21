import React       from 'react';
import AppStore    from '../stores/app-stores.jsx';
import AppActions  from '../actions/app-actions.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        AppActions.fetchData();
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    moreDetailClick(pageId) {
        AppActions.fetchPageDataById(pageId);
    }

    render() {
        return (
            <div>
                <h1>Media Wiki</h1>
                <h2>List</h2>

                <ul>
                    {this.state.appData.map((data) => {
                            return (
                                <li key={data.id} 
                                    onClick={() => this.moreDetailClick(data.id)} >
                                    <a href="#">{data.title}</a>
                                </li>
                            )
                    })}
                </ul>
            </div>
        )
    }
}

module.exports = App;
