import React from 'react';
import '../App';

class PopUp extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 className="popuptext">Order Deleted!</h1>
        </div>
      </div>
    );
  }
}

export default PopUp;