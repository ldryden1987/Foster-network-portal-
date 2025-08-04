import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Message sent successfully!");
        setName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setSuccessMessage("");
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      setSuccessMessage("");
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 p-2 w-full"
      />
      <textarea
        placeholder="Enter your question or message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        className="border border-gray-300 p-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-[#102542] text-white px-4 py-2 hover:bg-[#1c3a5f]"
      >
        Submit
      </button>
      {successMessage && (
        <p className="mt-2 text-[#102542] font-medium">{successMessage}</p>
      )}
    </form>
  );
}

export default ContactForm;
