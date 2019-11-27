import React, { Fragment } from 'react';
import Index01 from './index01'
import Index02 from './index02'
import { TodoHeader, Like } from './components'

function App() {
  return (
    <Fragment>
      <Index01></Index01>
      <Index02></Index02>
      <TodoHeader desc="今日事今日毕" x={1} y={2}>
        待办事项列表
      </TodoHeader>
      <Like></Like>
    </Fragment>
  );
}

export default App;
