import { useRef, useState, createContext } from "react";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const [formInputsValidity, setFormsInputValidity] = useState({
        name: true,
        address: true,
        postal: true,
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const postalInputRef = useRef();

    const isEmpty = (value) => value.trim() === "";
    const is5Chars = (value) => value.trim().length === 5;

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalIsValid = is5Chars(enteredPostal);

        setFormsInputValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            postal: enteredPostalIsValid,
        });

        const formIsValid =
            enteredNameIsValid && enteredAddressIsValid && enteredPostalIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirmOrder({
            name: enteredName,
            address: enteredAddress,
            postalCode: enteredPostal,
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Enter a valid name</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" ref={addressInputRef} />
                {!formInputsValidity.address && <p>Enter a valid address</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputsValidity.postal && <p>Enter a valid postal code</p>}
            </div>
            <div className={classes.actions}>
                <button type="submit">Confirm</button>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Checkout;
