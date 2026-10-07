import React from "react";
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
} from "lucide-react";

import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

function Destinations({ destinations, setDestinations, showToast }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    country: "",
    image: "",
    description: "",
  });

  const filtered = useMemo(() => {
    return destinations.filter((destination) =>
      `${destination.name} ${destination.country}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [destinations, search]);

  const openAdd = () => {
    setForm({
      name: "",
      country: "",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      description: "",
    });

    setSelected(null);
    setModal("form");
  };

  const openEdit = (destination) => {
    setSelected(destination);
    setForm({
      name: destination.name,
      country: destination.country,
      image: destination.image,
      description: destination.description,
    });
    setModal("form");
  };

  const saveDestination = () => {
    if (!form.name || !form.country || !form.description) {
      showToast("Please fill all required fields.");
      return;
    }

    if (selected) {
      setDestinations((prev) =>
        prev.map((item) =>
          item.id === selected.id
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );

      showToast("Destination updated successfully.");
    } else {
      setDestinations((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          trips: 0,
          status: "Active",
        },
      ]);

      showToast("Destination added successfully.");
    }

    setModal(null);
  };

  const deleteDestination = () => {
    setDestinations((prev) =>
      prev.filter((item) => item.id !== selected.id)
    );

    setModal(null);
    showToast("Destination deleted successfully.");
  };

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Destinations</h1>
          <p>Manage your travel destinations.</p>
        </div>

        <button className="btn primary" onClick={openAdd}>
          <Plus size={18} />
          Add Destination
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations..."
          />
        </div>

        <div className="filter-result">
          {filtered.length} destinations
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <MapPin size={45} />
          <h2>No destinations found</h2>
          <p>Try changing your search.</p>
        </div>
      ) : (
        <div className="destination-grid">
          {filtered.map((destination) => (
            <div className="destination-card" key={destination.id}>
              <div className="destination-image">
                <img
                  src={destination.image}
                  alt={destination.name}
                />

                <span className="image-status">
                  {destination.status}
                </span>
              </div>

              <div className="destination-content">
                <div className="destination-title">
                  <div>
                    <h3>{destination.name}</h3>
                    <span>
                      <MapPin size={14} />
                      {destination.country}
                    </span>
                  </div>
                </div>

                <p>{destination.description}</p>

                <div className="destination-footer">
                  <span>{destination.trips} trips</span>

                  <div className="action-buttons">
                    <button
                      onClick={() => {
                        setSelected(destination);
                        setModal("view");
                      }}
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => openEdit(destination)}
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setSelected(destination);
                        setModal("delete");
                      }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modal === "form"}
        title={selected ? "Edit Destination" : "Add Destination"}
        onClose={() => setModal(null)}
        onConfirm={saveDestination}
        confirmText={selected ? "Update" : "Add Destination"}
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Destination Name *</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="e.g. Paris"
            />
          </div>

          <div className="form-group">
            <label>Country *</label>
            <input
              value={form.country}
              onChange={(e) =>
                setForm({
                  ...form,
                  country: e.target.value,
                })
              }
              placeholder="e.g. France"
            />
          </div>

          <div className="form-group full">
            <label>Image URL</label>
            <input
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group full">
            <label>Description *</label>
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Destination description..."
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={modal === "view"}
        title="Destination Details"
        onClose={() => setModal(null)}
      >
        {selected && (
          <div className="detail-view">
            <img src={selected.image} alt={selected.name} />
            <h2>{selected.name}</h2>
            <p>
              <strong>Country:</strong> {selected.country}
            </p>
            <p>
              <strong>Trips:</strong> {selected.trips}
            </p>
            <p>{selected.description}</p>
          </div>
        )}
      </Modal>

      <Modal
        open={modal === "delete"}
        title="Delete Destination"
        onClose={() => setModal(null)}
        onConfirm={deleteDestination}
        confirmText="Delete"
        danger
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{selected?.name}</strong>?
        </p>
      </Modal>
    </div>
  );
}

export default Destinations;