import { useState, useEffect, useCallback } from 'react';
import {
  calculateMortgagePayment,
  calculateInterestPayment,
  calculateTotalPaid,
} from '../../helpers';
import { MORTGAGE_TYPES as mortgageTypes } from '../../constants';

import NumberInput from '../NumberInput';
import RadioGroup from '../RadioGroup';
import Button from '../Button';
import './App.css';

function App() {
  const [pounds, setPounds] = useState('');
  const [years, setYears] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState(null);
  const [payment, setPayment] = useState('');
  const [total, setTotal] = useState('');

  const formattedPayment = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  }).format(payment);

  const formattedTotal = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  }).format(total);

  const submit = useCallback(
    event => {
      event.preventDefault();
      if (type === 'repay') {
        const repayment = calculateMortgagePayment(pounds, years, rate);
        setPayment(repayment);
        const totalRepayment = calculateTotalPaid(repayment, years);
        setTotal(totalRepayment);
      } else if (type === 'interest') {
        const interstPmt = calculateInterestPayment(pounds, rate);
        setPayment(interstPmt);
        const totalRepayment = calculateTotalPaid(interstPmt, years);
        setTotal(totalRepayment);
      }
    },
    [pounds, rate, years, type]
  );

  const clearAll = useCallback(() => {
    setPounds('');
    setYears('');
    setRate('');
    setType(null);
    setPayment('');
  }, []);
  return (
    <main>
      <div className='app-container'>
        <div className='calculator'>
          <div className='calc-heading'>
            <h1>Mortgage Calculator</h1>
            <Button type='button' variant='link' onClick={clearAll}>
              Clear All
            </Button>
          </div>
          <form onSubmit={submit}>
            <div className='calc-form'>
              <NumberInput
                prefix='£'
                label='Mortgage Amount'
                min={0}
                step={1}
                value={pounds}
                onChange={setPounds}
                required
                className='input-one'
              />
              <NumberInput
                suffix='years'
                label='Mortgage Term'
                min={0}
                step={1}
                value={years}
                onChange={setYears}
                required
                className='input-two'
              />
              <NumberInput
                suffix='%'
                label='Interest Rate'
                min={0}
                step={0.25}
                value={rate}
                onChange={setRate}
                required
                className='input-three'
              />
              <RadioGroup
                legend='Mortgage Type'
                values={mortgageTypes}
                currentValue={type}
                onChange={setType}
                required
                className='input-four'
              />
              <Button type='submit' variant='primary'>
                <span className='btnLabel'>
                  <img src='/icon-calculator.svg' alt='Calculator icon' />
                  Calculate Repayments
                </span>
              </Button>
            </div>
          </form>
        </div>
        <div className='results'>
          {!payment && (
            <div className='results-placeholder'>
              <img src='/illustration-empty.svg' />
              <h2>Results shown here</h2>
              <p>
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
          )}
          {payment && (
            <div className='results-display-container'>
              <h2>Your results</h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                &ldquo;calculate repayments&rdquo; again.
              </p>
              <div className='results-display'>
                <div>
                  <p>Your monthly payments</p>
                  <span className='monthly-payment'>{formattedPayment}</span>
                </div>
                <hr />
                <div>
                  <p>Total you&apos;ll repay over the term</p>
                  <span className='total-payment'>{formattedTotal}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
