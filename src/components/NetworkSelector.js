import React from 'react';

const NetworkSelector = ({ selectedNetwork, onNetworkChange, networkStats }) => {
  return (
    <div className="network-selector">
      <div className="network-toggle">
        <button
          className={`network-btn ${selectedNetwork === 'mainnet' ? 'active' : ''}`}
          onClick={() => onNetworkChange('mainnet')}
        >
          🟢 Monad Mainnet
        </button>
        <button
          className={`network-btn ${selectedNetwork === 'testnet' ? 'active' : ''}`}
          onClick={() => onNetworkChange('testnet')}
        >
          🟡 Monad Testnet
        </button>
      </div>
      
      {networkStats && (
        <div className="network-info">
          <div className="network-stat">
            <span className="stat-label">Block:</span>
            <span className="stat-value">{networkStats.blockHeight?.toLocaleString()}</span>
          </div>
          <div className="network-stat">
            <span className="stat-label">TPS:</span>
            <span className="stat-value">{networkStats.tps?.toLocaleString()}</span>
          </div>
          <div className="network-stat">
            <span className="stat-label">Gas:</span>
            <span className="stat-value">{networkStats.gasPrice} MON</span>
          </div>
          <div className="network-stat">
            <span className="stat-label">Validators:</span>
            <span className="stat-value">{networkStats.activeValidators}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;