import { memo, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import FuseNavigation from "@fuse/core/FuseNavigation";
import clsx from "clsx";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { navbarCloseMobile } from "app/store/fuse/navbarSlice";
import { getMenus } from "../store/fuse/menuActions";


function Navigation(props) {
	const dispatch = useDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

	const stateMenu = useSelector((state) => {
		return state?.fuse.menus;
	});

	const [menu, setMenu] = useState(stateMenu.menus);

	useEffect(() => {
		dispatch(getMenus());
	}, []);

	function eliminarDuplicadosPorPropiedad(arr, propiedad) {
		const objetoAuxiliar = {};
		const arraySinDuplicados = [];

		for (const elemento of arr) {
			const valorPropiedad = elemento[propiedad];

			if (!objetoAuxiliar[valorPropiedad]) {
				objetoAuxiliar[valorPropiedad] = true;
				arraySinDuplicados.push(elemento);
			}
		}

		return arraySinDuplicados;
	}

	let menuFilter = eliminarDuplicadosPorPropiedad(menu, "id");

    // Al montar la aplicacion, asigna el estado del menu, y si el menu cambia, lo vuelve a asignar
	useEffect(() => {
		setMenu(stateMenu.menus); 
	}, [stateMenu]);

	return useMemo(() => {
		function handleItemClick(item) {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<FuseNavigation
				className={clsx("menuFilter", props.className)}
				navigation={menuFilter}
				layout={props.layout}
				dense={props.dense}
				active={props.active}
				onItemClick={handleItemClick}
			/>
		);
	}, [
		dispatch,
		isMobile,
		props.active,
		props.className,
		props.dense,
		props.layout,
		menu,
	]);
}

Navigation.defaultProps = {
	layout: "vertical",
};

const mapStateToProps = (states, ownProps) => {
	return {
		availableMenus: states.fuse.menus.menus,
		auth: states.user.data,
	};
};

export default memo(connect(mapStateToProps)(Navigation));
