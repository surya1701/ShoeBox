import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { Controller } from "react-hook-form";

const sizes = [
    {
        label: "6",
        value: "6",
    },
    {
        label: "7",
        value: "7",
    },
    {
        label: "8",
        value: "8",
    },
    {
        label: "9",
        value: "9",
    },
    {
        label: "10",
        value: "10",
    }
];

const FormInputRadio = ({ name, control }) => {

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
                                key={size.value}
                                value={size.value}
                                control={<Radio />}
                                label={size.label}
                            />)}
                    </RadioGroup>
                )}
            />
        </FormControl>
    )
};
export default FormInputRadio;