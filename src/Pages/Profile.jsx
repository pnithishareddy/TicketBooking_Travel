import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Edit3,
  X,
  UserRound,
} from "lucide-react";

function Profile({ showToast }) {
  const defaultProfile = {
    name: "Nithisha Reddy",
    email: "nithisha@example.com",
    phone: "+91 98765 43210",
    gender: "Female",
    city: "Hyderabad",
    dob: "2000-01-01",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editProfile, setEditProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("travelpro_profile");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
        setEditProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
      } catch (error) {
        console.error("Unable to load profile:", error);
      }
    }
  }, []);

  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!editProfile.name.trim()) {
      if (showToast) showToast("Please enter your name.");
      return;
    }

    if (!editProfile.email.trim()) {
      if (showToast) showToast("Please enter your email.");
      return;
    }

    if (!editProfile.phone.trim()) {
      if (showToast) showToast("Please enter your phone number.");
      return;
    }

    if (!editProfile.city.trim()) {
      if (showToast) showToast("Please enter your city.");
      return;
    }

    localStorage.setItem(
      "travelpro_profile",
      JSON.stringify(editProfile)
    );

    setProfile(editProfile);
    setIsEditing(false);

    if (showToast) {
      showToast("Profile updated successfully.");
    }
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="page profile-page">

      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and profile details.</p>
        </div>

        {!isEditing && (
          <button
            className="btn primary"
            onClick={handleEdit}
          >
            <Edit3 size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="profile-header-card">

        <div className="profile-avatar">
          {getInitials(profile.name)}
        </div>

        <div className="profile-header-info">
          <h2>{profile.name}</h2>

          <p>
            <Mail size={15} />
            {profile.email}
          </p>

          <span className="profile-badge">
            Profile Owner
          </span>
        </div>

      </div>

      {/* PROFILE DETAILS */}
      <div className="profile-card">

        <div className="profile-card-header">
          <div>
            <h2>Personal Information</h2>
            <p>
              Update your personal information whenever needed.
            </p>
          </div>

          {!isEditing && (
            <button
              className="outline-button"
              onClick={handleEdit}
            >
              <Edit3 size={16} />
              Edit
            </button>
          )}
        </div>

        <div className="profile-divider"></div>

        {!isEditing ? (

          /* =========================
             VIEW MODE
          ========================== */
          <div className="profile-details-grid">

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <User size={18} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>
                  {profile.name || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>
                  {profile.email || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  {profile.phone || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <UserRound size={18} />
              </div>

              <div>
                <span>Gender</span>
                <strong>
                  {profile.gender || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>City</span>
                <strong>
                  {profile.city || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <Calendar size={18} />
              </div>

              <div>
                <span>Date of Birth</span>
                <strong>
                  {formatDate(profile.dob)}
                </strong>
              </div>
            </div>

          </div>

        ) : (

          /* =========================
             EDIT MODE
          ========================== */
          <div className="profile-form">

            <div className="profile-form-grid">

              {/* NAME */}
              <div className="form-group">
                <label>
                  Full Name
                </label>

                <div className="profile-input-wrapper">
                  <User size={17} />

                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>
                  Email Address
                </label>

                <div className="profile-input-wrapper">
                  <Mail size={17} />

                  <input
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label>
                  Phone Number
                </label>

                <div className="profile-input-wrapper">
                  <Phone size={17} />

                  <input
                    type="tel"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* GENDER */}
              <div className="form-group">
                <label>
                  Gender
                </label>

                <div className="profile-input-wrapper">
                  <UserRound size={17} />

                  <select
                    name="gender"
                    value={editProfile.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>
              </div>

              {/* CITY */}
              <div className="form-group">
                <label>
                  City
                </label>

                <div className="profile-input-wrapper">
                  <MapPin size={17} />

                  <input
                    type="text"
                    name="city"
                    value={editProfile.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="form-group">
                <label>
                  Date of Birth
                </label>

                <div className="profile-input-wrapper">
                  <Calendar size={17} />

                  <input
                    type="date"
                    name="dob"
                    value={editProfile.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

            {/* FORM ACTIONS */}
            <div className="profile-form-actions">

              <button
                type="button"
                className="btn secondary"
                onClick={handleCancel}
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="button"
                className="btn primary"
                onClick={handleSave}
              >
                <Save size={17} />
                Save Changes
              </button>

            </div>

          </div>

        )}

      </div>

      {/* INFORMATION BOX */}
      <div className="profile-info-box">
        <div className="profile-info-icon">
          <User size={19} />
        </div>

        <div>
          <strong>Your profile information</strong>

          <p>
            You can update your personal details whenever needed.
            Your changes are saved automatically to your profile.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Profile;