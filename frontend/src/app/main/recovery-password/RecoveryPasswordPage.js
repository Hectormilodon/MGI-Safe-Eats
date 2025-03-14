import _ from "@lodash";
import Paper from "@mui/material/Paper";
import { ApiUserAuth, endpoints_userAuthApi } from "src/app/api";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import RecoveryPasswordForm from "./forms/RecoveryPasswordForm";
import RecoveryNewPasswordForm from "./forms/RecoveryNewPasswordForm";
import React from "react";

const apiUserAuth = new ApiUserAuth()

// Exit or error messages
const confToast = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 1000,
};

const notifyAddOk = () =>
  toast.success("Email enviado con éxito", confToast);

const notifyNewPassOk = () =>
  toast.success("Contraseña modificada con éxito", confToast);

const notifyAddError = () =>
  toast.error("Ocurrió un error, por favor intentar de nuevo", confToast);

function RecoveryPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  //Recuperar contraseña
  const onSubmit = async (formData) => {
    const { email } = formData;
    const payload = { email: email }
    // const result = await apiUserAuth.post(endpoints_userAuthApi.RECOVERYPASSWORD, payload);
    const result = "hola"
    if (!result) {
      notifyAddError();
      return;
    }
    if (!result.status) {
      notifyAddError();
    } else {
      notifyAddOk();
      navigate('/sign-in')
    }
  }

  //Cambiar contraseña
  const onSubmitNewPass = async (formData) => {
    const { newPassword, confirmNewPassword } = formData;
    const payload = { newPassword: newPassword, confirmNewPassword: confirmNewPassword };
    const result = await apiUserAuth.recoveryNewPassword(endpoints_userAuthApi.RESETPASSWORD, payload, token);

    if (!result) {
      console.log("Pase por aca 1")
      notifyAddError();
      return;
    } else {
      notifyNewPassOk();
      navigate('/sign-in')
    }
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 ">
          {/* <img className="w-400" src="assets/images/logo/logoSinBallena.png" alt="logo" /> */}
          {token ? (
            <RecoveryNewPasswordForm
              onSubmit={onSubmitNewPass}
            />
          ) : (
            <RecoveryPasswordForm
              onSubmit={onSubmit}
            />
          )}
          <p className="MuiTypography-root MuiTypography-body1 mt-32 text-md font-medium muiltr-1n33bq6">
            <span>
              Volver a
            </span>
            <a className="ml-4" href="/sign-in">
              Inicio de sesión</a>
          </p>
        </div>
      </Paper>
    </div>
  );
}

export default RecoveryPasswordPage;