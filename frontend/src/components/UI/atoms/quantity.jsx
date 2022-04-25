import React from "react";
import "./styles.css"

class Quantity extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 1 }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState({ value: this.state.value + 1 });
    }

    decrement() {
        this.setState({ value: (this.state.value > 0) ? this.state.value-1 : 0 });
    }

    render() {

        return (
            <div>
                <p>
                    Select quantity
                </p>
                <div className="quantity-input">
                    <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
                        &mdash;
                    </button>
                    <input className="quantity-input__screen" type="text" value={this.state.value} readonly />
                    <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
                        &#xff0b;
                    </button>
                </div>
            </div>
        );
    }
}

export default Quantity;