import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState("")

    function handleChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!onSubmit) return;
        const formValues = {
            title: value
        }
        onSubmit(formValues);
        setValue("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="input here"
                value={value}
                onChange={handleChange}
            />
        </form>
    );
}

export default TodoForm;