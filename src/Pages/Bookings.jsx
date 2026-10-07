
import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  CalendarDays,
} from "lucide-react";

import Modal from "../Components/Modal";
import Pagination from "../Components/Pagination";

function Bookings({
  bookings = [],
  setBookings,
  showToast,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const searchText = `
        ${booking.id || ""}
        ${booking.customerName || ""}
        ${booking.tripName || ""}
        ${booking.destination || ""}
      `.toLowerCase();

      const searchMatch = searchText.includes(
        search.toLowerCase()
      );

      const statusMatch =
        statusFilter === "All" ||
        booking.status === statusFilter;

      const paymentMatch =
        paymentFilter === "All" ||
        booking.paymentStatus === paymentFilter;

      return searchMatch && statusMatch && paymentMatch;
    });
  }, [
    bookings,
    search,
    statusFilter,
    paymentFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const displayed = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
            }
          : booking
      )
    );

    if (selected?.id === id) {
      setSelected((prev) => ({
        ...prev,
        status,
      }));
    }

    showToast?.(
      `Booking ${status.toLowerCase()}.`
    );
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="page">
      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <h1>Bookings</h1>
          <p>
            Manage customer reservations and statuses.
          </p>
        </div>

        <div className="heading-stat">
          <CalendarDays size={20} />
          {bookings.length} Bookings
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-panel">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">
            All Booking Status
          </option>
          <option value="Confirmed">
            Confirmed
          </option>
          <option value="Pending">
            Pending
          </option>
          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">
            All Payment Status
          </option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Trip</th>
                <th>Booking Date</th>
                <th>Travel Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {displayed.map((booking) => (
                <tr key={booking.id}>
                  {/* BOOKING ID */}
                  <td>
                    <strong className="booking-id">
                      #{booking.id}
                    </strong>
                  </td>

                  {/* CUSTOMER */}
                  <td>
                    <div>
                      <strong>
                        {booking.customerName ||
                          "Unknown Customer"}
                      </strong>

                      <span className="table-sub">
                        {booking.customerEmail ||
                          "Customer"}
                      </span>
                    </div>
                  </td>

                  {/* TRIP */}
                  <td>
                    <div>
                      <strong>
                        {booking.tripName ||
                          "Unknown Trip"}
                      </strong>

                      <span className="table-sub">
                        {booking.destination || "-"}
                      </span>
                    </div>
                  </td>

                  {/* BOOKING DATE */}
                  <td>
                    {formatDate(
                      booking.bookingDate
                    )}
                  </td>

                  {/* TRAVEL DATE */}
                  <td>
                    {formatDate(
                      booking.travelDate
                    )}
                  </td>

                  {/* AMOUNT */}
                  <td>
                    <strong>
                      {formatCurrency(booking.amount)}
                    </strong>
                  </td>

                  {/* PAYMENT */}
                  <td>
                    <span
                      className={`status ${
                        (
                          booking.paymentStatus ||
                          "Pending"
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {booking.paymentStatus ||
                        "Pending"}
                    </span>
                  </td>

                  {/* BOOKING STATUS */}
                  <td>
                    <span
                      className={`status ${
                        (
                          booking.status ||
                          "Pending"
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="action-buttons">
                      {/* VIEW */}
                      <button
                        type="button"
                        title="View booking"
                        onClick={() =>
                          setSelected(booking)
                        }
                      >
                        <Eye size={17} />
                      </button>

                      {/* CONFIRM */}
                      {booking.status ===
                        "Pending" && (
                        <button
                          type="button"
                          title="Confirm booking"
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "Confirmed"
                            )
                          }
                        >
                          <Check size={17} />
                        </button>
                      )}

                      {/* CANCEL */}
                      {booking.status !==
                        "Cancelled" && (
                        <button
                          type="button"
                          className="delete-btn"
                          title="Cancel booking"
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "Cancelled"
                            )
                          }
                        >
                          <X size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {displayed.length === 0 && (
          <div className="empty-state small">
            <h3>No bookings found</h3>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {filtered.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* BOOKING DETAILS MODAL */}
      <Modal
        open={!!selected}
        title="Booking Details"
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="booking-detail">
            <div className="booking-detail-header">
              <div>
                <span>Booking ID</span>
                <h2>#{selected.id}</h2>
              </div>

              <span
                className={`status ${
                  (
                    selected.status ||
                    "Pending"
                  )
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                }`}
              >
                {selected.status || "Pending"}
              </span>
            </div>

            <div className="detail-grid">
              <p>
                <strong>Customer</strong>
                {selected.customerName ||
                  "Unknown Customer"}
              </p>

              <p>
                <strong>Trip</strong>
                {selected.tripName ||
                  "Unknown Trip"}
              </p>

              <p>
                <strong>Destination</strong>
                {selected.destination || "-"}
              </p>

              <p>
                <strong>Booking Date</strong>
                {formatDate(
                  selected.bookingDate
                )}
              </p>

              <p>
                <strong>Travel Date</strong>
                {formatDate(
                  selected.travelDate
                )}
              </p>

              <p>
                <strong>Amount</strong>
                {formatCurrency(selected.amount)}
              </p>

              <p>
                <strong>Payment</strong>
                {selected.paymentStatus ||
                  "Pending"}
              </p>

              <p>
                <strong>Status</strong>
                {selected.status ||
                  "Pending"}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Bookings;

