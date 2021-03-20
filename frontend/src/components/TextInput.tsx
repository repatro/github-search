import React, { useRef } from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

interface ITextInputProps {
  value: string;
  onChange(value: string): void;
  icon?: StyledIcon;
  fontSize?: number;
  fluid?: boolean;
}

function TextInput({ value, onChange, icon: Icon, fontSize = 16, fluid }: ITextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) {
    onChange(value);
  }

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  return (
    <TextInputContainer fluid={fluid} onClick={handleFocusInput}>
      {Icon && <Icon size={fontSize} />}
      <Input ref={inputRef} placeholder='Search for users' value={value} onChange={handleChange} fontSize={fontSize} />
    </TextInputContainer>
  );
}

interface IInputProps {
  fontSize: number;
}
const Input = styled.input<IInputProps>`
  flex-grow: 1;
  border: none;
  background-color: transparent;
  padding-left: 10px;
  font-size: ${(props) => props.fontSize || 16}px;
  &:focus,
  &:active {
    outline: none;
  }
`;

interface ITextInputContainerProps {
  fluid?: boolean;
}
const TextInputContainer = styled.div<ITextInputContainerProps>`
  display: flex;
  align-items: center;
  background-color: #eff3f4;
  border-radius: 8px;
  width: ${(props) => (props.fluid ? '100%' : '320px')};
  padding: 12px;
  &:focus-within,
  &:active {
    box-shadow: 0 0 2pt 1pt #452ddd;
  }
  cursor: text;
`;

export default TextInput;
