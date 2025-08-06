import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ApplicationForm() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appTypeFromURL = params.get("type") || "Adopt";

  const [formData, setFormData] = useState({
    type: appTypeFromURL,
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    residenceType: '',
    ownOrRent: '',
    landlordName: '',
    landlordPhone: '',
    petRestrictions: '',
    additionalResidents: '',
    allergies: '',
    previouslyOwnedPets: '',
    additionalPets: '',
    vetInfo: '',
    aloneTime: '',
    playTime: '',
    livingSituation: '',
    budget: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fixed route to match server.js SLA
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/applications`, formData);
      alert("Application submitted!");
    } catch (err) {
      alert("Failed to submit application.");
      console.error(err);
    }
  };

  const isVolunteer = formData.type === "Volunteer";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">{formData.type} Application</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Adopt">Adopt</option>
              <option value="Foster">Foster</option>
              <option value="Volunteer">Volunteer</option>
            </select>

            {/* Basic Info */}
            <input name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="age" value={formData.age} placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="gender" value={formData.gender} placeholder="Gender" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded" />

            {!isVolunteer && (
              <>
                {/* Address */}
                <input name="street1" value={formData.address.street1} placeholder="Street Address" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="street2" value={formData.address.street2} placeholder="Street Address 2" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="city" value={formData.address.city} placeholder="City" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="state" value={formData.address.state} placeholder="State" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="zip" value={formData.address.zip} placeholder="Zip Code" onChange={handleChange} className="w-full p-2 border rounded" />

                {/* Residence Info */}
                <input name="residenceType" value={formData.residenceType} placeholder="Type of Residence (House/Apartment)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="ownOrRent" value={formData.ownOrRent} placeholder="Do you own or rent?" onChange={handleChange} className="w-full p-2 border rounded" />
                {formData.ownOrRent.toLowerCase() === "rent" && (
                  <>
                    <input name="landlordName" value={formData.landlordName} placeholder="Landlord Name" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="landlordPhone" value={formData.landlordPhone} placeholder="Landlord Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="petRestrictions" value={formData.petRestrictions} placeholder="Any pet restrictions?" onChange={handleChange} className="w-full p-2 border rounded" />
                  </>
                )}

                {/* Household and Pet Info */}
                <input name="additionalResidents" value={formData.additionalResidents} placeholder="Additional residents (Name/Age/Gender)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="allergies" value={formData.allergies} placeholder="Any known allergies?" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="previouslyOwnedPets" value={formData.previouslyOwnedPets} placeholder="Have you previously owned pets?" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="additionalPets" value={formData.additionalPets} placeholder="Other pets in the household (Species/Breed/Age/etc)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="vetInfo" value={formData.vetInfo} placeholder="Veterinarian (Name/Address/Phone)" onChange={handleChange} className="w-full p-2 border rounded" />

                {/* Adoption/Foster Specific */}
                <input name="aloneTime" value={formData.aloneTime} placeholder="How long will the animal be alone? (hours/day)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="playTime" value={formData.playTime} placeholder="Time you can dedicate to play (daily)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="livingSituation" value={formData.livingSituation} placeholder="Where will the animal live? (Indoors/Outdoors)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="budget" value={formData.budget} placeholder="Estimated monthly budget for the animal" onChange={handleChange} className="w-full p-2 border rounded" />
              </>
            )}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit {formData.type} Application
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ApplicationForm;
