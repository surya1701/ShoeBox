import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, size, type, fill }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={size}>
      <Controller
        control={control}
        name={name}
        render={({
            field: {onChange},
          }) => (
            (fill)? 
            <TextField label={label} type={type} value={fill} readonly required fullWidth onChange={onChange}/>:
            <TextField label={label} type={type} required fullWidth onChange={onChange}/>
        )}
        />
    </Grid>
  );
};

export default FormInput;