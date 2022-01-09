import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../checkout/Forms/FormField";

const Comment = ({ handleComment, user }) => {

  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            handleComment({ ...data })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="comment" label="Comment" size={8} type="text" />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Enter
            </Button>
          </Grid>
          <br />
        </form>
      </FormProvider>
    </>
  );
};

export default Comment;