import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getRevenues } from "../store/Revenue/actions";
import Chart from "react-apexcharts";

class Dashboard extends Component {
  state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "total-expenses",
        data: []
      },
      {
        name: "total-revenue",
        data: []
      }
    ]
  };

  static propTypes = {
    getRevenues: PropTypes.func.isRequired,
    revenues: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getRevenues();
    const items = [];
    const dataseries1 = [];
    const dataseries2 = [];
    const revenuesdata = this.props.revenues;
    for (var i = 0; i < revenuesdata.revenues.length; i++) {
      items.push(revenuesdata.revenues[i].amount);
      dataseries1.push(revenuesdata.revenues[i].totalExpenses);
      dataseries2.push(revenuesdata.revenues[i].totalSales);
    }
    // console.log(items);
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: items
        }
      },
      series: prevState.series.map(obj => {
        if (obj.name === "total-expenses") {
          return Object.assign(obj, { data: dataseries1 });
        } else if (obj.name === "total-revenue") {
          return Object.assign(obj, { data: dataseries2 });
        } else {
          return obj;
        }
      })
    }));
  }
  render() {
    console.log(this.state.options);
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-12">
            <div className="mixed-chart">
              <h4>
                The bar-graph the shows the total expenses against the Revenue
              </h4>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="900"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  revenues: state.revenue
});
export default connect(
  mapStateToProps,
  {
    getRevenues
  }
)(withRouter(Dashboard));
