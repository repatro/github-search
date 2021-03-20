import React, { ReactNode } from 'react';
import styled from 'styled-components';

import SpinningIndicator from '../styled/SpinningIndicator';

interface ILoadingWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  spinningIndicatorSize?: number;
  loadingHeight?: number;
  error?: string;
}

function LoadingWrapper({ children, isLoading, loadingHeight, spinningIndicatorSize, error }: ILoadingWrapperProps) {
  function renderError(error: string) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container height={!children ? loadingHeight : undefined}>
      <LoadingInfoContainer loadingHeight={loadingHeight}>
        {isLoading && <SpinningIndicator aria-label='loading indicator' size={spinningIndicatorSize || 20} />}
      </LoadingInfoContainer>
      <ChildrenContainer blur={!!error || isLoading}>{!error && children}</ChildrenContainer>
      {error && renderError(error)}
    </Container>
  );
}

interface IContainer {
  height?: number;
}
const Container = styled.div<IContainer>`
  height: ${(props) => (props.height ? `${props.height}px` : 'unset')};
`;

interface ILoadingInfoContainer {
  loadingHeight?: number;
}
const LoadingInfoContainer = styled.div<ILoadingInfoContainer>`
  position: absolute;
  left: 50%;
  margin-top: ${(props) => (props.loadingHeight ? props.loadingHeight / 2 : 0)}px;
  transform: translateX(-50%);
  z-index: 10;
`;

interface IChildrenContainer {
  blur?: boolean;
}
const ChildrenContainer = styled.div<IChildrenContainer>`
  filter: ${(props) => (props.blur ? 'blur(2px)' : 'unset')};
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 18px;
`;

export default LoadingWrapper;
