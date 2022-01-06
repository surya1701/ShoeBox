import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, size, type, value }) => {
  const { control } = useFormContext();
  if (!value) value = "";
  return (
    <Grid item xs={12} sm={size}>
      <Controller
        control={control}
        name={name}
        render={({
            field: {onChange},
          }) => (
            <TextField label={label} type={type} value={value} required fullWidth onChange={onChange}/>
        )}
        />
    </Grid>
  );
};

export default FormInput;