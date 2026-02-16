import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const { store } = useGlobalReducer();

useEffect(() => {
    if (id) {
        const contactToEdit = store.contacts.find(
            (contact) => contact.id == id
        );

        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name || "",
                email: contactToEdit.email || "",
                phone: contactToEdit.phone || "",
                address: contactToEdit.address || ""
            });
        }
    }
}, [id, store.contacts]);


    function saveContact(e) {
        e.preventDefault();

        const requestOptions = {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                angenda_slug: "jhonedwin99"
            })
        };

         const url = id
        ? `https://playground.4geeks.com/contact/agendas/jhonedwin99/contacts/${id}`
        : "https://playground.4geeks.com/contact/agendas/jhonedwin99/contacts";

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/");
            });
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add a new contact</h1>

            <form onSubmit={saveContact}>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Save
                </button>

            </form>

            <Link to="/" className="mt-3 d-block">
                or get back to contacts
            </Link>
        </div>
    );
};
