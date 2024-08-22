import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './RightSidebar.css';

const RightSidebar = ({ isOpen, onClose, selectedLead }) => {
  const [status, setStatus] = useState('');
  const [nextFollowup, setNextFollowup] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [response, setResponse] = useState(''); // New state for the radio buttons

  useEffect(() => {
    if (selectedLead) {
      setStatus(selectedLead.status || '');
      setNextFollowup(selectedLead.nextFollowup || '');
      setAssignedTo(selectedLead.assignedTo || '');
      setComments(selectedLead.comment || []);
    }
  }, [selectedLead]);

  const handleSave = async () => {
    try {
      const leadRef = doc(db, 'leads', selectedLead.id);

      await updateDoc(leadRef, {
        status: status,
        nextFollowup: nextFollowup,
        assignedTo: assignedTo,
        comment: arrayUnion(newComment),
        response: response // Save the selected response
      });

      alert('Lead updated successfully!');
      setNewComment('');
      onClose();
    } catch (error) {
      console.error('Error updating lead: ', error);
    }
  };

  return (
    <div className={`right-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <div className="sidebar-content">
        <h2>Business Details</h2>
        {/* Business Details */}
        <div className="sidebar-row">
          <div className="sidebar-item">
            <h3>Business Name:</h3>
            <p>{selectedLead?.businessName}</p>
          </div>
          <div className="sidebar-item">
            <h3>Business Type:</h3>
            <p>{selectedLead?.businessType}</p>
          </div>
        </div>
        {/* Contact Details */}
        <div className="sidebar-row">
          <div className="sidebar-item">
            <h3>Contact:</h3>
            <p>{selectedLead?.contactNumber}</p>
          </div>
          <div className="sidebar-item">
            <h3>Email ID:</h3>
            <p>{selectedLead?.emailId}</p>
          </div>
        </div>
        {/* Status and Follow-up Row */}
        <div className="sidebar-row">
          <div className="sidebar-item">
            <h3>Status:</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="details shared">Details Shared</option>
              <option value="demo scheduled">Demo Scheduled</option>
              <option value="demo done">Demo Done</option>
              <option value="lead won">Lead Won</option>
              <option value="lead lost">Lead Lost</option>
            </select>
          </div>
          <div className="sidebar-item">
            <h3>Next Follow-up Date:</h3>
            <input
              type="date"
              value={nextFollowup ? new Date(nextFollowup).toISOString().split('T')[0] : ''}
              onChange={(e) => setNextFollowup(e.target.value)}
            />
          </div>
        </div>

        {/* Radio Buttons Under Status */}
        <div className="sidebar-row">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="attended"
                checked={response === 'attended'}
                onChange={(e) => setResponse(e.target.value)}
              />
              Attended
            </label>
            <label>
              <input
                type="radio"
                value="rejected"
                checked={response === 'rejected'}
                onChange={(e) => setResponse(e.target.value)}
              />
              Rejected
            </label>
            <label>
              <input
                type="radio"
                value="postponed"
                checked={response === 'postponed'}
                onChange={(e) => setResponse(e.target.value)}
              />
              Postponed
            </label>
            <label>
              <input
                type="radio"
                value="no reply"
                checked={response === 'no reply'}
                onChange={(e) => setResponse(e.target.value)}
              />
              No Reply
            </label>
          </div>
        </div>

        {/* Assigned To */}
        <div className="sidebar-row">
          <div className="sidebar-item">
            <h3>Assigned To:</h3>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>
        </div>
        {/* Add Comment Section */}
        <div className="sidebar-row full-width-row">
          <div className="sidebar-item full-width">
            <h3>Add a Comment:</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment here..."
              className="comment-input"
            />
          </div>
        </div>
        {/* Previous Comments Section */}
        <div className="sidebar-row full-width-row">
          <div className="sidebar-item full-width">
            <h3>Previous Comments:</h3>
            {comments && comments.length > 0 ? (
              <ul className="comments-list">
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
        {/* Save Button */}
        <div className="sidebar-row full-width-row">
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
