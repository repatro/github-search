import React, { useEffect, useState } from 'react';

import { getHelloWorld } from './API';

function App() {
  const [helloWorld, setHelloWorld] = useState('not a hello world');

  useEffect(() => {
    getHelloWorld().then((res) => setHelloWorld(res));
  }, []);

  return (
    <div>
      <header>{helloWorld}</header>
    </div>
  );
}

export default App;
