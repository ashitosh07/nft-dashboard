import React, { useState } from 'react';

const PriceAlert = ({ collection, onSetAlert }) => {
  const [alertPrice, setAlertPrice] = useState('');
  const [alertType, setAlertType] = useState('above');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alertPrice && onSetAlert) {
      onSetAlert({
        collectionId: collection.id,
        collectionName: collection.name,
        targetPrice: parseFloat(alertPrice),
        type: alertType,
        currentPrice: collection.floorPrice
      });
      setShowForm(false);
      setAlertPrice('');
    }
  };

  return (
    <div className="price-alert">
      {!showForm ? (
        <button 
          className="alert-button"
          onClick={() => setShowForm(true)}
        >
          🔔 Set Alert
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="alert-form">
          <select 
            value={alertType} 
            onChange={(e) => setAlertType(e.target.value)}
            className="alert-select"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Price in MON"
            value={alertPrice}
            onChange={(e) => setAlertPrice(e.target.value)}
            className="alert-input"
            required
          />
          <button type="submit" className="alert-submit">Set</button>
          <button 
            type="button" 
            onClick={() => setShowForm(false)}
            className="alert-cancel"
          >
            ✕
          </button>
        </form>
      )}
    </div>
  );
};

export default PriceAlert;