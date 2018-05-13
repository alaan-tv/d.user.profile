import {Component} from 'react';
import {CardColumns} from 'reactstrap';

export default class UserProfilePanel extends Component {

  constructor(props) {
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
    Request.request(`component/dashboard`, {instanceID: 0})
      .then((data) => {
        this.setState({components: data});
      })
      .catch((err) => console.error(`Error fetching [Dashboard] data: ${err}`));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>User Profile</h1>
        <CardColumns className="cols-2 card-columns">
          {this.state.components.map(({cls, SymbolicName, Version, bundle, id, instanceID}, idx) => (
            <ComponentPlaceHolder
              key={idx}
              service='d.cms.ui.component.Dashboard.Card'
              bundle={bundle}
              autoInstallBundle={true}
              instanceID={instanceID}
              filter={{
                SymbolicName: SymbolicName,
                Version: Version,
                id: id
              }}
            />
          ))}
        </CardColumns>
      </div>
    )
  }
}
