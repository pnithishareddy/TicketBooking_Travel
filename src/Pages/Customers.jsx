import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Mail,
  Phone,
  Users,
} from "lucide-react";

import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

function Customers({ customers }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  /* =========================================
     FILTER CUSTOMERS
  ========================================= */

  const filtered = useMemo(() => {
    return customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.country} ${customer.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [customers, search]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const displayed = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* =========================================
     INDIAN CURRENCY FORMAT
  ========================================= */

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  /* =========================================
     CUSTOMER INITIALS
  ========================================= */

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="page-heading">

        <div>
          <h1>Customers</h1>

          <p>
            Manage registered travelers.
          </p>
        </div>

        <div className="heading-stat">
          <Users size={20} />

          {customers.length} Customers
        </div>

      </div>


      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>

      </div>


      {/* =====================================
          CUSTOMER TABLE
      ===================================== */}

      <div className="table-card">

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {displayed.map((customer) => (

                <tr key={customer.id}>

                  {/* CUSTOMER */}

                  <td>

                    <div className="customer-cell">

                      <div className="avatar large">
                        {getInitials(customer.name)}
                      </div>

                      <div>

                        <strong>
                          {customer.name}
                        </strong>

                        <span>
                          {customer.email}
                        </span>

                      </div>

                    </div>

                  </td>


                  {/* CONTACT */}

                  <td>

                    <div className="contact-cell">

                      <span>
                        <Mail size={14} />
                        {customer.email}
                      </span>

                      <span>
                        <Phone size={14} />
                        {customer.phone}
                      </span>

                    </div>

                  </td>


                  {/* COUNTRY */}

                  <td>
                    {customer.country}
                  </td>


                  {/* BOOKINGS */}

                  <td>
                    {customer.bookings}
                  </td>


                  {/* TOTAL SPENT */}

                  <td>

                    <strong>
                      {formatCurrency(
                        customer.totalSpent
                      )}
                    </strong>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span className="status active">
                      {customer.status}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <button
                      type="button"
                      className="table-icon"
                      onClick={() =>
                        setSelected(customer)
                      }
                      title="View customer"
                    >
                      <Eye size={18} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ===================================
            EMPTY STATE
        =================================== */}

        {displayed.length === 0 && (

          <div className="empty-state small">

            <h3>
              No customers found
            </h3>

            <p>
              Try changing your search.
            </p>

          </div>

        )}


        {/* ===================================
            PAGINATION
        =================================== */}

        {filtered.length > 0 && (

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

        )}

      </div>


      {/* =====================================
          CUSTOMER DETAILS MODAL
      ===================================== */}

      <Modal
        open={!!selected}
        title="Customer Details"
        onClose={() => setSelected(null)}
      >

        {selected && (

          <div className="customer-detail">

            {/* AVATAR */}

            <div className="avatar xl">

              {getInitials(
                selected.name
              )}

            </div>


            {/* NAME */}

            <h2>
              {selected.name}
            </h2>


            {/* EMAIL */}

            <p>
              {selected.email}
            </p>


            {/* DETAILS */}

            <div className="customer-detail-grid">

              <div>

                <span>
                  Phone
                </span>

                <strong>
                  {selected.phone}
                </strong>

              </div>


              <div>

                <span>
                  Country
                </span>

                <strong>
                  {selected.country}
                </strong>

              </div>


              <div>

                <span>
                  Bookings
                </span>

                <strong>
                  {selected.bookings}
                </strong>

              </div>


              <div>

                <span>
                  Total Spent
                </span>

                <strong>
                  {formatCurrency(
                    selected.totalSpent
                  )}
                </strong>

              </div>

            </div>

          </div>

        )}

      </Modal>

    </div>
  );
}

export default Customers;