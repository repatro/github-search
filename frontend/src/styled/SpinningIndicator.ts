import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface ISpinningIndicator {
  size?: number;
}
const SpinningIndicator = styled.div<ISpinningIndicator>`
  width: 14px;
  height: 14px;
  border-top: 3px solid #8888ff;
  border-right: 3px solid #8888ff;
  border-radius: 50%;
  background: transparent;

  animation: ${rotate} 0.75s linear infinite;
  transform: translateZ(0);
`;

export default SpinningIndicator;
