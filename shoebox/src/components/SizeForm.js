import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

const sizes = [
{
    label: "Small",
    value: "Small",
},
{
    label: "Medium",
    value: "Medium",
},
{
    label: "Large",
    value: "Large",
    }
];

const FormInputRadio = ({ name,control }) => {

  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">Size</FormLabel>
        <Controller
            rules={{ required: true }}
            control={control}
            name={name}
            render={({ field }) => (
                <RadioGroup {...field}>
                <FormControlLabel
                    value="small"
                    control={<Radio />}
                    label="Small"
                />
                <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                />
                <FormControlLabel
                    value="large"
                    control={<Radio />}
                    label="Large"
                />
                </RadioGroup>
            )}
            />
    </FormControl>
    )
};
export default FormInputRadio;