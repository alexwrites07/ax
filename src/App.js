
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions';
import UserCard from './components/UserCard';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamDetails = ({ teamMembers, allUsers }) => {
  return (
    <div>
      <h2>Team Details</h2>
      <ul>
        {teamMembers.map((userId) => {
          const user = allUsers.find((user) => user.id === userId);
          return (
            <li key={userId}>
              {`${user.first_name} ${user.last_name} - ${user.domain}, ${user.gender}, ${
                user.available ? 'Available' : 'Not Available'
              }`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleTeamMember = (userId) => {
    const teamMemberIndex = selectedTeamMembers.indexOf(userId);
    const selectedUser = allUsers.find((user) => user.id === userId);

    if (teamMemberIndex !== -1) {
      setSelectedTeamMembers((prevTeamMembers) =>
        prevTeamMembers.filter((id) => id !== userId)
      );
    } else {
      const isDomainUnique = !selectedTeamMembers.some(
        (id) => allUsers.find((user) => user.id === id)?.domain === selectedUser.domain
      );

      const isAvailabilityUnique = !selectedTeamMembers.some(
        (id) => allUsers.find((user) => user.id === id)?.available === selectedUser.available
      );

      if (isDomainUnique && isAvailabilityUnique) {
        setSelectedTeamMembers((prevTeamMembers) => [...prevTeamMembers, userId]);
      }
    }
  };
  const CustomPagination = ({ totalPages, currentPage, handlePageChange }) => {
    const itemsPerPage = 25;
  
    const renderPaginationItems = () => {
      const items = [];
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <span
            key={i}
            className={`pagination-item ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </span>
        );
      }
      return items;
    };
  
    return <div className="custom-pagination">{renderPaginationItems()}</div>;
  };
  const handleCreateTeam = () => {
    console.log('Team created:', selectedTeamMembers);
   
  };

  const renderPaginationItems = () => {
    const items = [];
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );

     
      if (i % 25 === 0) {
        items.push(<br key={`br-${i}`} />);
      }
    }
    return items;
  };

  const filteredUsers = allUsers.filter((user) => {
    const nameMatch = `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const domainMatch = selectedDomain ? user.domain.toLowerCase() === selectedDomain.toLowerCase() : true;
    const genderMatch = selectedGender ? user.gender.toLowerCase() === selectedGender.toLowerCase() : true;
    const availabilityMatch = selectedAvailability ? user.available.toString() === selectedAvailability : true;

    return nameMatch && domainMatch && genderMatch && availabilityMatch;
  });

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4">
      <h1>User Management System</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">Select Domain</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="Business Development">Business Development</option>
          <option value="UI Designing">UI Designing</option>
        </select>
        <select
          className="form-control mb-2"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          className="form-control mb-2"
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <div className="row">
        {currentUsers.map((user) => (
          <div key={user.id} className="col-md-3 mb-4">
            <UserCard
              user={user}
              isSelected={selectedTeamMembers.includes(user.id)}
              onToggleTeamMember={() => toggleTeamMember(user.id)}
            />
          </div>
        ))}
      </div>
      <Pagination className="mt-3">
        {renderPaginationItems()}
      </Pagination>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleCreateTeam}>
          Create Team
        </button>
      </div>
      {selectedTeamMembers.length > 0 && (
        <TeamDetails teamMembers={selectedTeamMembers} allUsers={allUsers} />
      )}
    </div>
  );
};

export default App;
