import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { Controller } from "react-hook-form";

const FormInputRadio = ({ name, sizes, control }) => {

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Size</FormLabel>
            <Controller
                rules={{ required: true }}
                control={control}
                name={name}
                render={({ field }) => (
                    <RadioGroup {...field} row>
                        {sizes.map((size) =>
                            <FormControlLabel
                                key={size}
                                value={size}
                                control={<Radio />}
                                label={size}
                            />)}
                    </RadioGroup>
                )}
            />
        </FormControl>
    )
};
export default FormInputRadio;