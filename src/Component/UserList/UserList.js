


import React from "react";
import CardsComponent from "./Card/Cardcomponent";
import TableComponent from "./Table/Table";
import './UserList.css';

const UserListPage = () => {
  return (
    <div className="user-list-page">
      <CardsComponent />
      <TableComponent />
    </div>
  );
};

export default UserListPage;

