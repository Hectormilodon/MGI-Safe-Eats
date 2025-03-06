import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { DateTimePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { selectUser } from "../../../store/userSlice";
import { ApiUserLocal, endpoints_userLocal } from 'app/api/userLocalApi';
import { useSelector } from "react-redux";


const defaultValues = {
    Select: '',
    // DateTimePicker: ''
};

/**
 * Form Validation Schema
 */
const schema = z.object({
    Select: z
        .string()
        .nonempty('Debes seleccionar un local'),
    // DateTimePicker: z.string().refine((val) => val === null || val.trim().length > 0, 'Debes seleccionar una fecha')
});


function ChartForm(props) {
    const { setLocalSelected } = props;

    const [locals, setLocals] = useState([])

    const api = new ApiUserLocal()

    const user = useSelector(selectUser);
    
    const getLocalsByUser = async () => {
        const response = await api.get(endpoints_userLocal.USERLOCALBYUSERID(user.data.id))
        setLocals(response)
    }
    useEffect(() => {
        getLocalsByUser()
    }, [])

    const { handleSubmit, reset, control, formState } = useForm({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = (formData) => {
        const { Select } = formData
        setLocalSelected(Select)
    }

    return (

        <div className="flex w-full max-w-screen-md ">
            <form
                className="form grid grid-cols-2 gap-16 my-24"
                // eslint-disable-next-line no-console
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="flex items-center">
                    <Controller
                        render={({ field }) => (
                            <FormControl
                                error={!!errors.Select}
                                required
                                fullWidth
                                sx={{ m: 1, minWidth: 120 }} size="small"
                            >
                                <FormLabel
                                    className="font-medium text-14"
                                    component="legend"
                                >
                                    Selecciona el local
                                </FormLabel>
                                <Select
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {locals.map((local) => {
                                        return (
                                        <MenuItem value={(local.local.id).toString()}>{local.local.fantasy_name}</MenuItem>
                                    )
                                    })}

                                </Select>
                                <FormHelperText>{errors?.Select?.message}</FormHelperText>
                            </FormControl>
                        )}
                        name="Select"
                        control={control}
                    />
                </div>


                {/* 
                <div className="mt-48 mb-16">
                    <Typography className="mb-24 font-medium text-14">Fecha</Typography>

                    <Controller
                        name="DateTimePicker"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={new Date(value)}
                                onChange={onChange}
                                slotProps={{
                                    textField: {
                                        id: 'birthday',
                                        label: 'Birthday',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        fullWidth: true,
                                        variant: 'outlined',
                                        error: !!errors.DateTimePicker,
                                        helperText: errors?.DateTimePicker?.message
                                    },
                                    inputAdornment: {
                                        position: 'start',
                                        children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
                                    }
                                }}
                            />
                        )}
                    />
                </div> */}

                <div className="flex  items-center">
                    <Button
                        className="mx-8"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="small"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                    >
                        Buscar
                    </Button>

                    <Button
                        className="mx-8"
                        type="button"
                        size="small"
                        onClick={() => {
                            reset(defaultValues);
                        }}
                    >
                        Reiniciar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ChartForm;