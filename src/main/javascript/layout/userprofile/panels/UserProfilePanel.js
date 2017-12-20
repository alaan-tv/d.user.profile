import React, {Component} from 'react';
import {CardColumns} from 'reactstrap';
import ComponentPlaceHolder from '../../../../../../../../d.cms/cms-web-app/src/main/front-end/javascript/components/ComponentPlaceHolder';
import {request} from "../../../../../../../../d.cms/cms-web-app/src/main/front-end/javascript/transport/Request";

export default class UserProfilePanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            components: []
        };
    }

    componentWillMount() {
        request('component/8a001058-5c6e-43d1-8e41-7868d9789817', {instanceID: 0, command: 'getData'})
            .then( (response) => {
                this.setState({components: response.data});
            })
            .catch( (err) => console.error(`Error fetching [Dashboard] data: ${err}`));
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="animated fadeIn">
                <h1>User Profile</h1>
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