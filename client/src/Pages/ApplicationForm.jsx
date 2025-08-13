import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ApplicationForm() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appTypeFromURL = params.get("type") || "Adopt";

  const defaultAvailability = {
    Monday: { available: false, start: "", end: "" },
    Tuesday: { available: false, start: "", end: "" },
    Wednesday: { available: false, start: "", end: "" },
    Thursday: { available: false, start: "", end: "" },
    Friday: { available: false, start: "", end: "" },
    Saturday: { available: false, start: "", end: "" },
    Sunday: { available: false, start: "", end: "" },
  };

  const [formData, setFormData] = useState({
    type: appTypeFromURL,
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    residenceType: '',
    ownOrRent: '',
    landlordName: '',
    landlordPhone: '',
    petRestrictions: '',
    // single-field fallback (keeps backward-compat)
    additionalResidents: '',
    // list for multiple residents
    additionalResidentsList: [],
    hasAllergies: false,
    allergies: '',
    previouslyOwnedPets: '',
    hasOtherPets: false,
    // single-pet fallback fields
    otherPetType: '',
    dogBreed: '',
    dogAge: '',
    // list for multiple pets
    otherPetsList: [],
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
    },
    showAdditionalResidents: false,
    availability: defaultAvailability, // volunteer availability
  });

  // Generic change handler (keeps existing behavior)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Availability change handler (for volunteer)
  const handleAvailabilityChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value,
        },
      },
    }));
  };

  // --- Additional Residents list helpers ---
  const addResidentFromSingle = () => {
    const val = formData.additionalResidents.trim();
    const list = [...formData.additionalResidentsList];
    if (val) list.push(val);
    else list.push('');
    setFormData({ ...formData, additionalResidentsList: list, additionalResidents: '' });
  };

  const addResidentBlank = () => {
    setFormData({ ...formData, additionalResidentsList: [...formData.additionalResidentsList, ''] });
  };

  const updateResident = (index, value) => {
    const list = [...formData.additionalResidentsList];
    list[index] = value;
    setFormData({ ...formData, additionalResidentsList: list });
  };

  const removeResident = (index) => {
    const list = formData.additionalResidentsList.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalResidentsList: list });
  };

  // --- Other Pets list helpers ---
  const addPetFromSingle = () => {
    // use single-pet fields (otherPetType/dogBreed/dogAge)
    const entry = {
      type: formData.otherPetType || '',
      breed: formData.dogBreed || '',
      age: formData.dogAge || '',
    };
    const list = [...formData.otherPetsList, entry];
    // clear single pet fields
    setFormData({
      ...formData,
      otherPetsList: list,
      otherPetType: '',
      dogBreed: '',
      dogAge: '',
    });
  };

  const addPetBlank = () => {
    setFormData({ ...formData, otherPetsList: [...formData.otherPetsList, { type: '', breed: '', age: '' }] });
  };

  const updatePet = (index, field, value) => {
    const list = [...formData.otherPetsList];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, otherPetsList: list });
  };

  const removePet = (index) => {
    const list = formData.otherPetsList.filter((_, i) => i !== index);
    setFormData({ ...formData, otherPetsList: list });
  };

  // Submit: normalize payload (flatten address, normalize lists)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload
    const payload = {
      ...formData,
      // flatten address to top-level (optional depending on your backend)
      street1: formData.address.street1,
      street2: formData.address.street2,
      city: formData.address.city,
      state: formData.address.state,
      zip: formData.address.zip,
    };

    // Normalize additionalResidents: prefer list if present, otherwise single string -> array (or empty)
    if (formData.additionalResidentsList && formData.additionalResidentsList.length) {
      payload.additionalResidents = formData.additionalResidentsList;
    } else if (formData.additionalResidents && formData.additionalResidents.trim()) {
      payload.additionalResidents = [formData.additionalResidents.trim()];
    } else {
      payload.additionalResidents = [];
    }

    // Normalize otherPets: prefer list; if none but single fields exist, create one entry
    if (formData.otherPetsList && formData.otherPetsList.length) {
      payload.otherPets = formData.otherPetsList;
    } else if (formData.hasOtherPets) {
      // if user indicated hasOtherPets but didn't make a list, use single fallback
      if (formData.otherPetType || formData.dogBreed || formData.dogAge) {
        payload.otherPets = [{
          type: formData.otherPetType || '',
          breed: formData.dogBreed || '',
          age: formData.dogAge || '',
        }];
      } else {
        payload.otherPets = [];
      }
    } else {
      payload.otherPets = [];
    }
    
    // Remove helper fields we don't need to send (optional)
    delete payload.address;
    delete payload.additionalResidentsList;
    delete payload.otherPetsList;
    // remove single-pet fallback fields if you want (optional)
    delete payload.otherPetType;
    delete payload.dogBreed;
    delete payload.dogAge;

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/applications`, payload);
      alert("Application submitted!");
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Failed to submit application.");
    }
  };

  const isVolunteer = formData.type === "Volunteer";

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#102542]">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">{formData.type} Application</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Application Type */}
            <div>
              <label className="block font-medium mb-1">Application Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border-b"
              >
                <option value="Adopt">Adopt</option>
                <option value="Foster">Foster</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="p-2 border-b" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="p-2 border-b" />
                <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="p-2 border-b" />
                <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border-b">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="p-2 border-b" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border-b" />
              </div>
            </div>

            {!isVolunteer && (
              <>
                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-1 mb-4">Address</h3>
                  <input name="street1" value={formData.address.street1} onChange={handleChange} placeholder="Street Address" className="w-full p-2 border-b mb-2" />
                  <input name="street2" value={formData.address.street2} onChange={handleChange} placeholder="Street Address 2" className="w-full p-2 border-b mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="city" value={formData.address.city} onChange={handleChange} placeholder="City" className="p-2 border-b" />
                    <input name="state" value={formData.address.state} onChange={handleChange} placeholder="State" className="p-2 border-b" />
                    <input name="zip" value={formData.address.zip} onChange={handleChange} placeholder="ZIP Code" className="p-2 border-b" />
                  </div>
                </div>

                {/* Residence Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-1 mb-4">Residence</h3>
                  <input name="residenceType" value={formData.residenceType} onChange={handleChange} placeholder="House / Apartment" className="w-full p-2 border-b mb-2" />
                  <select name="ownOrRent" value={formData.ownOrRent} onChange={handleChange} className="w-full p-2 border-b mb-2">
                    <option value="">Do you own or rent?</option>
                    <option value="Own">Own</option>
                    <option value="Rent">Rent</option>
                  </select>
                  {formData.ownOrRent === "Rent" && (
                    <>
                      <input name="landlordName" value={formData.landlordName} onChange={handleChange} placeholder="Landlord Name" className="w-full p-2 border-b mb-2" />
                      <input name="landlordPhone" value={formData.landlordPhone} onChange={handleChange} placeholder="Landlord Phone" className="w-full p-2 border-b mb-2" />
                      <input name="petRestrictions" value={formData.petRestrictions} onChange={handleChange} placeholder="Any pet restrictions?" className="w-full p-2 border-b" />
                    </>
                  )}
                </div>

                {/* Household Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-1 mb-4">Household</h3>

                  {/* Additional residents checkbox */}
                  <label className="flex items-center mb-2">
                    <input type="checkbox" name="showAdditionalResidents" checked={formData.showAdditionalResidents} onChange={handleChange} className="mr-2" />
                    Additional Residents?
                  </label>

                  {formData.showAdditionalResidents && (
                    <div className="space-y-3">
                      {/* If a dynamic list already exists show it */}
                      {formData.additionalResidentsList && formData.additionalResidentsList.length > 0 ? (
                        <>
                          {formData.additionalResidentsList.map((res, i) => (
                            <div key={i} className="flex gap-2 items-center">
                              <input
                                value={res}
                                onChange={(e) => updateResident(i, e.target.value)}
                                placeholder="Resident name / age / gender"
                                className="flex-1 p-2 border-b"
                              />
                              <button type="button" onClick={() => removeResident(i)} className="px-2 bg-red-500 text-white rounded">−</button>
                            </div>
                          ))}
                          <button type="button" onClick={addResidentBlank} className="text-blue-600">+ Add another resident</button>
                        </>
                      ) : (
                        // No list yet: show the single input + an "Add" button that converts it into the list
                        <div className="flex gap-2 items-center">
                          <input name="additionalResidents" value={formData.additionalResidents} onChange={handleChange} placeholder="Additional resident (Name/Age/Gender)" className="flex-1 p-2 border-b" />
                          <button type="button" onClick={addResidentFromSingle} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Allergies */}
                  <label className="flex items-center mb-2 mt-4">
                    <input type="checkbox" name="hasAllergies" checked={formData.hasAllergies} onChange={handleChange} className="mr-2" />
                    Any allergies?
                  </label>
                  {formData.hasAllergies && (
                    <input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Please list allergies" className="w-full p-2 border-b mb-2" />
                  )}

                  {/* Previously owned */}
                  <label className="block font-medium mb-1 mt-2">Previously owned pets?</label>
                  <select name="previouslyOwnedPets" value={formData.previouslyOwnedPets} onChange={handleChange} className="w-full p-2 border-b mb-2">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  {/* Other pets logic */}
                  <label className="flex items-center mb-2">
                    <input type="checkbox" name="hasOtherPets" checked={formData.hasOtherPets} onChange={handleChange} className="mr-2" />
                    Other pets in household?
                  </label>

                  {formData.hasOtherPets && (
                    <div className="space-y-3">
                      {/* If list exists show dynamic list */}
                      {formData.otherPetsList && formData.otherPetsList.length > 0 ? (
                        <>
                          {formData.otherPetsList.map((pet, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                              <select value={pet.type} onChange={(e) => updatePet(i, 'type', e.target.value)} className="p-2 border-b">
                                <option value="">Type</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                              </select>
                              <input value={pet.breed} onChange={(e) => updatePet(i, 'breed', e.target.value)} placeholder="Breed" className="p-2 border-b" />
                              <input value={pet.age} onChange={(e) => updatePet(i, 'age', e.target.value)} placeholder="Age" className="p-2 border-b" />
                              <button type="button" onClick={() => removePet(i)} className="px-2 bg-red-500 text-white rounded">−</button>
                            </div>
                          ))}
                          <button type="button" onClick={addPetBlank} className="text-blue-600">+ Add another pet</button>
                        </>
                      ) : (
                        // No list yet: show single-pet fallback inputs + a button to add to list
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <select name="otherPetType" value={formData.otherPetType} onChange={handleChange} className="p-2 border-b">
                              <option value="">Select Pet Type</option>
                              <option value="Dog">Dog</option>
                              <option value="Cat">Cat</option>
                            </select>
                            <input name="dogBreed" value={formData.dogBreed} onChange={handleChange} placeholder="Breed" className="p-2 border-b" />
                            <input name="dogAge" value={formData.dogAge} onChange={handleChange} placeholder="Age" className="p-2 border-b" />
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={addPetFromSingle} className="px-3 py-1 bg-blue-600 text-white rounded">Add to list</button>
                            <button type="button" onClick={addPetBlank} className="px-3 py-1 border rounded">+ Start multi-pet list</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <input name="vetInfo" value={formData.vetInfo} onChange={handleChange} placeholder="Veterinarian Info" className="w-full p-2 border-b mb-2 mt-4" />
                </div>

                {/* Pet Care Info */}
                <div>
                  <h3 className="text-lg font-semibold border-b pb-1 mb-4">Pet Care</h3>
                  <input name="aloneTime" value={formData.aloneTime} onChange={handleChange} placeholder="How long will the animal be alone?" className="w-full p-2 border-b mb-2" />
                  <input name="playTime" value={formData.playTime} onChange={handleChange} placeholder="Time you can dedicate to play" className="w-full p-2 border-b mb-2" />
                  <input name="livingSituation" value={formData.livingSituation} onChange={handleChange} placeholder="Where will the animal live?" className="w-full p-2 border-b mb-2" />
                  <input name="budget" value={formData.budget} onChange={handleChange} placeholder="Estimated monthly budget" className="w-full p-2 border-b" />
                </div>
              </>
            )}

            {/* Volunteer-only Availability */}
            {isVolunteer && (
              <div>
                <h3 className="text-lg font-semibold border-b pb-1 mb-4">Volunteer Availability</h3>
                <div className="space-y-3">
                  {Object.keys(formData.availability).map((day) => {
                    const dayObj = formData.availability[day];
                    return (
                      <div key={day} className="flex items-center gap-3">
                        <label className="flex items-center gap-2 w-40">
                          <input
                            type="checkbox"
                            checked={dayObj?.available || false}
                            onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="w-24">{day}</span>
                        </label>

                        <input
                          type="time"
                          value={dayObj?.start || ""}
                          onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                          className="p-2 border rounded"
                          disabled={!dayObj?.available}
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={dayObj?.end || ""}
                          onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                          className="p-2 border rounded"
                          disabled={!dayObj?.available}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
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
