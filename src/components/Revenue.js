import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addRevenue } from "../store/Revenue/actions";
import { withRouter } from "react-router-dom";
import { getRevenues } from "../store/Revenue/actions";

class Revenue extends Component {
  state = {
    amount: "",
    revenues: [
      {
        amount: 70000
      },
      {
        amount: 50000
      },
      {
        amount: 90000
      }
    ]
  };
  static propTypes = {
    addRevenue: PropTypes.func.isRequired,
    getRevenues: PropTypes.func.isRequired,
    revenue: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getRevenues();
  }
  // shouldComponentRender = () => {
  //   const { loading } = this.props.revenue;
  //   if (this.loading === false) return false;

  //   return true;
  // };
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
    const { amount } = this.state;
    const { revenues, error, loading } = this.props.revenues;
    // console.log(revenues);

    if (loading) return <div> loading.... </div>;
    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
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
            <table className="table">
              <thead>
                <th> id </th> <th> amount </th> <th> actions </th>
              </thead>
              <tbody>
                {revenues.map((revenue, index) => (
                  <tr>
                    <td> {index + 1} </td> <td> {revenue.amount} </td>
                    <td>
                      <Link
                        to={`/revenue/view-a-single-revenue/${revenue._id}`}
                      >
                        View
                      </Link>
                    </td>
                    <td> Delete </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
