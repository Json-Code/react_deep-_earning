import React, { Fragment } from 'react';
import Index01 from './index01'
import Index02 from './index02'
import { TodoHeader } from './components'

function App() {
  return (
    <Fragment>
      <Index01></Index01>
      <Index02></Index02>
      <TodoHeader></TodoHeader>
    </Fragment>
  );
}

export default App;
