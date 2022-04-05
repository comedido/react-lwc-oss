import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            value: 'React + LWC',
            prefill: JSON.stringify({
                key: 'value'
            }),
            layout: 'lightning'
        };
        this.lwcElement = React.createRef();
        this.lwcElement1 = React.createRef();
        //this.handleChange = this.handleChange.bind(this);
        this.getLwcData = this.getLwcData.bind(this);
    }

    componentDidMount() {
        this.lwcElement1.current.addEventListener('notify_react', (event) => {
            console.log(`captured event ${JSON.stringify(event.detail)}`);
        });
    }

    render() {
        // manually create the element
        //const defaultProps = { data: this.state.prefill };
        //return React.createElement('c-sample', defaultProps);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

                <div>
                    <c-sample
                        ref={this.lwcElement1}
                        user="Ivelin"
                        layout={this.state.layout}
                        prefill={this.state.prefill}
                    ></c-sample>

                    <c-lwc-public-method
                        ref={this.lwcElement}
                    ></c-lwc-public-method>

                    <button
                        className="slds-button slds-button_brand"
                        onClick={this.getLwcData}
                    >
                        Get LWC data from React
                    </button>
                </div>
            </div>
        );
    }

    /**
     * This method will call the public method available in the LWC
     * @param {*} evt
     */
    getLwcData(evt) {
        console.log(
            `call LWC method => ${JSON.stringify(
                this.lwcElement.current.getData()
            )}`
        );
    }
}
export default App;
