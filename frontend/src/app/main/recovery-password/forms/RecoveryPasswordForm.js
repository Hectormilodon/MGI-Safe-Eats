import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const RecoveryPasswordForm = (props) => {
  const { onSubmit } = props;

  const schema = yup.object().shape({
    email: yup.string().email('Debes ingresar un email válido').required('Debes ingresar un email'),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields, errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [t] = useTranslation("global");

  return (
    <form
      name="forgotPassForm"
      noValidate
      className="flex flex-col justify-center w-full mt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        className="text-4xl font-extrabold leading-tight tracking-tight"
        variant="body1">
        {"Olvidaste tu contraseña?"}
      </Typography>
      <div className="mt-2 flex items-baseline font-medium">
        <Typography
          variant="body1">
          {"Ingresa tu email para recuperar tu contraseña"}
        </Typography>
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24 mt-32"
            label="Email"
            autoFocus
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            variant="outlined"
            required
            fullWidth
          />
        )}
      />
      <Button
        variant="contained"
        color="secondary"
        className=" w-full mt-16"
        aria-label="Reset password"
        disabled={_.isEmpty(dirtyFields) || !isValid}
        type="submit"
        size="large"
      >
        {t("Recuperar")}
      </Button>

    </form>
  );
};

export default RecoveryPasswordForm;
