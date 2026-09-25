"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Country, State, City } from "country-state-city";
import SearchableSelect from "@/components/SearchableSelect";

export default function LocationModal({ open, onClose }) {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");

  const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
  const stateOptions = countryCode
    ? State.getStatesOfCountry(countryCode).map((s) => ({ value: s.isoCode, label: s.name }))
    : [];
  const cityOptions = countryCode && stateCode
    ? City.getCitiesOfState(countryCode, stateCode).map((c) => ({ value: c.name, label: c.name }))
    : [];

  const handleSubmit = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-8">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 text-center">Select Location</h2>
        <p className="text-sm text-gray-400 text-center mt-1 mb-6">Filter products by location</p>

        <div className="space-y-3">
          <SearchableSelect
            options={countryOptions}
            value={countryCode}
            onChange={(val) => { setCountryCode(val); setStateCode(""); setCity(""); }}
            placeholder="Country"
          />

          {countryCode && (
            <SearchableSelect
              options={stateOptions}
              value={stateCode}
              onChange={(val) => { setStateCode(val); setCity(""); }}
              placeholder="State"
            />
          )}

          {countryCode && stateCode && (
            <SearchableSelect
              options={cityOptions}
              value={city}
              onChange={setCity}
              placeholder="City"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-[#14B8A6] hover:bg-[#119083] text-white text-sm font-semibold py-3 rounded-lg transition-colors"
        >
          Select Location
        </button>
      </div>
    </div>
  );
}
