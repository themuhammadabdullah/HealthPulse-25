import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample data with strategic locations
const diseaseOutbreakData = [
  {
    id: 1,
    location: [40.7128, -74.0060],
    region:"New York",
    // New York
    cases: 2500,
    disease: "Influenza",
    prediction: "High Alert",
    medicineDemand: {
      antibiotics: 3000,
      antivirals: 2500
    }
  },
  {
    id: 2,
    location: [25.2744, -80.2425], // Miami
    region:"Miami",
    cases: 1800,
    disease: "COVID-19",
    prediction: "Critical",
    medicineDemand: {
      antibiotics: 2000,
      antivirals: 1800
    }
  },
  {
    id: 3,
    location: [51.5074, -0.1278], // London
    region:"London",
    cases: 2200,
    disease: "Respiratory Infection",
    prediction: "Severe",
    medicineDemand: {
      antibiotics: 2500,
      antivirals: 2000
    }
  },
  {
    id: 4,
    location: [19.0760, 72.8777], // Mumbai
    region:"Mumbai",
    cases: 2800,
    disease: "Dengue",
    prediction: "Severe Outbreak",
    medicineDemand: {
      antibiotics: 3000,
      antivirals: 2500
    }
  },
  {
    id: 5,
    location: [35.6762, 139.6503], // Tokyo
    region:"Tokyo",
    cases: 1650,
    disease: "Seasonal Flu",
    prediction: "High Risk",
    medicineDemand: {
      antibiotics: 2000,
      antivirals: 1500
    }
  },
  {
    id: 6,
    location: [-33.8688, 151.2093], 
    region:"Sydney",
    cases: 1900,
    disease: "Viral Infection",
    prediction: "Critical",
    medicineDemand: {
      antibiotics: 2200,
      antivirals: 1800
    }
  },
  {
    id: 7,
    location: [-1.2921, 36.8219], // Nairobi
    region:" Nairobi",
    cases: 2100,
    disease: "Malaria",
    prediction: "High Risk",
    medicineDemand: {
      antibiotics: 2400,
      antivirals: 2000
    }
  },
  {
    id: 8,
    location: [55.7558, 37.6173], // Moscow
    region:"Moscow",
    cases: 1750,
    disease: "Pneumonia",
    prediction: "Severe",
    medicineDemand: {
      antibiotics: 2000,
      antivirals: 1600
    }
  },
  {
    id: 9,
    location: [-22.9068, -43.1729], // Rio de Janeiro
    region:"Rio de Janeiro",
    cases: 2300,
    disease: "Zika",
    prediction: "Critical",
    medicineDemand: {
      antibiotics: 2600,
      antivirals: 2200
    }
  },
  {
    id: 10,
    location: [23.1291, 113.2644], // Guangzhou
    region:"Guangzhou",
    cases: 2000,
    disease: "H1N1",
    prediction: "High Alert",
    medicineDemand: {
      antibiotics: 2300,
      antivirals: 1900
    }
  },
  {
    id: 11,
    location: [41.8781, -87.6298], // Chicago
    region:"Chicago",
    cases: 1900,
    disease: "Influenza B",
    prediction: "Severe",
    medicineDemand: {
      antibiotics: 2200,
      antivirals: 1800
    }
  },
  {
    id: 12,
    location: [-34.6037, -58.3816], // Buenos Aires
    region:"Buenos Aires",
    cases: 100,
    disease: "Dengue",
    prediction: "Critical",
    medicineDemand: {
      antibiotics: 2800,
      antivirals: 2300
    }
  }
];

const DiseaseHeatmap = () => {
  const [mapCenter] = useState([30, 0]); // Better initial view position

  // Function to determine circle color based on number of cases
  const getColor = (cases) => {
    if (cases >= 2000) return "#dc2626"; // Bright red for high risk
    if (cases >= 1500) return "#f97316"; // Bright orange for medium risk
    return "#22c55e"; // Bright green for low risk
  };

  // Function to determine circle radius based on number of cases
  const getRadius = (cases) => {
    return Math.sqrt(cases) * 8000; // Large circles for visibility
  };

  return (
    <div className="w-full">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Disease Outbreak Heatmap</h2>
        <div className="h-[600px] w-full rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={mapCenter}
            zoom={3}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={false}
            doubleClickZoom={true}
            dragging={true}
            attributionControl={false}
            keyboard={false}
            minZoom={2}
            maxZoom={8}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap={false}
            />
            
            {diseaseOutbreakData.map((outbreak) => (
              <Circle
                key={outbreak.id}
                center={outbreak.location}
                radius={getRadius(outbreak.cases)}
                pathOptions={{
                  color: getColor(outbreak.cases),
                  fillColor: getColor(outbreak.cases),
                  fillOpacity: 0.7,
                  weight: 3,
                  opacity: 0.9
                }}
              >
                <Popup>
                  <div className="p-3">
                    <h3 className="font-semibold text-lg mb-2">{outbreak.disease}</h3>
                    <h4 className="font-semibold text-lg mb-2">{outbreak.region}</h4>
                    <p className="text-gray-700 font-medium">Cases: {outbreak.cases}</p>
                    <p className="text-gray-700">Status: {outbreak.prediction}</p>
                    <div className="mt-2">
                      <p className="font-medium">Medicine Demand:</p>
                      <ul className="list-disc ml-4">
                        <li>Antibiotics: {outbreak.medicineDemand.antibiotics} units</li>
                        <li>Antivirals: {outbreak.medicineDemand.antivirals} units</li>
                      </ul>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Risk Levels</h4>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span className="text-sm">High Risk (2000+ cases)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm">Medium Risk (1500-1999 cases)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Low Risk (0-1499 cases)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseHeatmap;