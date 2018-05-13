import '../Profile.scss';
import {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {Pie} from 'react-chartjs-2';
import uuid from '../uuid';

@uuid('3ecbd060-dd59-4d9a-a2cc-ca41f1562a4a')
class ProfilePieItem extends Component {
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
    Request.request(`component/${this.props.SymbolicName}/${this.props.Version}/${ProfilePieItem.uuid}/getData`, {instanceID: this.props.instanceID })
      .then( (data) => {
        this.setState({data: data});
      })
      .catch( (err) => console.error(`Error fetching [Dashboard] data: ${err}`));
  }

  render() {
    return (
      <Card>
        <CardHeader key="CardHeader">
          ProfilePieItem {this.props.instanceID}
          <div className="card-actions">
            <a href="http://www.chartjs.org">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody key="CardBody">
          <div className="chart-wrapper">
            <Pie data={this.state.data} options={{maintainAspectRatio: false}}/>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export {ProfilePieItem};
