import ListItem from "../ListItem/ListItem.js";
import EditItem from "../EditItem/EditItem.js";
import ShowItem from "../ShowItemModal/ShowItem.js";
import React, { useState, useEffect } from "react";
import CreateItem from "../CreateItem/CreateItem.js";
import useApi from "../Hooks/useApi.js";
import Pages from "../Pagination/pagination.js";
import basicImg from "../img/plus.png";

const List = () => {
  const api = useApi();
  const pagLimit = 5;

  useEffect(() => {
    getItems(1);
  }, []);

  const [updatedList, updateListState] = useState({
    itemList: [],
    page: 1,
    total: undefined,
    limit: pagLimit,
  });
  const [currentModalEdit, updateModal] = useState({});
  const [currentShowModal, updateShowModal] = useState({});
  const [currentCreateModal, updateCreateModal] = useState({});

  const getItems = async (page = 1) => {
    try {
      const getTodoResp = await api.getList({ limit: pagLimit, page: page });
      if (getTodoResp?.data) {
        updateListState(getTodoResp.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    updateModal({ show: false });
    getItems();
  };

  const editItemHandler = (item) => {
    updateModal({ show: true, item });
  };

  function showEditModal() {
    return (
      <EditItem
        show={currentModalEdit.show}
        item={currentModalEdit.item}
        handleClose={handleClose}
      ></EditItem>
    );
  }

  const handleCloseCreate = () => {
    updateCreateModal({ show: false });
  };

  const handleSaveCreate = async (newItem) => {
    await api.createItem(newItem);
    getItems();
    updateCreateModal({ show: false });
  };

  const createItemHandler = () => {
    updateCreateModal({ show: true });
  };

  function showCreateModal() {
    return (
      <CreateItem
        show={true}
        handleClose={handleCloseCreate}
        handleSave={handleSaveCreate}
      ></CreateItem>
    );
  }

  const handleShowClose = () => {
    updateShowModal({});
  };

  const showShowModal = (props) => {
    return (
      <ShowItem
        show={currentShowModal.show}
        _id={currentShowModal._id}
        item={currentShowModal.item}
        handleClose={handleShowClose}
      >
        {" "}
      </ShowItem>
    );
  };

  const showItemHandler = (item) => {
    updateShowModal({ show: true, item: item });
  };

  const onChangePage = (page) => {
    if (page === updatedList.page) {
      return;
    }
    getItems(page);
  };

  const getPagesCount = () => {
    return Math.ceil(updatedList.total / updatedList.limit);
  };

  const basicimage = "url(" + basicImg + ")";

  return (
    <div className="mainContainer">
      <div className="List">
        <div className="ListItem" style={{ backgroundImage: basicimage }}>
          <div onClick={createItemHandler}>
            <div className="clickableArea">
              <div className="itemwrapper">
                <div className="ListHeroNickname">{"add hero"}</div>
                <div className="ListHeroNicknamebg"></div>
              </div>
            </div>
          </div>
        </div>
        {updatedList.itemList.map((item) => (
          <ListItem
            key={item._id}
            item={item}
            editItemHandler={editItemHandler}
            showItemHandler={showItemHandler}
          ></ListItem>
        ))}
      </div>
      <Pages
        onChange={onChangePage}
        active={updatedList.page}s
        pages={getPagesCount()}
        maxButtons={3}
      />
      {currentModalEdit.show ? showEditModal() : console.log()}
      {currentCreateModal.show ? showCreateModal() : console.log()}
      {currentShowModal.show ? showShowModal() : console.log()}
    </div>
  );
};

export default List;
