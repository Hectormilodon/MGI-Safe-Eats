import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  getEmpAdmins,
  selectEmpAdmins,
} from "../../empAdmin/store/empAdminsSlice";
import {
  addLocalAdmin,
  getLocalAdmin,
  removeLocalAdmin,
  selectLocalAdmin,
  updateLocalAdmin,
} from "../store/localAdminSlice";
import { useDeepCompareEffect } from "@fuse/hooks";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  ApiUserAdmin,
  endpoints_userAdmin,
  endpoints_localAdmin,
} from "../../../api";
import { getUsers, selectUsers } from "../../userAdmin/store/usersSlice";

const plans = [
  {
    name: "Basic",
    id: 1,
  },
  {
    name: "Premium",
    id: 2,
  },
];

const api = new ApiUserAdmin();

function LocalForm(props) {
  const { isEdit, handleClose, localId } = props;

  const [openDelete, setOpenDelete] = useState(false);
  const [empAdminSelected, setEmpAdminSelected] = useState("");
  const [premiumChecked, setPremiumChecked] = useState(false);

  const [supervisorList, setSupervisorList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [auditorList, setAuditorList] = useState([]);

  const local = useSelector(selectLocalAdmin);
  const empAdmins = useSelector(selectEmpAdmins);

  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useDeepCompareEffect(() => {
    dispatch(getEmpAdmins());
    dispatch(getLocalAdmin(localId));
    dispatch(getUsers());
    users.forEach((user) => {
      if (user.rol_id == 4) {
        setClientList([...clientList, user]);
      } else if (user.rol_id == 2) {
        setSupervisorList([...supervisorList, user]);
      } else if (user.rol_id == 3) {
        setAuditorList([...auditorList, user]);
      }
    });
  }, [dispatch]);

  const schema = yup.object().shape({
    fantasy_name: yup
      .string()
      .trim()
      .required("Nombre de fantasia es requerido"),
    premium: yup.boolean(),
    address: yup.string().required("Sucursal es requerido"),
    company_name: yup
      .string()
      .trim()
      .required("Nombre de compañia es requerido"),
    id_emp_admin: yup.string().optional(),
    rut: yup.string().trim().required("Rut es requerido"),
    num_auth_sani: yup.string().nullable().optional(),
    active: yup.boolean().nullable().optional(),
    client_id: yup.string().nullable().optional(),
  });

  const notifyAddOk = () =>
    toast.success("Local creado con exito", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyAddError = () =>
    toast.error("No se pudo crear el local", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateOk = () =>
    toast.success("Actualización exitosa", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyUpdtateError = () =>
    toast.error("Error al intentar actualizar usuario", {
      position: "top-center",
      autoClose: 1000,
    });

  const notifyDuplicateError = () =>
    toast.error("La empresa ya existe!", {
      position: "top-center",
      autoClose: 2000,
    });

  const { control, watch, reset, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fantasy_name: local ? local.fantasy_name : "",
      premium: local && local.premium ? local.premium : false,
      address: local ? local.address : "",
      company_name: local ? local.company_name : "",
      id_emp_admin: "0",
      rut: local ? local.rut : "",
      num_auth_sani: local && local.num_auth_sani ? local.num_auth_sani : "",
      client_id: local && local.client ? local.client : "",
    },
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    reset({ ...local });
  }, [local, reset]);

  async function onSubmit(data) {
    if (!isEdit) {
      try {
        data.fantasy_name = data.fantasy_name.trim().toUpperCase();
        const duplicado = await api.post(endpoints_localAdmin.LOCAL_NOM, data);
        if (duplicado.length > 0) {
          notifyDuplicateError();
        } else {
          if (!data.premium) data.premium = premiumChecked;
          dispatch(addLocalAdmin(data)).then((response) => {
            notifyAddOk();
            handleClose();
          });
        }
      } catch (err) {
        notifyAddError();
      }
    } else {
      try {
        data.fantasy_name = data.fantasy_name.trim().toUpperCase();
        data.id = local.id;
        data.client_id = Number(data.client_id);

        if (!data.premium) data.premium = premiumChecked;

        const duplicado = await api.post(endpoints_localAdmin.LOCAL_NOM, data);
        if (duplicado.length > 1) {
          notifyDuplicateError();
        } else {
          dispatch(updateLocalAdmin(data)).then((response) => {
            notifyUpdtateOk();
            handleClose();
          });
        }
      } catch (error) {
        notifyUpdtateError();
      }
    }
  }

  async function handleRemoveLocal() {
    dispatch(removeLocalAdmin(local)).then((response) => {
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

  const handlePremiumChange = () => {
    setPremiumChecked(!premiumChecked);
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
          name="fantasy_name"
          render={({ field, value }) => {
            return (
              <TextField
                className="mt-32"
                {...field}
                label="Nombre de fantasia"
                placeholder="Nombre de fantasia"
                id="fantasy_name"
                error={!!errors.fantasy_name}
                helperText={errors?.fantasy_name?.message}
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
          name="address"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Sucursal"
              placeholder="Lugar Sucursal"
              id="sucursal"
              error={!!errors.address}
              helperText={errors?.address?.message}
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
          name="company_name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Nombre Compañia"
              placeholder="Nombre Compañia"
              type="text"
              id="company_name"
              error={!!errors.company_name}
              helperText={errors?.company_name?.message}
              variant="outlined"
              fullWidth
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
          name="rut"
          render={({ field }) => {
            return (
              <TextField
                className="mt-32"
                {...field}
                label="Rut"
                placeholder="Rut"
                id="rut"
                error={!!errors.fantasy_name}
                helperText={errors?.fantasy_name?.message}
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
          name="client_id"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" className="mt-32">
              <InputLabel>Cliente Administrador</InputLabel>
              <Select
                fullWidth
                label="Cliente Administrador"
                onChange={(event, newValue) => {
                  onChange(event.target.value);
                  setEmpAdminSelected(getRol(event.target.value));
                }}
              >
                {clientList.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="supervisor_id"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" className="mt-32">
              <InputLabel>Supervisor</InputLabel>
              <Select
                fullWidth
                label="Supervisor"
                onChange={(event, newValue) => {
                  onChange(event.target.value);
                  setEmpAdminSelected(getRol(event.target.value));
                }}
              >
                {supervisorList.map((supervisor) => (
                  <MenuItem key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="auditor_id"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" className="mt-32">
              <InputLabel>Auditor</InputLabel>
              <Select
                fullWidth
                label="Auditor"
                onChange={(event, newValue) => {
                  onChange(event.target.value);
                  setEmpAdminSelected(getRol(event.target.value));
                }}
              >
                {auditorList.map((auditor) => (
                  <MenuItem key={auditor.id} value={auditor.id}>
                    {auditor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="id_emp_admin"
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth margin="normal" className="mt-32">
              <InputLabel>Empresa Administradora</InputLabel>
              <Select
                fullWidth
                label="Empresa Administradora"
                onChange={(event, newValue) => {
                  onChange(event.target.value);
                  setEmpAdminSelected(getRol(event.target.value));
                }}
              >
                {empAdmins.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="num_auth_sani"
          render={({ field }) => {
            return (
              <TextField
                className="mt-32"
                {...field}
                label="Numero autorización sanitaria"
                placeholder="1111 12-12-2024"
                id="num_auth_sani"
                variant="outlined"
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
          name="premium"
          id="premium"
          render={({ field }) => {
            return (
              <FormControlLabel
                id="premium"
                control={
                  <Switch
                    defaultChecked
                    checked={premiumChecked}
                    onChange={handlePremiumChange}
                  />
                }
                label="Premium"
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
          // disabled={_.isEmpty(dirtyFields)}
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
          ¿Estás seguro que deseas eliminar el local?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClickCloseDelete}>Cancelar</Button>
          <Button onClick={handleRemoveLocal} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LocalForm;
