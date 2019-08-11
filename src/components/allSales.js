import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSales } from "../store/Sale/actions";

class allSales extends Component {
  componentDidMount() {
    this.props.getSales(this.props.match.params.id);
  }
  render() {
    const { sales, loading } = this.props.sale;
    const finalsales = sales.data;
    console.log(finalsales);
    if (sales === null || loading) return <div> loading.... </div>;
    return (
      <div className="card">
        <div className="card-body">
          {/* {sales && ( */}
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
              <h3 className="justify-content-center">Add Sales</h3>
            </div>
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <td> id </td> <td> name </td>
                  <td> Total Price </td>
                  <td> Action </td>
                </thead>
                <tbody>
                  {finalsales &&
                    finalsales.map((sale, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{sale.name}</td>
                        <td>{sale.amount}</td>
                        <td>{sale.date_of_sales}</td>
                        <td>
                          <button className="btn btn-primary mr-2">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* )} */}
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
    getSales
  }
)(withRouter(allSales));
