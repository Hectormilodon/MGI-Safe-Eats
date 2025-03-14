import React from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const RecoveryNewPasswordForm = (props) => {
  const { onSubmit } = props;
  const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange', // Actualiza el estado de 'isValid' con cada cambio
  });

  console.log("🚀 ~ RecoveryNewPasswordForm ~ isValid:", isValid)
  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  // Lógica para habilitar el botón 
  const isSubmitEnabled = newPassword === confirmNewPassword && isValid;

  return (
    <form
      name="forgotPassForm"
      noValidate
      className="flex flex-col justify-center w-full mt-32"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="newPassword"
        control={control}
        rules={{ required: 'Este campo es requerido' }}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-12 mt-12"
            label={"Nueva contraseña"}
            autoFocus
            type="password"
            variant="outlined"
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="confirmNewPassword"
        control={control}
        rules={{
          validate: value =>
            value === newPassword || 'Las contraseñas no coinciden',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-12 mt-12"
            label={"Confirmar contraseña"}
            autoFocus
            type="password"
            variant="outlined"
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
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
        disabled={!isSubmitEnabled}
        type="submit"
        size="large"
      >
        {"Cambiar contraseña"}
      </Button>
    </form>
  );
};

export default RecoveryNewPasswordForm;
