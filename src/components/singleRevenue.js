import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRevenue } from "../store/Revenue/actions";

class singleRevenue extends Component {
  componentDidMount() {
    this.props.getRevenue(this.props.match.params.id);
  }
  render() {
    const { revenue, loading } = this.props.revenue;
    const expenses = revenue.expenses;

    if (revenue === null || loading) return <div> loading.... </div>;
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 flex">
              <h3 className="justify-content-center">
                Revenue: {revenue.revenueAmount}
              </h3>
            </div>
            <div className="col-md-4">
              <h3 className="justify-content-center">
                Total Expenses: {revenue.totalExpenses}
              </h3>
            </div>
            <div className="col-md-4 flex">
              <h3 className="justify-content-center">
                <Link
                  to={`/revenue/add-expense/${revenue.revenueId}`}
                  className="btn btn-primary"
                >
                  Add an Expense
                </Link>
              </h3>
            </div>
          </div>
          <table className="table">
            <thead>
              <td> id </td> <td> name </td> <td> Quantity </td>
              <td> UnitPrice </td> <td> Total Price </td>
              <td> Action </td>
            </thead>
            <tbody>
              {expenses &&
                expenses.map((expense, index) => (
                  <tr key={expense._id}>
                    <td> {index + 1} </td> <td> {expense.name} </td>
                    <td> {expense.quantity} </td> <td> {expense.unitPrice} </td>
                    <td> {expense.quantity * expense.unitPrice} </td>{" "}
                    <td>
                      <Link> Edit </Link> |<Link>Delete</Link>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
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
