import '../Profile.scss';
import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {Doughnut} from 'react-chartjs-2';
import uuid from '../uuid';

@uuid('5d4b2f67-ee47-4a84-947d-d9b65d94e3ab')
class ProfileProgressItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: []
      }
    }
  }

  componentDidMount() {
    Request.request(`component/${this.props.SymbolicName}/${this.props.Version}/${ProfileProgressItem.uuid}/getData`, {instanceID: this.props.instanceID})
      .then( (data) => {
        this.setState({data: data});
      })
      .catch( (err) => console.error(`Error fetching [Dashboard] data: ${err}`));
  }

  render() {
    return (
      <Card>
        <CardHeader key="CardHeader">
          ProfileProgressItem {this.props.instanceID}
          <div className="card-actions">
            <a href="http://www.chartjs.org">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody key="CardBody">
          <div className="chart-wrapper">
            <Doughnut data={this.state.data} options={{maintainAspectRatio: false}}/>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export {ProfileProgressItem};
