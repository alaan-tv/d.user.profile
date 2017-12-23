import React, {Component} from 'react';
import {CardColumns} from 'reactstrap';


export default class UserProfilePanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            components: []
        };

        let {breadcrumb} = this.props;
        breadcrumb.path = [{
            name: 'User Profile',
            url: '/profile'
        }];
    }

    componentWillMount() {
        Request.request('component/8a001058-5c6e-43d1-8e41-7868d9789817', {instanceID: 1, command: 'getData'})
            .then( (data) => {
                this.setState({components: data});
            })
            .catch( (err) => console.error(`Error fetching [Dashboard] data: ${err}`));
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="animated fadeIn">
                <CardColumns className="cols-2 card-columns">
                    {this.state.components.map( ({cls, SymbolicName, Version, bundle, id, instanceID},idx)=> (
                        <ComponentPlaceHolder key={idx} service='d.cms.ui.component.Dashboard.Card' filter={ {
                            SymbolicName: SymbolicName,
                            Version: Version,
                            id: id
                        } } autoInstallBundle={true} bundle={bundle} instanceID={instanceID} />
                    ) )}
                </CardColumns>
            </div>
        )
    }
};