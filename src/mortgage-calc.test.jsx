import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as helpers from './helpers';
import {
  calculateMortgagePayment,
  calculateInterestPayment,
  calculateTotalPaid,
} from './helpers';
import App from './components/App';

vi.spyOn(App, 'submit').mockImplementation(() => 'submitted');

describe('App', () => {
  let mockSubmit;

  beforeEach(() => {
    mockSubmit = vi.fn(e => e.preventDefault());
    render(<App submit={mockSubmit} />);
  });

  it('calls `submit` function when submit button is clicked', async () => {
    const submitButton = screen.getByRole('button', {
      name: /calculate repayments/i,
    });
    await userEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalledOnce();
  });
});

describe('calculateMortgagePayment', () => {
  it('returns the correct value', () => {
    expect(calculateMortgagePayment('1136000', '30', '3.25')).toEqual(
      '4943.94'
    );
  });
});

describe('calculateInterestPayment', () => {
  it('returns the correct value', () => {
    expect(calculateInterestPayment('1136000', '3.25')).toEqual('3076.67');
  });
});

//

// vi.spyOn(helpers, 'calculateMortgagePayment').mockImplementation(
//   () => '4943.94'
// );

// vi.spyOn(helpers, 'calculateInterestPayment').mockImplementation(
//   () => '3076.67'
// );

// describe('App', () => {
//   // const fakeSubmit = vi.fn();

//   beforeEach(() => {
//     vi.resetAllMocks();
//   });

//   // it('calls `submit` when form is submitted', () => {
//   //   render(<App />);

//   //   userEvent.click(screen.getByLabelText('Calculate Repayments'));

//   //   expect()
//   // });

//   it('calls `calculateTotalPaid` with mortgagePmt when user submits with `Repayment` selected', () => {
//     render(<App />);

//     userEvent.fill(screen.getByLabelText('Mortgage Term', '30'));
//     userEvent.click(screen.getByLabelText('Repayment'));
//     userEvent.click(screen.getByLabelText('Calculate Repayments'));

//     expect(calculateTotalPaid).toHaveBeenCalledWith('4943.94', '30');
//     expect(calculateTotalPaid).toEqual('1779818.40');
//   });
// });
