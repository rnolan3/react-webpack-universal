import React, { PropTypes } from 'react';

const App = (props) => {
  console.log(props);
  return (
    <div>
      <h1>App Container</h1>
      { props.children }
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node
};

export default App;
