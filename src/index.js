import '@lwc/synthetic-shadow';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sample from 'c/sample';
import lwcPublicMethod from 'c/lwcPublicMethod';

// define the tag for the LWCs
customElements.define('c-sample', Sample.CustomElementConstructor);
customElements.define(
    'c-lwc-public-method',
    lwcPublicMethod.CustomElementConstructor
);

ReactDOM.render(<App />, document.getElementById('root'));
