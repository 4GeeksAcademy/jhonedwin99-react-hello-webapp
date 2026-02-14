import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	function getcontactList() {
		fetch('https://playground.4geeks.com/contact/agendas/jhonedwin99')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.contacts)
				dispatch({
					type: 'load_contacts',
					payload: data.contacts
				})
			})
	}

	useEffect(() => {
		console.log("se cargo el componente")
		getcontactList();
	}, []);

	function deleteContact(idToDelete) {
		console.log("deleteContact" + idToDelete)

		const requestOptions = {
			method: "DELETE"
		};

		fetch(`https://playground.4geeks.com/contact/agendas/jhonedwin99/contacts/${idToDelete}`, requestOptions)
			.then((data) => {
				console.log(data)
				getcontactList();
			});
	}

	return (
		<div className="container mt-5">

			<ul className="list-group">
				{/* Map over the 'todos' array from the store and render each item as a list element */}
				{store && store.contacts?.map((item) => {
					return (
						<li
							key={item.id}
							className="list-group-item d-flex justify-content-between align-items-center"
						>
							<div className="d-flex align-items-center">

								<div
									className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
									style={{ width: "70px", height: "70px", fontSize: "28px" }}
								>
									{item.name.charAt(0).toUpperCase()}
								</div>

								<div>
									<h5 className="mb-1">{item.name}</h5>
									<p className="mb-1 text-muted">📍 {item.address}</p>
									<p className="mb-1 text-muted">📞 {item.phone}</p>
									<p className="mb-0 text-muted">✉ {item.email}</p>
								</div>

							</div>

							<div>
								<Link to={`/edit/${item.id}`}>
								<button className="btn btn-outline-secondary me-2">
									<i className="fas fa-pencil-alt"></i>
								</button>
								</Link>

								<button className="btn btn-outline-danger"
								onClick={() => deleteContact(item.id)}
								>
									<i className="fas fa-trash"></i>
								</button>
							</div>
						</li>
					);
				})}
			</ul>
			<br />
		</div>
	);
}