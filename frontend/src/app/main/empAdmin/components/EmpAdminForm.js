import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  addEmpAdmin,
  updateEmpAdmin,
  removeEmpAdmin,
} from "../store/empAdminSlice";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiEmpAdmin, endpoints_empAdmin } from "src/app/api/EmpAdminApi";
import DeleteIcon from "@mui/icons-material/Delete";

const api = new ApiEmpAdmin();

function EmpAdminForm(props) {
  const [openDelete, setOpenDelete] = useState(false);
  const { isEdit, empAdmin, handleClose } = props;

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().trim().required("Nombre es requerido"),
    active: yup.boolean().optional(),
  });

  const notifyAddOk = () =>
    toast.success("Empresa creada con exito", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyAddError = () =>
    toast.error("No se pudo crear la empresa", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateOk = () =>
    toast.success("Actualización exitosa", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateError = () =>
    toast.success("Error al intentar actualizar la empresa", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyDuplicateError = () =>
    toast.error("La empresa ya existe!", {
      position: "top-center",
      autoClose: 2000,
    });

  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: empAdmin ? empAdmin.name : "",
    },
  });

  useEffect(() => {
    reset({ ...empAdmin });
  }, [empAdmin, reset]);

  const { isValid, dirtyFields, errors } = formState;

  async function onSubmit(data) {
    if (!isEdit) {
      try {
        data.active = true;
        data.name = data.name.trim().toUpperCase();
        const duplicado = await api.post(endpoints_empAdmin.EMPADMIN_NOM, data);
        if (duplicado.length > 0) {
          notifyDuplicateError();
        } else {
          dispatch(addEmpAdmin(data)).then(() => {
            notifyAddOk();
            handleClose();
          });
        }
      } catch (err) {
        notifyAddError()
      }
    } else {
      try {
        data.name = data.name.trim().toUpperCase();
        data.id = empAdmin.id;

        const duplicado = await api.post(endpoints_empAdmin.EMPADMIN_NOM, data);

        if (duplicado.length > 0) {
          notifyDuplicateError();
        } else {
          dispatch(updateEmpAdmin(data)).then((response) => {
            notifyUpdtateOk();
            handleClose();
          });
        }
      } catch (error) {
        notifyUpdtateError();
      }
    }
  }

  async function handleRemoveEmpAdmin() {
    dispatch(removeEmpAdmin(empAdmin)).then((response) => {
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
        <Button onClick={handleClose} color="error" variant="contained">
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
                placeholder="Nombre empresa"
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
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSubmit(onSubmit)}
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
          ¿Estás seguro que deseas eliminar la empresa administradora?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClickCloseDelete}>Cancelar</Button>
          <Button onClick={handleRemoveEmpAdmin} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmpAdminForm;
