import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addExpense } from "../store/Expense/actions";

class AddExpense extends Component {
  state = {
    name: "",
    quantity: "",
    unitPrice: "",
    Revenue: null
  };

  static propTypes = {
    addExpense: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.setState({
      Revenue: this.props.match.params.id
    });
  }

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addExpense(
      this.state,
      this.props.history,
      this.props.match.params.id
    );
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { name, quantity, unitPrice } = this.state;
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <label> Name </label>
                <input
                  type="text"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={name}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label> Quantity </label>
                <input
                  type="number"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={quantity}
                  name="quantity"
                />
              </div>
              <div className="form-group">
                <label> UnitPrice </label>
                <input
                  type="number"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={unitPrice}
                  name="unitPrice"
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addExpense
  }
)(withRouter(AddExpense));
