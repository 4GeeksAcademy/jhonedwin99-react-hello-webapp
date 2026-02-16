import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
				</Link>
				<div className="ml-auto">
					<Link to="/add-contact">
						<button className="btn btn-success">add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};