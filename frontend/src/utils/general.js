const formatDate = (d1) => {
	if (d1) {
		const fecha = new Date(d1.toString());
		if (typeof fecha === "object" && fecha !== null) {
			const result = formatDateFunction(fecha, "-");

			return result;
		}
	}
};

function formatDateFunction(date, join) {
	let newDate = [
		padTo2Digits(date.getDate()),
		padTo2Digits(date.getMonth() + 1),
		date.getFullYear(),
	].join(join);
	return newDate;
}

function padTo2Digits(num) {
	return num.toString().padStart(2, "0");
}
