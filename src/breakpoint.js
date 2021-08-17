const size = {
	xs: "450px",
	sm: "700px",
	md: "1000px"
};
const device = {
	xs: `(min-width: ${size.xs})`,
	sm: `(min-width: ${size.sm})`,
	md: `(min-width: ${size.md})`
};

export default { size, device };
