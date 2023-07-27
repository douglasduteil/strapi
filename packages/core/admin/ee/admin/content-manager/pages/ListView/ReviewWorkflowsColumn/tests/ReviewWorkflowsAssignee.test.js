import React from 'react';

import { lightTheme, ThemeProvider } from '@strapi/design-system';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { ReviewWorkflowsAssigneeEE } from '..';

const ComponentFixture = (props) => (
  <ThemeProvider theme={lightTheme}>
    <IntlProvider locale="en" messages={{}}>
      <ReviewWorkflowsAssigneeEE {...props} />
    </IntlProvider>
  </ThemeProvider>
);

const setup = (props) => render(<ComponentFixture {...props} />);

describe('DynamicTable | ReviewWorkflowsAssignee', () => {
  test('will use displayname over first and last name', () => {
    const username = 'Display Name';
    const { getByText } = setup({ user: { username } });

    expect(getByText(username)).toBeInTheDocument();
  });
  test('render assignee name', () => {
    const { getByText } = setup({ user: { firstname: 'Kai', lastname: 'Doe' } });

    expect(getByText('Kai Doe')).toBeInTheDocument();
  });
});
