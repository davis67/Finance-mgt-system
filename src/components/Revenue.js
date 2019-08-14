import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { addRevenue } from "../store/Revenue/actions";
import { withRouter } from "react-router-dom";
import { getRevenues } from "../store/Revenue/actions";

class Revenue extends Component {
  state = {
    pageSize: 4,
    currentPage: 1
  };
  static propTypes = {
    addRevenue: PropTypes.func.isRequired,
    getRevenues: PropTypes.func.isRequired,
    revenues: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getRevenues();
  }
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.addRevenue(this.state, this.props.history);
  };
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { amount, currentPage, pageSize } = this.state;
    const { revenues, error, count, loading } = this.props.revenues;
    if (loading === true) return <div> loading.... </div>;
    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            {error && <div className="alert alert-danger"> {error} </div>}
            <h3> Add a Revenue </h3>
            <form onSubmit={this.onSubmitHandler}>
              <input
                type="number"
                placeholder="eg 5000000"
                name="amount"
                value={amount}
                className="form-control"
                onChange={this.onChangeHandler}
              />

              <input
                type="submit"
                className="btn btn-primary btn-sm"
                value="+ ADD"
              />
            </form>
            <hr />
            <p>Showing {count} Revenues in the database.</p>
            <table className="table">
              <thead>
                <td> id </td> <td> amount </td> <td> actions </td>
              </thead>
              <tbody>
                {revenues &&
                  paginate(revenues, currentPage, pageSize).map(
                    (revenue, index) => (
                      <tr key={revenue._id}>
                        <td> {index + 1} </td> <td> {revenue.amount} </td>
                        <td>
                          <Link
                            to={`/revenue/view-a-single-revenue/${revenue._id}`}
                          >
                            View
                          </Link>
                        </td>
                        <td>
                          <button className="btn btn-danger ml-3">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  revenues: state.revenue
});
export default connect(
  mapStateToProps,
  {
    addRevenue,
    getRevenues
  }
)(withRouter(Revenue));
