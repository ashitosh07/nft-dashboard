import React, { useState, useEffect } from 'react';
import { monadAPI } from '../services/apiService';

const ActivityFeed = ({ collectionId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (collectionId) {
      fetchActivity();
    }
  }, [collectionId]);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const data = await monadAPI.getCollectionActivity(collectionId);
      if (data?.activities) {
        setActivities(data.activities.slice(0, 10));
      }
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatPrice = (price) => {
    return `${parseFloat(price).toLocaleString()} MON`;
  };

  if (loading) return <div className="activity-loading">Loading activity...</div>;

  return (
    <div className="activity-feed">
      <h3>Recent Activity</h3>
      {activities.length > 0 ? (
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-type">
                {activity.type === 'sale' ? '💰' : activity.type === 'transfer' ? '🔄' : '📝'}
                <span>{activity.type}</span>
              </div>
              <div className="activity-details">
                <div className="activity-price">
                  {activity.price && formatPrice(activity.price.amount.decimal)}
                </div>
                <div className="activity-time">
                  {formatTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent activity</p>
      )}
    </div>
  );
};

export default ActivityFeed;