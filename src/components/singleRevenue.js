import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRevenue } from "../store/Revenue/actions";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { deleteExpense } from "../store/Expense/actions";

class singleRevenue extends Component {
  state = {
    pageSize: 5,
    currentPage: 1
  };
  componentDidMount() {
    this.props.getRevenue(this.props.match.params.id);
  }
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  render() {
    const { revenue, loading } = this.props.revenue;
    const { currentPage, pageSize } = this.state;
    const expenses = revenue.expenses;
    if (revenue === null || loading) return <div> loading.... </div>;
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 d-flex">
              <h3 className="justify-content-center">
                Revenue: {revenue.revenueAmount}
              </h3>
            </div>
            <div className="col-md-4">
              <h3 className="justify-content-center">
                Total Expenses: {revenue.totalExpenses}
              </h3>
            </div>
            <div className="col-md-3 flex">
              <h3 className="justify-content-center">
                <Link
                  to={`/revenue/add-expense/${revenue.revenueId}`}
                  className="btn btn-sm btn-primary"
                >
                  Add an Expense
                </Link>
              </h3>
            </div>
            <div className="col-md-2 flex">
              <h3 className="justify-content-center">
                <Link
                  to={`/sales/revenue/${revenue.revenueId}`}
                  className="btn btn-sm btn-success"
                >
                  view Sales
                </Link>
              </h3>
            </div>
          </div>
          <hr />

          <table className="table">
            <thead>
              <td> id </td> <td> name </td> <td> Quantity </td>
              <td> UnitPrice </td> <td> Total Price </td>
              <td> Action </td>
            </thead>
            <tbody>
              {expenses &&
                paginate(expenses, currentPage, pageSize).map(
                  (expense, index) => (
                    <tr key={expense._id}>
                      <td> {index + 1} </td> <td> {expense.name} </td>
                      <td> {expense.quantity} </td>
                      <td> {expense.unitPrice} </td>
                      <td> {expense.quantity * expense.unitPrice} </td>
                      <td>
                        <Link to={`/expenses/edit/${expense._id}`}> Edit </Link>
                        |
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            this.props.deleteExpense(
                              expense._id,
                              this.props.history,
                              expense.Revenue
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          {expenses && (
            <Pagination
              itemsCount={expenses.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          )}
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
    getRevenue,
    deleteExpense
  }
)(withRouter(singleRevenue));
