import './error-button.scss';
import React, { useState } from 'react';

export default function ErrorButton() {
  const [err, changeErr] = useState(false);

  function throwError() {
    changeErr(!err);
  }

  if (err) {
    throw new Error('Simulated error from button click');
  }
  return (
    <div className="err-btn">
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
}
