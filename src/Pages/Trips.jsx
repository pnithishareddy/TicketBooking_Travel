
import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

function Trips({
  trips = [],
  setTrips,
  destinations = [],
  showToast,
}) {
  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] =
    useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1);

  const pageSize = 4;

  const [form, setForm] = useState({
    title: "",
    destination: "",
    country: "",
    startDate: "",
    endDate: "",
    price: "",
    capacity: "",
    category: "Adventure",
  });

  /* --------------------------------
     FALLBACK IMAGES
  -------------------------------- */

  const fallbackImages = {
    Paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",

    Dubai:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",

    Bali:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",

    London:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",

    Tokyo:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",

    Maldives:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",

    default:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
  };

  const getTripImage = (trip) => {
    if (trip.image) {
      return trip.image;
    }

    const destination = destinations.find(
      (item) =>
        item.name === trip.destination
    );

    if (destination?.image) {
      return destination.image;
    }

    return (
      fallbackImages[trip.destination] ||
      fallbackImages.default
    );
  };

  /* --------------------------------
     FILTER + SORT
  -------------------------------- */

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    result = result.filter((trip) => {
      const text = `
        ${trip.title || ""}
        ${trip.destination || ""}
        ${trip.country || ""}
        ${trip.category || ""}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

    if (destinationFilter !== "All") {
      result = result.filter(
        (trip) =>
          trip.destination ===
          destinationFilter
      );
    }

    if (priceFilter === "under1000") {
      result = result.filter(
        (trip) =>
          Number(trip.price || 0) < 1000
      );
    }

    if (priceFilter === "1000-2000") {
      result = result.filter(
        (trip) =>
          Number(trip.price || 0) >= 1000 &&
          Number(trip.price || 0) <= 2000
      );
    }

    if (priceFilter === "over2000") {
      result = result.filter(
        (trip) =>
          Number(trip.price || 0) > 2000
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        (a.title || "").localeCompare(
          b.title || ""
        )
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.startDate || 0) -
          new Date(a.startDate || 0)
      );
    }

    return result;
  }, [
    trips,
    destinations,
    search,
    destinationFilter,
    priceFilter,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTrips.length / pageSize
    )
  );

  const displayedTrips =
    filteredTrips.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  /* --------------------------------
     FORM
  -------------------------------- */

  const resetForm = () => {
    setForm({
      title: "",
      destination: "",
      country: "",
      startDate: "",
      endDate: "",
      price: "",
      capacity: "",
      category: "Adventure",
    });
  };

  const openAdd = () => {
    resetForm();
    setSelected(null);
    setModal("form");
  };

  const openEdit = (trip) => {
    setSelected(trip);

    setForm({
      title: trip.title || "",
      destination:
        trip.destination || "",
      country: trip.country || "",
      startDate:
        trip.startDate || "",
      endDate:
        trip.endDate || "",
      price: trip.price || "",
      capacity:
        trip.capacity || "",
      category:
        trip.category || "Adventure",
    });

    setModal("form");
  };

  /* --------------------------------
     SAVE TRIP
  -------------------------------- */

  const saveTrip = () => {
    if (
      !form.title.trim() ||
      !form.destination ||
      !form.startDate ||
      !form.endDate ||
      !form.price ||
      !form.capacity
    ) {
      showToast?.(
        "Please complete all required fields."
      );
      return;
    }

    if (
      new Date(form.endDate) <
      new Date(form.startDate)
    ) {
      showToast?.(
        "End date cannot be before start date."
      );
      return;
    }

    const destinationData =
      destinations.find(
        (destination) =>
          destination.name ===
          form.destination
      );

    if (selected) {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === selected.id
            ? {
                ...trip,
                ...form,
                price: Number(
                  form.price
                ),
                capacity: Number(
                  form.capacity
                ),
                image:
                  trip.image ||
                  destinationData?.image ||
                  fallbackImages[
                    form.destination
                  ] ||
                  fallbackImages.default,
              }
            : trip
        )
      );

      showToast?.(
        "Trip updated successfully."
      );
    } else {
      setTrips((prev) => [
        ...prev,
        {
          id: Date.now(),

          ...form,

          price: Number(form.price),

          capacity: Number(
            form.capacity
          ),

          booked: 0,

          status: "Upcoming",

          image:
            destinationData?.image ||
            fallbackImages[
              form.destination
            ] ||
            fallbackImages.default,
        },
      ]);

      showToast?.(
        "Trip created successfully."
      );
    }

    setModal(null);
  };

  /* --------------------------------
     DELETE
  -------------------------------- */

  const deleteTrip = () => {
    if (!selected) return;

    setTrips((prev) =>
      prev.filter(
        (trip) =>
          trip.id !== selected.id
      )
    );

    setModal(null);

    showToast?.(
      "Trip deleted successfully."
    );
  };

  /* --------------------------------
     CURRENCY
  -------------------------------- */

  const formatCurrency = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  /* --------------------------------
     RENDER
  -------------------------------- */

  return (
    <div className="page">
      {/* HEADER */}

      <div className="page-heading">
        <div>
          <h1>Trips</h1>

          <p>
            Create and manage travel
            packages.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={openAdd}
        >
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      {/* FILTERS */}

      <div className="filters-panel">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="filter-select">
          <SlidersHorizontal size={17} />

          <select
            value={destinationFilter}
            onChange={(e) => {
              setDestinationFilter(
                e.target.value
              );
              setPage(1);
            }}
          >
            <option value="All">
              All Destinations
            </option>

            {destinations.map(
              (destination) => (
                <option
                  key={destination.id}
                  value={destination.name}
                >
                  {destination.name}
                </option>
              )
            )}
          </select>
        </div>

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">
            All Prices
          </option>

          <option value="under1000">
            Under ₹1,000
          </option>

          <option value="1000-2000">
            ₹1,000 - ₹2,000
          </option>

          <option value="over2000">
            Over ₹2,000
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="newest">
            Sort: Newest
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name">
            Name
          </option>
        </select>
      </div>

      {/* TRIPS TABLE */}

      {displayedTrips.length === 0 ? (
        <div className="empty-state">
          <h2>No trips found</h2>

          <p>
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Bookings</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayedTrips.map(
                  (trip) => (
                    <tr key={trip.id}>
                      {/* TRIP IMAGE */}

                      <td>
                        <div className="table-trip">
                          <img
                            src={getTripImage(
                              trip
                            )}
                            alt={
                              trip.title
                            }
                            onError={(e) => {
                              e.currentTarget.src =
                                fallbackImages.default;
                            }}
                          />

                          <div>
                            <strong>
                              {trip.title}
                            </strong>

                            <span>
                              {trip.category ||
                                "Travel"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* DESTINATION */}

                      <td>
                        {trip.destination ||
                          "-"}
                      </td>

                      {/* DATES */}

                      <td>
                        {trip.startDate ||
                          "-"}

                        <br />

                        <small>
                          to{" "}
                          {trip.endDate ||
                            "-"}
                        </small>
                      </td>

                      {/* PRICE */}

                      <td>
                        <strong>
                          {formatCurrency(
                            trip.price
                          )}
                        </strong>
                      </td>

                      {/* BOOKINGS */}

                      <td>
                        {trip.booked || 0}/
                        {trip.capacity ||
                          0}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`status ${
                            (
                              trip.status ||
                              "Upcoming"
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )
                          }`}
                        >
                          {trip.status ||
                            "Upcoming"}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="action-buttons">
                          {/* VIEW */}

                          <button
                            type="button"
                            title="View trip"
                            onClick={() => {
                              setSelected(
                                trip
                              );
                              setModal(
                                "view"
                              );
                            }}
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            title="Edit trip"
                            onClick={() =>
                              openEdit(
                                trip
                              )
                            }
                          >
                            <Edit
                              size={17}
                            />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="delete-btn"
                            title="Delete trip"
                            onClick={() => {
                              setSelected(
                                trip
                              );
                              setModal(
                                "delete"
                              );
                            }}
                          >
                            <Trash2
                              size={17}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {filteredTrips.length >
            0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}

      <Modal
        open={modal === "form"}
        title={
          selected
            ? "Edit Trip"
            : "Create New Trip"
        }
        onClose={() =>
          setModal(null)
        }
        onConfirm={saveTrip}
        confirmText={
          selected
            ? "Update Trip"
            : "Create Trip"
        }
      >
        <div className="form-grid">
          <div className="form-group full">
            <label>
              Trip Name *
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              placeholder="e.g. European Adventure"
            />
          </div>

          <div className="form-group">
            <label>
              Destination *
            </label>

            <select
              value={
                form.destination
              }
              onChange={(e) => {
                const destination =
                  destinations.find(
                    (d) =>
                      d.name ===
                      e.target.value
                  );

                setForm({
                  ...form,
                  destination:
                    e.target.value,
                  country:
                    destination?.country ||
                    "",
                });
              }}
            >
              <option value="">
                Select destination
              </option>

              {destinations.map(
                (destination) => (
                  <option
                    key={
                      destination.id
                    }
                    value={
                      destination.name
                    }
                  >
                    {
                      destination.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label>
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            >
              <option>
                Adventure
              </option>

              <option>
                Luxury
              </option>

              <option>
                Beach
              </option>

              <option>
                Culture
              </option>

              <option>
                Family
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Start Date *
            </label>

            <input
              type="date"
              value={
                form.startDate
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              End Date *
            </label>

            <input
              type="date"
              value={
                form.endDate
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Price *
            </label>

            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price:
                    e.target.value,
                })
              }
              placeholder="1500"
            />
          </div>

          <div className="form-group">
            <label>
              Capacity *
            </label>

            <input
              type="number"
              min="1"
              value={
                form.capacity
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity:
                    e.target.value,
                })
              }
              placeholder="30"
            />
          </div>
        </div>
      </Modal>

      {/* VIEW TRIP */}

      <Modal
        open={modal === "view"}
        title="Trip Details"
        onClose={() =>
          setModal(null)
        }
      >
        {selected && (
          <div className="trip-detail">
            <img
              src={getTripImage(
                selected
              )}
              alt={selected.title}
              onError={(e) => {
                e.currentTarget.src =
                  fallbackImages.default;
              }}
            />

            <h2>
              {selected.title}
            </h2>

            <div className="detail-grid">
              <p>
                <strong>
                  Destination
                </strong>

                {selected.destination ||
                  "-"}
              </p>

              <p>
                <strong>
                  Country
                </strong>

                {selected.country ||
                  "-"}
              </p>

              <p>
                <strong>
                  Category
                </strong>

                {selected.category ||
                  "-"}
              </p>

              <p>
                <strong>
                  Start Date
                </strong>

                {selected.startDate ||
                  "-"}
              </p>

              <p>
                <strong>
                  End Date
                </strong>

                {selected.endDate ||
                  "-"}
              </p>

              <p>
                <strong>
                  Price
                </strong>

                {formatCurrency(
                  selected.price
                )}
              </p>

              <p>
                <strong>
                  Availability
                </strong>

                {Math.max(
                  0,
                  Number(
                    selected.capacity ||
                      0
                  ) -
                    Number(
                      selected.booked ||
                        0
                    )
                )}{" "}
                seats
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* DELETE MODAL */}

      <Modal
        open={modal === "delete"}
        title="Delete Trip"
        onClose={() =>
          setModal(null)
        }
        onConfirm={deleteTrip}
        confirmText="Delete"
        danger
      >
        <p>
          Are you sure you want to
          delete{" "}
          <strong>
            {selected?.title}
          </strong>
          ?
        </p>
      </Modal>
    </div>
  );
}

export default Trips;

