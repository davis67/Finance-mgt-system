import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editSale, getSale } from "../store/Sale/actions";

class EditSale extends Component {
  state = {
    formData: {
      _id: this.props.match.params.id,
      name: "",
      amount: "",
      Revenue: ""
    }
  };
  componentWillMount() {
    this.props.getSale(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const { sale } = nextProps.sale;
    console.log(sale);
    this.setState({
      formData: {
        _id: sale._id,
        name: sale.name,
        amount: sale.amount,
        Revenue: sale.Revenue
      }
    });
  }
  onSubmitHandler = e => {
    e.preventDefault();

    this.props.editSale(
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
                <label> Amount </label>
                <input
                  type="number"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  value={this.state.formData.amount}
                  onChange={event => this.onChangeHandler(event, "amount")}
                  name="amount"
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

const mapStateToProps = state => ({ sale: state.sale });

export default connect(
  mapStateToProps,
  { editSale, getSale }
)(withRouter(EditSale));
