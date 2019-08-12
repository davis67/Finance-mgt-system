import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSales, deleteSale } from "../store/Sale/actions";
import AddSales from "./AddSales";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
class allSales extends Component {
  state = {
    pageSize: 5,
    currentPage: 1
  };
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  componentDidMount() {
    this.props.getSales(this.props.match.params.id);
  }
  render() {
    const { sales, loading } = this.props.sale;
    const { currentPage, pageSize } = this.state;
    const finalsales = sales.data;

    if (sales === null || loading) return <div> loading.... </div>;
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 d-flex">
              <h3 className="justify-content-center">
                Revenue: {sales.revenue}
              </h3>
            </div>
            <div className="col-md-4 d-flex">
              <h3 className="justify-content-center">
                Total Sales: {sales.totalSales}
              </h3>
            </div>
            <div className="col-md-4 d-flex">
              <h3 className="justify-content-center">
                <Link
                  to={`/sales/add-sales/${sales.revenueId}`}
                  className="btn btn-success"
                >
                  Add Sales
                </Link>
              </h3>
            </div>
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <td> id </td> <td> name </td>
                  <td> Total Price </td> <td> Action </td>
                </thead>
                <tbody>
                  {finalsales &&
                    paginate(finalsales, currentPage, pageSize).map(
                      (sale, index) => (
                        <tr key={index}>
                          <td> {index} </td> <td> {sale.name} </td>
                          <td> {sale.amount} </td>{" "}
                          <td> {sale.date_of_sales} </td>
                          <td>
                            <Link
                              to={`/sales/edit/${sale._id}`}
                              className="btn btn-primary mr-2"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                this.props.deleteSale(
                                  sale._id,
                                  this.props.history,
                                  sale.Revenue
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
              {finalsales && (
                <Pagination
                  itemsCount={finalsales.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  sale: state.sale
});
export default connect(
  mapStateToProps,
  {
    getSales,
    deleteSale
  }
)(withRouter(allSales));
