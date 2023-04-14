import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { render } from '@testing-library/react';
import FormPage from '../pages/formPage/FormPage';

test('renders Form page header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <FormPage />
    </Provider>
  );
  const headerElement = getByText(/Form page/i);
  expect(headerElement).toBeInTheDocument();
});
