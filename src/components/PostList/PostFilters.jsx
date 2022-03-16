import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilters.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilters.defaultProps = {
    onSubmit: null,
}

function PostFilters(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState("");
    const typingTimeOutRef = useRef(null);

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearchTerm(value)

        if (!onSubmit) return;
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            }
            onSubmit(formValues)
        },300)
        
    }
    return (
        <form>
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </form>
    );
}

export default PostFilters;