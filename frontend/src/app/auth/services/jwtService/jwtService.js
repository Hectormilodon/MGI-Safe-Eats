import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import { ApiUserAuth, endpoints_userAuthApi } from "./../../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = new ApiUserAuth();

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(err) => {
				return new Promise((resolve, reject) => {
					if (
						err.response.status === 401 &&
						err.config &&
						!err.config.__isRetryRequest
					) {
						// if you ever get an unauthorized response, logout the user
						this.emit("onAutoLogout", "Invalid access_token");
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit("onNoAccessToken");

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit("onAutoLogin", true);
		} else {
			this.setSession(null);
			this.emit("onAutoLogout", "access_token expired");
		}
	};

	createUser = (data) => {
		return new Promise((resolve, reject) => {
			axios.post(jwtServiceConfig.signUp, data).then((response) => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
					this.emit("onLogin", response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			const payload = {
				email: email,
				password: password,
			};
			api
				.post(endpoints_userAuthApi.LOGIN, payload)
				.then((response) => {
					if (response.msg) {
						const arrayResponse = [
							{
								type: "email",
								message: "Invalid email or password",
							},
						];
						reject(arrayResponse);
						return;
					}
					if (response) {
						let user = {};
						user.data = response.user;
						user.data.displayName = response.user.name;
						user.data.role = "admin";
						user.role = "admin";
						this.setSession(response.token);
						this.setAuth(user.data);
						resolve(user);
						this.emit("onLogin", user);
					} else {
						reject(response);
					}
				})
				.catch((error) => {
					toast.error("Usuario y/o contraseña incorrecta", {
						position: "top-center",
						autoClose: 2000,
					});
					this.emit("offService");
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			const access_token = this.getAccessToken();
			api
				.post(endpoints_userAuthApi.VERIFY, "")
				.then((response) => {
					if (response) {
						let user = {};
						user.data = response;
						user.data.displayName = response.name;
						user.role = "admin";
						this.setSession(access_token);
						//this.setAuth(user.data);
						resolve(user);
					} else {
						this.logout();
						reject(new Error("Failed to login with token."));
					}
				})
				.catch((error) => {
					console.log("🚀 ~ JwtService ~ returnnewPromise ~ error:", error);
					this.logout();
					reject(new Error("Failed to login with token."));
				});
		});
	};

	updateUserData = (user) => {
		return axios.post(jwtServiceConfig.updateUser, {
			user,
		});
	};

	setAuth = (userAuth) => {
		if (userAuth) {
			localStorage.setItem("sessionApp", JSON.stringify(userAuth));
			//axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem("sessionApp");
			localStorage.clear();
			sessionStorage.clear();
			//delete axios.defaults.headers.common.Authorization;
		}
	};

	setSession = (access_token) => {
		if (access_token) {
			localStorage.setItem("jwt_access_token", access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem("jwt_access_token");
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		localStorage.clear();
		this.setSession(null);
		this.setAuth(null);
		// location.reload();
		this.emit("onLogout", "Logged out");
	};

	isAuthTokenValid = (access_token) => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn("access token expired");
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem("jwt_access_token");
	};
}

const instance = new JwtService();

export default instance;
