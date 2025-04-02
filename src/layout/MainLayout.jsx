import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<div className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-200">
			<Outlet />
		</div>
	);
}

export default MainLayout;
