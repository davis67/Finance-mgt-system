import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRevenue } from "../store/Revenue/actions";
import { withRouter } from "react-router-dom";
import { getRevenues } from "../store/Revenue/actions";

class Revenue extends Component {
  state = {
    amount: ""
  };
  static propTypes = {
    addRevenue: PropTypes.func.isRequired,
    getRevenues: PropTypes.func.isRequired,
    revenue: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getRevenues();
  }
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
    const { revenues, loading } = this.state.revenue;
    console.log(revenues);

    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            <h3>Add a Revenue </h3>
            <form onSubmit={this.onSubmitHandler}>
              <input
                type="number"
                placeholder="eg 5000000"
                name="amount"
                className="form-control"
                onChange={this.onChangeHandler}
              />

              <input
                type="submit"
                className="btn btn-primary btn-sm"
                value="+ ADD"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  revenue: state.revenue
});
export default connect(
  mapStateToProps,
  {
    addRevenue,
    getRevenues
  }
)(withRouter(Revenue));
