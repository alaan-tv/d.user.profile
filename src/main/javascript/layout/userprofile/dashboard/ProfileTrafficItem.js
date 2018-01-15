import '../Profile.scss';
import {Component} from 'react';
import {Row, Col, Progress, Card, CardBody, CardFooter, CardTitle, Button, ButtonToolbar, ButtonGroup, Input, Label} from 'reactstrap';
import {Line} from 'react-chartjs-2';
import uuid from '../uuid';

@uuid('traffic-item')
class ProfileTrafficItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainChartOpts: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          }
        }
      },
      mainChart: {}
    }
  }

  componentDidMount() {
    Request.request(`component/${this.props.SymbolicName}/${this.props.Version}/${ProfileTrafficItem.uuid}/getData`, {instanceID: this.props.instanceID })
      .then( (data) => {
        this.setState({mainChat: data});
      })
      .catch( (err) => console.error(`Error fetching [Dashboard] data: ${err}`));
  }

  render() {
    return (
      <Card>
        <CardBody key="CardBody">
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Traffic</CardTitle>
              <div className="small text-muted">November 2015</div>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block">
              <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-3" data-toggle="buttons" aria-label="First group">
                  <Label htmlFor="option1" className="btn btn-outline-secondary">
                    <Input type="radio" name="options" id="option1"/> Day
                  </Label>
                  <Label htmlFor="option2" className="btn btn-outline-secondary active">
                    <Input type="radio" name="options" id="option2" defaultChecked/> Month
                  </Label>
                  <Label htmlFor="option3" className="btn btn-outline-secondary">
                    <Input type="radio" name="options" id="option3"/> Year
                  </Label>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
            <Line data={this.state.mainChart} options={this.state.mainChartOpts} height={300}/>
          </div>
        </CardBody>
        <CardFooter key="CardFooter">
          <ul>
            <li>
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <Progress className="progress-xs mt-2" color="success" value="40"/>
            </li>
            <li className="d-none d-md-table-cell">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <Progress className="progress-xs mt-2" color="info" value="20"/>
            </li>
            <li>
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <Progress className="progress-xs mt-2" color="warning" value="60"/>
            </li>
            <li className="d-none d-md-table-cell">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <Progress className="progress-xs mt-2" color="danger" value="80"/>
            </li>
            <li className="d-none d-md-table-cell">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average 40.15%</strong>
              <Progress className="progress-xs mt-2" color="primary" value="40"/>
            </li>
          </ul>
        </CardFooter>
      </Card>
    );
  }
}

export {ProfileTrafficItem};
