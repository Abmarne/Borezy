// src/utils/fetchRealTimeDate.js
export const fetchRealTimeDate = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/UTC');
      if (!response.ok) {
        throw new Error('Failed to fetch time data');
      }
      const data = await response.json();
      return new Date(data.datetime);
    } catch (error) {
      console.error('Error fetching real-time date:', error);
      return new Date();
    }
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const d = typeof date === 'object' && date.seconds 
    ? new Date(date.seconds * 1000)
    : new Date(date);
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  
  const d = typeof date === 'object' && date.seconds
    ? new Date(date.seconds * 1000)
    : new Date(date);
  
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateDaysRemaining = (endDate) => {
  if (!endDate) return 0;
  
  const end = typeof endDate === 'object' && endDate.seconds
    ? new Date(endDate.seconds * 1000)
    : new Date(endDate);
  
  const today = new Date();
  const diffTime = end - today;
  
  if (diffTime < 0) return 0;
  
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};
  