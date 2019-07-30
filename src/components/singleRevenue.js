import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRevenue } from "../store/Revenue/actions";

class singleRevenue extends Component {
  componentDidMount() {
    this.props.getRevenue(this.props.match.params.id);
  }
  render() {
    const { revenue, loading } = this.props.revenue;

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div class="col-md-4 flex">
              <h3 className="justify-content-center">
                Revenue: {revenue.revenue}
              </h3>
            </div>
            <div class="col-md-4">
              <h3 className="justify-content-center">
                Total Expenses:{revenue.totalExpenses}
              </h3>
            </div>
            <div class="col-md-4 flex">
              <h3 className="justify-content-center">
                <Link to="" className="btn btn-primary">
                  Add an Expense
                </Link>
              </h3>
            </div>
          </div>

          {/* <table className="table">
            <thead>
              <th>id</th>
              <th>name</th>
              <th>Quantity</th>
              <th>UnitPrice</th>
              <th>Total Price</th>
            </thead>
            <tbody>
              {revenue.expenses.map((expense, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{expense.name}</td>
                  <td>{expense.quantity}</td>
                  <td>{expense.unit_price}</td>
                  <td>1000</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  revenue: state.revenue
});

export default connect(
  mapStateToProps,
  {
    getRevenue
  }
)(withRouter(singleRevenue));
