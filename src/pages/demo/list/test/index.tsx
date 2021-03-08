import React from 'react';

interface Props {
  onClick: () => void;
};

const Test = React.memo((props: Props) => {
  console.log('props.onClick===', props.onClick())
  return (
    <div>
      <button onClick={props.onClick}>查询</button>
    </div>
  );
})

export default Test;