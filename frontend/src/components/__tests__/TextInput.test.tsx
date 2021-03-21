import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Search } from '@styled-icons/bootstrap';

import TextInput from '../TextInput';

describe('TextInput', () => {
  it('should also focus when clicked outside of input', () => {
    const { getByRole, container } = render(<TextInput value='Some value' icon={Search} onChange={() => {}} />);
    const input = container.querySelector('input');
    const icon = container.querySelector('svg');
    icon && fireEvent.click(icon);
    expect(input).toHaveFocus();
  });
  it('should handle enter press', () => {
    const onEnterPressMock = jest.fn();
    const { container } = render(<TextInput value='Some value' onChange={() => {}} onEnterPress={onEnterPressMock} />);
    const input = container.querySelector('input');
    input && fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onEnterPressMock).toBeCalledTimes(1);
  });
});
