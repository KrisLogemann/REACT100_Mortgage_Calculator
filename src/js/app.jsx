/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable max-len */
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: '',
      payment: ''
    };

    this.changeBalance = this.changeBalance.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
    this.calculate = this.calculate.bind(this);
    this.changePayment = this.changePayment.bind(this);
  }
  changeBalance(e) {
    this.setState({ balance: e.target.value });
  }

  changeRate(e) {
    this.setState({ rate: e.target.value });
  }

  changeTerm(e) {
    this.setState({ term: e.target.value });
  }

  changePayment(e) {
    this.setState({ payment: e.target.value });
  }
  calculate(balance, rate, term, e) {
    e.preventDefault();
    const n = Number(term * 12);
    const r = Number(rate / 100) / 12;
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;

    const payment = (balance * numerator / denominator).toFixed(2);
    this.setState({
      payment: `$${payment} is your monthly payment.`
    });
  }
  render() {
    return (
      <form>
        <div className='jumbotron'>
          <h3>Mortgage Calculator</h3>
        </div>
        <div className='balance row'>
          <label htmlFor='loanBalance' className='col-sm-2 col-loan-balance col-loan-balance-sm'>Loan Balance</label>
          <div className='col-sm-10'>
            <input value={ this.state.balance } onChange={ this.changeBalance } name='balance' type='number' className='balance' id='balance' placeholder='0' />
          </div>
        </div>
        <div className='rate row'>
          <label htmlFor='interestRate' className='col-sm-2 col-interest-rate'>Interest Rate (%)</label>
          <div className='col-sm-10'>
            <input value={ this.state.rate } onChange={ this.changeRate } name='rate' type='number' className='rate' id='colFormLabel' placeholder='0' step='0.01' />
          </div>
        </div>
        <div className='form-row align-items-center'>
          <div className='col-auto my-1'>
            <label className='mr-sm-2' htmlFor='inlineFormCustomSelect'>Loan Term (Years)</label>
            <select value={ this.state.term } onChange={ this.changeTerm } name='term' type='number' className='custom-select mr-sm-2' id='inlineFormCustomSelect'>
              <option selected>Choose Term...</option>
              <option value='15'>15 Years</option>
              <option value='30'>30 Years</option>
            </select>
          </div>
          <div className='submit'>
            <button onClick={ e => this.calculate(this.state.balance, this.state.rate, this.state.term, e) } name='submit' type='submit' className='btn btn-primary'>Calculate</button>
          </div>
          <div id='output' name='output' className='d-print-inline-block'>
            <p value={ this.state.payment } onChange={ this.changePayment }>{this.state.payment}</p>
          </div>
        </div>
      </form>
    );
  }
}
