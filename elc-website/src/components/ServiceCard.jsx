import React from 'react';

const ServiceCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-blue-600">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServiceCard;