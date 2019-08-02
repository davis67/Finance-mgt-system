import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editExpense, getExpense } from "../store/Expense/actions";

class EditExpense extends Component {
  state = {
    formData: {
      _id: this.props.match.params.id,
      name: "",
      quantity: "",
      unitPrice: "",
      Revenue: ""
    }
  };
  componentWillMount() {
    this.props.getExpense(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const { expense } = nextProps.expense;
    console.log(expense);
    this.setState({
      formData: {
        _id: expense._id,
        name: expense.name,
        quantity: expense.quantity,
        unitPrice: expense.unitPrice,
        Revenue: expense.Revenue
      }
    });
  }
  onSubmitHandler = e => {
    e.preventDefault();

    /// start with me in the morning
    // you need to add the id of the revenue here
    this.props.editExpense(
      this.state.formData,
      this.props.history,
      this.props.match.params.id,
      this.state.formData.Revenue
    );
    console.log(`${this.state.formData.Revenue}`);
  };
  onChangeHandler = (event, name) => {
    const newFormData = { ...this.state.formData };
    newFormData[name] = event.target.value;
    this.setState({
      formData: newFormData
    });
  };
  render() {
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
                  value={this.state.formData.name}
                  onChange={event => this.onChangeHandler(event, "name")}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label> Quantity </label>
                <input
                  type="number"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={this.state.formData.quantity}
                  onChange={event => this.onChangeHandler(event, "quantity")}
                  name="quantity"
                />
              </div>
              <div className="form-group">
                <label> UnitPrice </label>
                <input
                  type="number"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={this.state.formData.unitPrice}
                  onChange={event => this.onChangeHandler(event, "unitPrice")}
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

const mapStateToProps = state => ({ expense: state.expense });

export default connect(
  mapStateToProps,
  { editExpense, getExpense }
)(withRouter(EditExpense));
