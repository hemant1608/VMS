import React, { useRef, useState ,useEffect } from "react";

const CheckInForm = () => {
  const formRef = useRef();
  const [showCustomName, setShowCustomName] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    const whomToMeet =
      form["whomToMeet"].value === "other"
        ? form["customWhomToMeet"].value
        : form["whomToMeet"].value;

    const formData = {
      fullName: form["fullName"].value,
      contact: form["contact"].value,
      email: form["email"].value,
      department: form["department"].value,
      whomToMeet: whomToMeet,
      purpose: form["purpose"].value,
      photo: form["photo"].files[0] || null,
    };

    console.log("Form Data:", formData);
    form.reset();
    setShowCustomName(false);
    setPreviewImage(null);
  };

  const handleWhomToMeetChange = (e) => {
    setShowCustomName(e.target.value === "other");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-10 px-4 box-border">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-6 text-gray-900"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800">
          Visitor Check-In Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Enter full name"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact No</label>
            <input
              type="tel"
              name="contact"
              required
              placeholder="+91 9876543210"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="department"
              required
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Admin">Admin</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Whom to Meet */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Whom to Meet</label>
            <select
              name="whomToMeet"
              required
              onChange={handleWhomToMeetChange}
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Mr. Sharma">Mr. Sharma</option>
              <option value="Ms. Kapoor">Ms. Kapoor</option>
              <option value="other">Other</option>
            </select>
          </div>

          {showCustomName && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Enter Name</label>
              <input
                type="text"
                name="customWhomToMeet"
                required
                placeholder="Enter person's name"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}

          {/* Purpose */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Purpose of Visit</label>
            <textarea
              name="purpose"
              rows={2}
              required
              placeholder="Mention your purpose..."
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Photo Capture */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Take Selfie</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              capture="user"
              onChange={handlePhotoChange}
              className="w-full text-gray-900"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 h-32 rounded-lg object-cover border border-gray-300"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckInForm;
