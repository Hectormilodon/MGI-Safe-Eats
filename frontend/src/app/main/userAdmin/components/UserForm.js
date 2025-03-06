import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRol } from "utils/getRol";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { addUser, removeUser, updateUser, selectUser, getUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import { ApiUserAdmin, endpoints_userAdmin } from "src/app/api/userAdminApi";

import { useDeepCompareEffect } from "@fuse/hooks";

const roles = [
  {
    name: "Administrador",
    id: 1,
  },
  {
    name: "Supervisor",
    id: 2,
  },
  {
    name: "Auditor",
    id: 3,
  },
  {
    name: "Cliente",
    id: 4,
  },
];

const api = new ApiUserAdmin();

function UserForm(props) {
  const { isEdit, userId, handleClose } = props;

  const [openDelete, setOpenDelete] = useState(false);
  const [rolSelected, setRolSelected] = useState("");

	const user = useSelector(selectUser);

  const dispatch = useDispatch();

	useDeepCompareEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch]);

  const schema = yup.object().shape({
    name: yup.string().trim().required("Nombre es requerido"),
    email: yup.string().trim().email().required("Email es requerido"),
    password: yup.string(),
    rol_id: yup.string().required("Rol es requerido"),
    active: yup.boolean().nullable().optional(),
  });

  const notifyAddOk = () =>
    toast.success("Usuario creado con exito", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyAddError = () =>
    toast.error("No se pudo crear el usuario", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateOk = () =>
    toast.success("Usuario editado con exito", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateError = () =>
    toast.error("Error al intentar actualizar usuario", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyDuplicateError = () =>
    toast.error("El usuario ya existe!", {
      position: "top-center",
      autoClose: 2000,
    });


  const { control, reset, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      rol_id: user ? user.rol_id : "",
    },
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    reset({ ...user });
  }, [user, reset]);

  async function onSubmit(data) {
    if (!isEdit) {
      try {
        data.email = data.email.trim().toUpperCase();
        const duplicado = await api.post(endpoints_userAdmin.USER_EMAIL, data);
        if (duplicado.length > 0) {
          notifyDuplicateError();
        } else {
          data.active = true;
          data.email = data.email.toLowerCase();
          dispatch(addUser(data)).then((response) => {
            notifyAddOk();
            handleClose();
          });
        }
      } catch (err) {
        notifyAddError();
      }
    } else {
      try {
        // data.email = data.email.trim().toUpperCase();
        // const duplicado = await api.post(endpoints_userAdmin.USER_EMAIL, data);
        // if (duplicado.length > 0) {
        //   notifyDuplicateError();
        // } else {
        dispatch(updateUser(data)).then((response) => {
          notifyUpdtateOk();
          handleClose();
        });
        // }
      } catch (err) {
        notifyUpdtateError();
      }
    }
  }

  async function handleRemoveUser() {
    dispatch(removeUser(user)).then((response) => {
      notifyUpdtateOk();
      handleClose();
    });
  }

  //dialog delete
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Box sx={{ margin: "10px 260px", width: "15px" }}>
        <Button color="error" onClick={handleClose} variant="contained">
          <span>Cancelar</span>
        </Button>
      </Box>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="name"
          render={({ field }) => {
            return (
              <TextField
                className="mt-32"
                {...field}
                label="Nombre"
                placeholder="Nombre usuario"
                id="name"
                error={!!errors.name}
                helperText={errors?.name?.message}
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>
                        heroicons-solid:user-circle
                      </FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Email"
              placeholder="Email Usuario"
              id="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Password"
              placeholder="Password"
              type="password"
              id="rut"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-outline:identification
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="rol_id"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" className="mt-32">
              <InputLabel>Rol</InputLabel>
              <Select
                fullWidth
                label="Rol"
                value={value ? value : ""}
                onChange={(event, newValue) => {
                  onChange(event.target.value);
                  setRolSelected(getRol(event.target.value));
                }}
              >
                {roles.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    {rol.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </div>
      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: "background.default" }}
      >
        {isEdit && (
          <Button
            color="error"
            onClick={handleClickOpenDelete}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        )}
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
          disabled={_.isEmpty(dirtyFields) || !isValid}
          //   onClick={handleSubmit(onSubmit)}
          //   onClick={handleClickOpenSave}
        >
          Guardar
        </Button>
      </Box>

      <Dialog
        open={openDelete}
        onClose={handleClickCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Estás seguro que deseas eliminar el usuario?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClickCloseDelete}>Cancelar</Button>
          <Button onClick={handleRemoveUser} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserForm;
