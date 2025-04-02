import { Navigate, Outlet } from 'react-router-dom';
import { useName } from '../context/NameContext';

function Protected() {
	const { state } = useName();
	if (!state.name) {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
}

export default Protected;
