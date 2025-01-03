import { useState } from 'react';
import './MeasurementConverter.css';

// Define types for the conversion functions
type ConversionFn = (value: string | number) => string;

// Define the structure of each conversion data type
interface ConversionData {
  units: string[];
  convert: {
    toFirst: ConversionFn;
    toSecond: ConversionFn;
  };
}

// Define the conversion data object with explicit types
const conversionData: Record<string, ConversionData> = {
  Temperature: {
    units: ["Celsius", "Fahrenheit"],
    convert: {
      toSecond: (value) => (value === "" ? "" : ((Number(value) * 9) / 5 + 32).toFixed(2)),
      toFirst: (value) => (value === "" ? "" : (((Number(value) - 32) * 5) / 9).toFixed(2)),
    },
  },
  Length: {
    units: ["Meters", "Feet"],
    convert: {
      toSecond: (value) => (value === "" ? "" : (Number(value) * 3.28084).toFixed(2)),
      toFirst: (value) => (value === "" ? "" : (Number(value) / 3.28084).toFixed(2)),
    },
  },
  Weight: {
    units: ["Kilograms", "Pounds"],
    convert: {
      toSecond: (value) => (value === "" ? "" : (Number(value) * 2.20462).toFixed(2)),
      toFirst: (value) => (value === "" ? "" : (Number(value) / 2.20462).toFixed(2)),
    },
  },
};

const MeasurementConverter = () => {
  const [selectedType, setSelectedType] = useState<string>("Temperature");
  const [firstValue, setFirstValue] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("");

  // when first input changes
  const handleFirstValueChanges = (value: string | number) => {
    setFirstValue(String(value));
    const converted = conversionData[selectedType].convert.toFirst(value);
    setSecondValue(converted);
  };

  // when second input changes
  const handleSecondValueChanges = (value: string | number) => {
    setSecondValue(String(value));
    const converted = conversionData[selectedType].convert.toSecond(value);
    setFirstValue(converted);
  };

  // reset both input fields
  const resetFields = () => {
    setFirstValue("");
    setSecondValue("");
  };

  return (
    <section className="container">
      <h1 className="unit-converter-title">Unit Converter</h1>
      <div className="unit-types">
        {Object.keys(conversionData).map((type) => (
          <button
            key={type}
            className={selectedType === type ? "active" : ""}
            onClick={() => {
              setSelectedType(type);
              resetFields();
            }}
          >
            {type}
          </button>
        ))}
        {/* conversion inputs */}
        <div className="conversion-section">
          <div className="input-group">
            <label htmlFor="first-input">{conversionData[selectedType].units[0]}</label>
            <input
              type="number"
              placeholder={`Enter ${conversionData[selectedType].units[0]}`}
              value={firstValue}
              onChange={(e) => handleFirstValueChanges(e.target.value)}
            />
          </div>
          <span className="equals"> = </span>
          <div className="input-group">
            <label htmlFor="second-input">{conversionData[selectedType].units[1]}</label>
            <input
              type="number"
              placeholder={`Enter ${conversionData[selectedType].units[1]}`}
              value={secondValue}
              onChange={(e) => handleSecondValueChanges(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* reset Button */}
      <button onClick={resetFields} style={{ marginTop: "20px", padding: "10px 15px" }}>
        Reset
      </button>
    </section>
  );
};

export default MeasurementConverter;
