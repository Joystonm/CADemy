import React from 'react';

const FeedbackPanel = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Feedback</h3>
      <p className="text-yellow-700">
        Great job! You've successfully created your first shape. Try rotating it to see it from different angles.
      </p>
    </div>
  );
};

export default FeedbackPanel;
