import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import UserSearch from '../UserSearch';

describe('UserSearch', () => {
  it('should block search button when empty input', () => {
    const { getByText, container } = render(<UserSearch onSearch={() => {}} />);
    expect(getByText('Search')).toBeDisabled();

    const input = container.querySelector('input');
    input && fireEvent.change(input, { target: { value: 'Searched value' } });

    expect(getByText('Search')).not.toBeDisabled();
  });

  it('should trim searched value', () => {
    const onSearchMock = jest.fn();
    const { getByText, container } = render(<UserSearch onSearch={onSearchMock} />);
    const input = container.querySelector('input');

    input && fireEvent.change(input, { target: { value: '  Value  ' } });
    fireEvent.click(getByText('Search'));

    expect(onSearchMock).toBeCalledTimes(1);
    expect(onSearchMock).toBeCalledWith('Value');
  });
});
