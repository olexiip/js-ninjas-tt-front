
import React, {useState, useEffect} from "react";
import ListItem from "../../components/ListItem/ListItem.js"
import ShowItem from "../../components/ShowItemModal/ShowItem.js"
import useApi from "../../hooks/useApi.js";
import Pages from '../../components/Pagination/pagination.js';

const List = () => {  
  const api = useApi();
  const pagLimit = 6;

    useEffect(()=>{
        getItems(1);
    }, []);

  const [updatedList, updateListState] = useState({itemList:[], page:1, total:undefined, limit: pagLimit});
  const [currentShowModal, updateShowModal] = useState({});
  
  const getItems = async (page=1) => {
    try {
      const getTodoResp = await api.getListFree({ limit: pagLimit, page: page});;
      if (getTodoResp?.data) {
        updateListState(getTodoResp.data);
      }
    } catch (e) {
      console.log(e);
    }
}

    const handleShowClose = () => {
      updateShowModal({});
  }
    const showShowModal = (props) => {
      return (
        <ShowItem 
        show={currentShowModal.show} 
        _id={currentShowModal._id} 
        item={currentShowModal.item}
        handleClose = {handleShowClose} 
        > </ShowItem>  )
    };
    const showItemHandler = (item) => {
      updateShowModal({show:true, item:item});
    }

  const onChangePage = (page) => {
    if (page === updatedList.page) {
      return;
    };
    const fff  = getItems(page);
    console.log(fff)
    return fff;
  };

  const getPagesCount = () => {
    return Math.ceil(updatedList.total / updatedList.limit);
  };

    return (
      <div className="mainContainer">
      <div className="h2-wrapper">
        <h2>all created heroes)</h2>
      </div>
      <div className="List"> 

          {
              updatedList?.itemList.map((item)=>(
                  <ListItem 
                      key={item._id} 
                      item={item} 
                      showItemHandler={showItemHandler}
                  ></ListItem>
              ))
              
          }
        </div>  
          <Pages
            onChange={onChangePage}
            active={updatedList.page}
            pages={getPagesCount()}
            maxButtons={3}
          />     
          {currentShowModal.show?showShowModal():console.log()}
            
      </div>
    )
}

export default List;