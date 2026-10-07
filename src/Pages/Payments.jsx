import React, { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Clock3,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

function Payments({ payments = [], setPayments, showToast }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [activeMethod, setActiveMethod] =
    useState("cards");

  const [showAddMethod, setShowAddMethod] =
    useState(false);

  const [methodType, setMethodType] =
    useState("card");

  const [savedMethods, setSavedMethods] =
    useState(() => {
      const saved = localStorage.getItem(
        "travelpro_payment_methods"
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {
            cards: [],
            upi: [],
            banks: [],
          };
        }
      }

      return {
        cards: [
          {
            id: 1,
            type: "Visa",
            last4: "4242",
            name: "Nithisha Reddy",
            expiry: "12/28",
            primary: true,
          },
          {
            id: 2,
            type: "Mastercard",
            last4: "8888",
            name: "Nithisha Reddy",
            expiry: "08/29",
            primary: false,
          },
        ],

        upi: [
          {
            id: 1,
            upiId: "nithisha@okaxis",
            provider: "Google Pay",
            primary: true,
          },
          {
            id: 2,
            upiId: "nithishareddy@ybl",
            provider: "PhonePe",
            primary: false,
          },
        ],

        banks: [
          {
            id: 1,
            bankName: "HDFC Bank",
            accountName: "Nithisha Reddy",
            last4: "4521",
            type: "Savings",
            primary: true,
          },
          {
            id: 2,
            bankName: "State Bank of India",
            accountName: "Nithisha Reddy",
            last4: "7834",
            type: "Savings",
            primary: false,
          },
        ],
      };
    });

  const [newMethod, setNewMethod] =
    useState({
      cardType: "Visa",
      cardNumber: "",
      cardName: "",
      expiry: "",
      upiId: "",
      provider: "Google Pay",
      bankName: "",
      accountName: "",
      accountNumber: "",
      bankType: "Savings",
    });

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

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = `
        ${payment.id || ""}
        ${payment.customerName || ""}
        ${payment.tripName || ""}
        ${payment.method || ""}
        ${payment.transactionId || ""}
      `.toLowerCase();

      const searchMatch = searchText.includes(
        search.toLowerCase()
      );

      const statusMatch =
        statusFilter === "All" ||
        payment.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [payments, search, statusFilter]);

  const paidAmount = payments
    .filter((payment) => payment.status === "Paid")
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const pendingAmount = payments
    .filter(
      (payment) => payment.status === "Pending"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const failedAmount = payments
    .filter(
      (payment) => payment.status === "Failed"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const saveMethods = (updatedMethods) => {
    setSavedMethods(updatedMethods);

    localStorage.setItem(
      "travelpro_payment_methods",
      JSON.stringify(updatedMethods)
    );
  };

  const handleNewMethodChange = (field, value) => {
    setNewMethod((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPaymentMethod = () => {
    if (methodType === "card") {
      const digits =
        newMethod.cardNumber.replace(/\D/g, "");

      if (
        digits.length < 4 ||
        !newMethod.cardName ||
        !newMethod.expiry
      ) {
        showToast?.(
          "Please complete the card details."
        );
        return;
      }

      const card = {
        id: Date.now(),
        type: newMethod.cardType,
        last4: digits.slice(-4),
        name: newMethod.cardName,
        expiry: newMethod.expiry,
        primary:
          savedMethods.cards.length === 0,
      };

      saveMethods({
        ...savedMethods,
        cards: [
          ...savedMethods.cards,
          card,
        ],
      });

      setActiveMethod("cards");

      showToast?.(
        "Card added successfully."
      );
    }

    if (methodType === "upi") {
      if (!newMethod.upiId.trim()) {
        showToast?.(
          "Please enter your UPI ID."
        );
        return;
      }

      const upi = {
        id: Date.now(),
        upiId: newMethod.upiId,
        provider: newMethod.provider,
        primary:
          savedMethods.upi.length === 0,
      };

      saveMethods({
        ...savedMethods,
        upi: [
          ...savedMethods.upi,
          upi,
        ],
      });

      setActiveMethod("upi");

      showToast?.(
        "UPI ID added successfully."
      );
    }

    if (methodType === "bank") {
      const accountDigits =
        newMethod.accountNumber.replace(
          /\D/g,
          ""
        );

      if (
        !newMethod.bankName ||
        !newMethod.accountName ||
        accountDigits.length < 4
      ) {
        showToast?.(
          "Please complete the bank account details."
        );
        return;
      }

      const bank = {
        id: Date.now(),
        bankName: newMethod.bankName,
        accountName:
          newMethod.accountName,
        last4: accountDigits.slice(-4),
        type: newMethod.bankType,
        primary:
          savedMethods.banks.length === 0,
      };

      saveMethods({
        ...savedMethods,
        banks: [
          ...savedMethods.banks,
          bank,
        ],
      });

      setActiveMethod("banks");

      showToast?.(
        "Bank account added successfully."
      );
    }

    setNewMethod({
      cardType: "Visa",
      cardNumber: "",
      cardName: "",
      expiry: "",
      upiId: "",
      provider: "Google Pay",
      bankName: "",
      accountName: "",
      accountNumber: "",
      bankType: "Savings",
    });

    setShowAddMethod(false);
  };

  const deleteMethod = (type, id) => {
    const updated = {
      ...savedMethods,
      [type]: savedMethods[type].filter(
        (item) => item.id !== id
      ),
    };

    saveMethods(updated);

    showToast?.(
      "Payment method removed."
    );
  };

  const setPrimaryMethod = (type, id) => {
    const updated = {
      ...savedMethods,
      [type]: savedMethods[type].map(
        (item) => ({
          ...item,
          primary: item.id === id,
        })
      ),
    };

    saveMethods(updated);

    showToast?.(
      "Primary payment method updated."
    );
  };

  const renderStatusIcon = (status) => {
    if (status === "Paid") {
      return (
        <CheckCircle2
          size={17}
        />
      );
    }

    if (status === "Pending") {
      return (
        <Clock3 size={17} />
      );
    }

    return (
      <XCircle size={17} />
    );
  };

  return (
    <div className="page payments-page">
      {/* HEADER */}

      <div className="page-heading">
        <div>
          <h1>Payments</h1>

          <p>
            Manage payments, saved payment
            methods and transaction history.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() =>
            setShowAddMethod(true)
          }
        >
          <Plus size={18} />
          Add Payment Method
        </button>
      </div>

      {/* SUMMARY */}

      <div className="payment-summary-grid">
        <div className="payment-summary-card">
          <div className="payment-summary-icon paid">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Total Paid</span>
            <strong>
              {formatCurrency(paidAmount)}
            </strong>
          </div>
        </div>

        <div className="payment-summary-card">
          <div className="payment-summary-icon pending">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {formatCurrency(
                pendingAmount
              )}
            </strong>
          </div>
        </div>

        <div className="payment-summary-card">
          <div className="payment-summary-icon failed">
            <XCircle size={21} />
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {formatCurrency(failedAmount)}
            </strong>
          </div>
        </div>

        <div className="payment-summary-card">
          <div className="payment-summary-icon total">
            <Wallet size={21} />
          </div>

          <div>
            <span>Total Transactions</span>
            <strong>
              {payments.length}
            </strong>
          </div>
        </div>
      </div>

      {/* PAYMENT METHODS */}

      <div className="payment-methods-section">
        <div className="section-heading">
          <div>
            <h2>Saved Payment Methods</h2>
            <p>
              Manage your cards, UPI IDs and
              bank accounts.
            </p>
          </div>
        </div>

        {/* METHOD TABS */}

        <div className="payment-method-tabs">
          <button
            className={
              activeMethod === "cards"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMethod("cards")
            }
          >
            <CreditCard size={18} />
            Cards
            <span>
              {savedMethods.cards.length}
            </span>
          </button>

          <button
            className={
              activeMethod === "upi"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMethod("upi")
            }
          >
            <Smartphone size={18} />
            UPI
            <span>
              {savedMethods.upi.length}
            </span>
          </button>

          <button
            className={
              activeMethod === "banks"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMethod("banks")
            }
          >
            <Building2 size={18} />
            Bank Accounts
            <span>
              {savedMethods.banks.length}
            </span>
          </button>
        </div>

        {/* CARDS */}

        {activeMethod === "cards" && (
          <div className="saved-method-grid">
            {savedMethods.cards.map(
              (card) => (
                <div
                  className="saved-card payment-card"
                  key={card.id}
                >
                  <div className="payment-card-top">
                    <div className="card-chip">
                      <CreditCard
                        size={20}
                      />
                    </div>

                    <strong>
                      {card.type}
                    </strong>

                    {card.primary && (
                      <span className="primary-badge">
                        Primary
                      </span>
                    )}
                  </div>

                  <div className="card-number">
                    •••• •••• ••••{" "}
                    {card.last4}
                  </div>

                  <div className="payment-card-bottom">
                    <div>
                      <span>Card Holder</span>
                      <strong>
                        {card.name}
                      </strong>
                    </div>

                    <div>
                      <span>Expires</span>
                      <strong>
                        {card.expiry}
                      </strong>
                    </div>
                  </div>

                  <div className="method-actions">
                    {!card.primary && (
                      <button
                        onClick={() =>
                          setPrimaryMethod(
                            "cards",
                            card.id
                          )
                        }
                      >
                        Make Primary
                      </button>
                    )}

                    <button
                      className="danger-action"
                      onClick={() =>
                        deleteMethod(
                          "cards",
                          card.id
                        )
                      }
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              )
            )}

            {savedMethods.cards.length ===
              0 && (
              <div className="method-empty">
                <CreditCard size={30} />
                <h3>
                  No saved cards
                </h3>
                <p>
                  Add a card for faster
                  payments.
                </p>
              </div>
            )}
          </div>
        )}

        {/* UPI */}

        {activeMethod === "upi" && (
          <div className="saved-method-list">
            {savedMethods.upi.map(
              (upi) => (
                <div
                  className="saved-method-row"
                  key={upi.id}
                >
                  <div className="method-icon upi-icon">
                    <Smartphone
                      size={22}
                    />
                  </div>

                  <div className="method-info">
                    <strong>
                      {upi.upiId}
                    </strong>

                    <span>
                      {upi.provider}
                    </span>
                  </div>

                  {upi.primary && (
                    <span className="primary-badge">
                      Primary
                    </span>
                  )}

                  <div className="method-row-actions">
                    {!upi.primary && (
                      <button
                        onClick={() =>
                          setPrimaryMethod(
                            "upi",
                            upi.id
                          )
                        }
                      >
                        Make Primary
                      </button>
                    )}

                    <button
                      className="danger-action"
                      onClick={() =>
                        deleteMethod(
                          "upi",
                          upi.id
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )
            )}

            {savedMethods.upi.length ===
              0 && (
              <div className="method-empty">
                <Smartphone size={30} />
                <h3>
                  No saved UPI IDs
                </h3>
                <p>
                  Add your UPI ID for
                  quick payments.
                </p>
              </div>
            )}
          </div>
        )}

        {/* BANK ACCOUNTS */}

        {activeMethod === "banks" && (
          <div className="saved-method-list">
            {savedMethods.banks.map(
              (bank) => (
                <div
                  className="saved-method-row"
                  key={bank.id}
                >
                  <div className="method-icon bank-icon">
                    <Building2
                      size={22}
                    />
                  </div>

                  <div className="method-info">
                    <strong>
                      {bank.bankName}
                    </strong>

                    <span>
                      {bank.type} •{" "}
                      {bank.accountName}
                    </span>

                    <span>
                      Account ending in{" "}
                      {bank.last4}
                    </span>
                  </div>

                  {bank.primary && (
                    <span className="primary-badge">
                      Primary
                    </span>
                  )}

                  <div className="method-row-actions">
                    {!bank.primary && (
                      <button
                        onClick={() =>
                          setPrimaryMethod(
                            "banks",
                            bank.id
                          )
                        }
                      >
                        Make Primary
                      </button>
                    )}

                    <button
                      className="danger-action"
                      onClick={() =>
                        deleteMethod(
                          "banks",
                          bank.id
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )
            )}

            {savedMethods.banks.length ===
              0 && (
              <div className="method-empty">
                <Building2 size={30} />
                <h3>
                  No saved bank accounts
                </h3>
                <p>
                  Add a bank account for
                  payments.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PREVIOUS PAYMENTS */}

      <div className="previous-payments-section">
        <div className="section-heading">
          <div>
            <h2>Previous Payments</h2>
            <p>
              View your payment and
              transaction history.
            </p>
          </div>
        </div>

        <div className="filters-panel payment-filters">
          <div className="search-box">
            <Search size={18} />

            <input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>
        </div>

        <div className="table-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Customer</th>
                  <th>Trip</th>
                  <th>Payment Mode</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map(
                  (payment) => (
                    <tr key={payment.id}>
                      <td>
                        <strong>
                          {payment.id}
                        </strong>

                        <span className="table-sub">
                          {payment.transactionId}
                        </span>
                      </td>

                      <td>
                        {payment.customerName}
                      </td>

                      <td>
                        {payment.tripName}
                      </td>

                      <td>
                        <div className="payment-mode-cell">
                          {payment.method ===
                            "UPI" ? (
                            <Smartphone
                              size={17}
                            />
                          ) : payment.method ===
                            "Bank Transfer" ? (
                            <Building2
                              size={17}
                            />
                          ) : (
                            <CreditCard
                              size={17}
                            />
                          )}

                          {payment.method}
                        </div>
                      </td>

                      <td>
                        {formatDate(
                          payment.paymentDate
                        )}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(
                            payment.amount
                          )}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`payment-status ${payment.status.toLowerCase()}`}
                        >
                          {renderStatusIcon(
                            payment.status
                          )}

                          {payment.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="payment-view-button"
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {filteredPayments.length ===
            0 && (
            <div className="empty-state small">
              <h3>
                No payments found
              </h3>

              <p>
                Try again
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADD PAYMENT METHOD MODAL */}

      {showAddMethod && (
        <div
          className="payment-modal-overlay"
          onClick={() =>
            setShowAddMethod(false)
          }
        >
          <div
            className="payment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="payment-modal-header">
              <div>
                <h2>
                  Add Payment Method
                </h2>

                <p>
                  Save a payment method
                  for future use.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowAddMethod(false)
                }
              >
                ×
              </button>
            </div>

            {/* TYPE */}

            <div className="add-method-tabs">
              <button
                className={
                  methodType === "card"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMethodType("card")
                }
              >
                <CreditCard size={18} />
                Card
              </button>

              <button
                className={
                  methodType === "upi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMethodType("upi")
                }
              >
                <Smartphone size={18} />
                UPI
              </button>

              <button
                className={
                  methodType === "bank"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMethodType("bank")
                }
              >
                <Building2 size={18} />
                Bank
              </button>
            </div>

            {/* CARD FORM */}

            {methodType === "card" && (
              <div className="payment-form">
                <div className="form-group">
                  <label>
                    Card Type
                  </label>

                  <select
                    value={
                      newMethod.cardType
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "cardType",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Visa
                    </option>

                    <option>
                      Mastercard
                    </option>

                    <option>
                      RuPay
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Card Number
                  </label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={
                      newMethod.cardNumber
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "cardNumber",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-two-columns">
                  <div className="form-group">
                    <label>
                      Card Holder
                    </label>

                    <input
                      type="text"
                      placeholder="Name on card"
                      value={
                        newMethod.cardName
                      }
                      onChange={(e) =>
                        handleNewMethodChange(
                          "cardName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Expiry
                    </label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={
                        newMethod.expiry
                      }
                      onChange={(e) =>
                        handleNewMethodChange(
                          "expiry",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI FORM */}

            {methodType === "upi" && (
              <div className="payment-form">
                <div className="form-group">
                  <label>
                    UPI Provider
                  </label>

                  <select
                    value={
                      newMethod.provider
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "provider",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Google Pay
                    </option>

                    <option>
                      PhonePe
                    </option>

                    <option>
                      Paytm
                    </option>

                    <option>
                      BHIM
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={
                      newMethod.upiId
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "upiId",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}

            {/* BANK FORM */}

            {methodType === "bank" && (
              <div className="payment-form">
                <div className="form-group">
                  <label>
                    Bank Name
                  </label>

                  <input
                    type="text"
                    placeholder="Bank name"
                    value={
                      newMethod.bankName
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "bankName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Account Holder
                  </label>

                  <input
                    type="text"
                    placeholder="Account holder name"
                    value={
                      newMethod.accountName
                    }
                    onChange={(e) =>
                      handleNewMethodChange(
                        "accountName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-two-columns">
                  <div className="form-group">
                    <label>
                      Account Number
                    </label>

                    <input
                      type="text"
                      placeholder="Account number"
                      value={
                        newMethod.accountNumber
                      }
                      onChange={(e) =>
                        handleNewMethodChange(
                          "accountNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Account Type
                    </label>

                    <select
                      value={
                        newMethod.bankType
                      }
                      onChange={(e) =>
                        handleNewMethodChange(
                          "bankType",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        Savings
                      </option>

                      <option>
                        Current
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="payment-modal-actions">
              <button
                className="btn secondary"
                onClick={() =>
                  setShowAddMethod(false)
                }
              >
                Cancel
              </button>

              <button
                className="btn primary"
                onClick={
                  addPaymentMethod
                }
              >
                <Plus size={17} />
                Save Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSACTION DETAILS */}

      {selectedPayment && (
        <div
          className="payment-modal-overlay"
          onClick={() =>
            setSelectedPayment(null)
          }
        >
          <div
            className="payment-modal transaction-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="payment-modal-header">
              <div>
                <h2>
                  Payment Details
                </h2>

                <p>
                  Transaction{" "}
                  {selectedPayment.id}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedPayment(null)
                }
              >
                ×
              </button>
            </div>

            <div className="transaction-status-box">
              {renderStatusIcon(
                selectedPayment.status
              )}

              <div>
                <strong>
                  {selectedPayment.status}
                </strong>

                <span>
                  {formatCurrency(
                    selectedPayment.amount
                  )}
                </span>
              </div>
            </div>

            <div className="transaction-details">
              <div>
                <span>
                  Transaction ID
                </span>

                <strong>
                  {
                    selectedPayment.transactionId
                  }
                </strong>
              </div>

              <div>
                <span>
                  Customer
                </span>

                <strong>
                  {
                    selectedPayment.customerName
                  }
                </strong>
              </div>

              <div>
                <span>
                  Trip
                </span>

                <strong>
                  {
                    selectedPayment.tripName
                  }
                </strong>
              </div>

              <div>
                <span>
                  Payment Method
                </span>

                <strong>
                  {selectedPayment.method}
                </strong>
              </div>

              <div>
                <span>
                  Payment Date
                </span>

                <strong>
                  {formatDate(
                    selectedPayment.paymentDate
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Amount
                </span>

                <strong>
                  {formatCurrency(
                    selectedPayment.amount
                  )}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;