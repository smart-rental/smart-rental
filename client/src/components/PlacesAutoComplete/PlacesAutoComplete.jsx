import React, { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Autocomplete, TextField } from "@mui/material";



const PlacesAutoComplete = ({ name, label, style, valueProp, handleChange }) => {
    const {
        value,
        suggestions: { data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();
    
    useEffect(() => { 
        setValue(valueProp);
    }, [valueProp])
    const ref = useOnclickOutside(() => {
        // When user clicks outside the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });
    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    return (
        <div ref={ref}>
            <Autocomplete 
                autoHighlight
                disablePortal
                options={data}
                value={{ description: value }}
                getOptionLabel={(option) => option.description}
                onChange={(event, value) => {
                    const { description } = value;
                    handleInput(event);
                    handleChange((data) => ({...data, [name]: description}));
                }}
                
                renderInput={(params) =>
                    <TextField {...params} 
                               required
                               isOptionEqualToValue={(option, value) => option.description === value.description}
                               name={name}
                               onChange={handleInput}
                               label={label}
                               value={valueProp}
                               InputLabelProps={{
                                   shrink: true
                               }}
                               style={style}
                    />}
            />
        </div>
    );
}

export default PlacesAutoComplete;