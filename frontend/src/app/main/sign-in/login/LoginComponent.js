import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import { AxiosError } from 'axios';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import jwtService from '../../../auth/services/jwtService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('Debes ingresar un email válido'),
	password: z
		.string()
		.min(4, 'Contraseña muy corta, debe tener al menos 4 carácteres.')
});


const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function LoginComponent() {

	const { control, formState, handleSubmit, setValue, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	// useEffect(() => {
	// 	setValue('email', 'admin@mgiasesorias.com', { shouldDirty: true, shouldValidate: true });
	// 	setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
	// }, [setValue]);

	function onSubmit(formData) {
		const { email, password } = formData;

		jwtService
			.signInWithEmailAndPassword(
				email,
				password
			)
			.then((user) => {
				// No need to do anything, user data will be set at app/auth/AuthContext
			  })
			  .catch((_errors) => {
				_errors.forEach((error) => {
				  setError(error.type, {
					type: "email",
					message: "Email o Password invalidos",
				  });
				});
			  });
	}

	return (
		<div className="w-full">
			<form
				name="loginForm"
				noValidate
				className="mt-32 flex w-full flex-col justify-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-24"
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

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-24"
							label="Password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							variant="outlined"
							required
							fullWidth
						/>
					)}
				/>

				<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
					<Controller
						name="remember"
						control={control}
						render={({ field }) => (
							<FormControl>
								<FormControlLabel
									label="Recuérdame"
									control={
										<Checkbox
											size="small"
											{...field}
										/>
									}
								/>
							</FormControl>
						)}
					/>
				</div>

				<Button
					variant="contained"
					color="secondary"
					className=" mt-16 w-full"
					aria-label="Sign in"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					type="submit"
					size="large"
				>
					Iniciar sesión
				</Button>
			</form>
		</div>
	);
}

export default LoginComponent;
