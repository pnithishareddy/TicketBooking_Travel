import React from "react";
import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function Calendar({ trips, bookings }) {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 9, 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  const events = useMemo(() => {
    const result = {};

    trips.forEach((trip) => {
      const date = new Date(trip.startDate);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month
      ) {
        const day = date.getDate();

        if (!result[day]) result[day] = [];

        result[day].push({
          type: "trip",
          title: trip.title,
        });
      }
    });

    bookings.forEach((booking) => {
      const date = new Date(booking.date);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month
      ) {
        const day = date.getDate();

        if (!result[day]) result[day] = [];

        result[day].push({
          type: "booking",
          title: booking.id,
        });
      }
    });

    return result;
  }, [trips, bookings, year, month]);

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Travel Calendar</h1>
          <p>View upcoming trips and bookings.</p>
        </div>

        <div className="calendar-controls">
          <button onClick={previousMonth}>
            <ChevronLeft size={18} />
          </button>

          <strong>
            {monthName} {year}
          </strong>

          <button onClick={nextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="calendar-panel">
        <div className="calendar-weekdays">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {cells.map((day, index) => (
            <div
              className={`calendar-day ${
                day ? "" : "empty"
              }`}
              key={index}
            >
              {day && (
                <>
                  <span className="day-number">{day}</span>

                  <div className="calendar-events">
                    {events[day]?.map(
                      (event, eventIndex) => (
                        <div
                          className={`calendar-event ${event.type}`}
                          key={eventIndex}
                        >
                          <CalendarDays size={12} />
                          {event.title}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;