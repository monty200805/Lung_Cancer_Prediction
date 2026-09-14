import React, { useState } from "react";

const SYMPTOM_FIELDS = [
  ["YELLOW_FINGERS", "Yellow fingers"],
  ["ANXIETY", "Anxiety"],
  ["CHRONIC_DISEASE", "Chronic disease"],
  ["FATIGUE", "Fatigue"],
  ["ALLERGY", "Allergy"],
  ["WHEEZING", "Wheezing"],
  ["COUGHING", "Coughing"],
  ["SHORTNESS_OF_BREATH", "Shortness of breath"],
  ["SWALLOWING_DIFFICULTY", "Swallowing difficulty"],
  ["CHEST_PAIN", "Chest pain"],
];

const LIFESTYLE_FIELDS = [
  ["SMOKING", "Smoking"],
  ["ALCOHOL_CONSUMING", "Alcohol consuming"],
  ["PEER_PRESSURE", "Peer pressure"],
];

const initialState = {
  GENDER: "M",
  AGE: 50,
  SMOKING: 0,
  YELLOW_FINGERS: 0,
  ANXIETY: 0,
  PEER_PRESSURE: 0,
  CHRONIC_DISEASE: 0,
  FATIGUE: 0,
  ALLERGY: 0,
  WHEEZING: 0,
  ALCOHOL_CONSUMING: 0,
  COUGHING: 0,
  SHORTNESS_OF_BREATH: 0,
  SWALLOWING_DIFFICULTY: 0,
  CHEST_PAIN: 0,
};

export default function PredictionForm({ onSubmit, submitting }) {
  const [formData, setFormData] = useState(initialState);

  function handleCheckbox(field) {
    setFormData((prev) => ({ ...prev, [field]: prev[field] ? 0 : 1 }));
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...formData, AGE: Number(formData.AGE) });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="section-title">Demographics</div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" value={formData.GENDER} onChange={(e) => handleChange("GENDER", e.target.value)}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            min="1"
            max="120"
            value={formData.AGE}
            onChange={(e) => handleChange("AGE", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="section-title">Lifestyle</div>
      <div className="form-grid">
        {LIFESTYLE_FIELDS.map(([field, label]) => (
          <div className="field-checkbox" key={field}>
            <input
              type="checkbox"
              id={field}
              checked={!!formData[field]}
              onChange={() => handleCheckbox(field)}
            />
            <label htmlFor={field} style={{ margin: 0 }}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="section-title">Symptoms</div>
      <div className="form-grid">
        {SYMPTOM_FIELDS.map(([field, label]) => (
          <div className="field-checkbox" key={field}>
            <input
              type="checkbox"
              id={field}
              checked={!!formData[field]}
              onChange={() => handleCheckbox(field)}
            />
            <label htmlFor={field} style={{ margin: 0 }}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: 22 }}>
        {submitting ? "Running prediction..." : "Run prediction"}
      </button>
    </form>
  );
}
