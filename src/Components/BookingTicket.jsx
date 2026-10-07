import React from "react";
import { Check, X, Printer } from "lucide-react";

const slug = (v = "") => v.toLowerCase().replace(/\s+/g, "-");

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const fmt = (d) => {
  if (!d) return "-";
  const p = new Date(d);
  return Number.isNaN(p.getTime())
    ? d
    : p.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

function BookingTicket({ booking, trip, onConfirm, onCancel }) {
  const status = booking.status || "Pending";
  const payment = booking.paymentStatus || "Pending";
  const cancelled = status === "Cancelled";

  const steps = [
    { label: "Booked", done: true },
    { label: "Payment " + payment, done: payment === "Paid", bad: payment === "Failed" },
    { label: cancelled ? "Cancelled" : "Confirmed", done: status === "Confirmed" || cancelled, bad: cancelled },
  ];

  const code = `TP-${String(booking.id).padStart(5, "0")}`;

  return (
    <div className="ticket">
      <div
        className="ticket-hero"
        style={trip?.image ? { "--hero": `url(${trip.image})` } : undefined}
      >
        <span className={`status ${slug(status)}`}>{status}</span>
        <small>Booking {code}</small>
        <h2>{booking.tripName || "Unknown Trip"}</h2>
        <p>{booking.destination || trip?.destination || "-"}{trip?.duration ? ` · ${trip.duration}` : ""}</p>
      </div>

      <div className="ticket-body">
        <div className="ticket-route">
          <div>
            <span>Booked on</span>
            <strong>{fmt(booking.bookingDate)}</strong>
          </div>
          <div className="route-line" />
          <div>
            <span>Travel date</span>
            <strong>{fmt(booking.travelDate)}</strong>
          </div>
        </div>

        <div className="ticket-fields">
          <div className="ticket-field">
            <span>Traveler</span>
            <strong>{booking.customerName || "Unknown Customer"}</strong>
          </div>
          <div className="ticket-field">
            <span>Email</span>
            <strong>{booking.customerEmail || "-"}</strong>
          </div>
          <div className="ticket-field">
            <span>Payment</span>
            <strong><span className={`status ${slug(payment)}`} style={{ marginTop: 0 }}>{payment}</span></strong>
          </div>
          <div className="ticket-field big">
            <span>Total amount</span>
            <strong>{money(booking.amount)}</strong>
          </div>
        </div>

        <div className="ticket-stub">
          <div className="barcode" aria-hidden="true" />
          <small>{code}</small>
        </div>

        <div className="ticket-steps">
          {steps.map((s) => (
            <div key={s.label} className={`ticket-step ${s.bad ? "bad" : s.done ? "done" : ""}`}>
              <i />
              {s.label}
            </div>
          ))}
        </div>
      </div>

      <div className="ticket-actions">
        <button type="button" className="btn ghost" onClick={() => window.print()}>
          <Printer size={16} /> Print ticket
        </button>
        {status === "Pending" && (
          <button type="button" className="btn primary" onClick={onConfirm}>
            <Check size={16} /> Confirm
          </button>
        )}
        {!cancelled && (
          <button type="button" className="btn danger" onClick={onCancel}>
            <X size={16} /> Cancel booking
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingTicket;
