
import React from 'react';
import './UserCard.css'; 

const UserCard = ({ user, isSelected, onToggleTeamMember }) => {
  return (
    <div className={`card custom-card ${isSelected ? 'border-primary' : ''}`}>
      <img
        src={user.avatar}
        className="card-img-top custom-card-image"
        alt={`${user.first_name} ${user.last_name}`}
      />
      <div className="card-body">
        <h5 className="card-title custom-card-title">{`${user.first_name} ${user.last_name}`}</h5>
        <p className="card-text custom-card-text">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="card-text custom-card-text">
          <strong>Gender:</strong> {user.gender}
        </p>
        <p className="card-text custom-card-text">
          <strong>Availability:</strong> {user.available ? 'Available' : 'Not Available'}
        </p>
        <p className="card-text custom-card-text">
          <strong>Domain:</strong> {user.domain}
        </p>
        <button
          className={`btn ${isSelected ? 'btn-outline-primary' : 'btn-primary'} custom-card-button`}
          onClick={onToggleTeamMember}
        >
          {isSelected ? 'Remove from Team' : 'Add to Team'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
