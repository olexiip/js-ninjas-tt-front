import ListItem from "../ListItem/ListItem.js"
import ShowItem from "../ShowItemModal/ShowItem.js"
import React, {useState, useEffect} from "react";
import useApi from "../Hooks/useApi.js";
import Pages from '../Pagination/pagination.js';

const List = () => {  
  const api = useApi();
  const pagLimit = 6;

    useEffect(()=>{
        getItems(1);
    }, []);

  const [updatedList, updateListState] = useState({itemList:[], page:1, total:undefined, limit: pagLimit});
  const [currentShowModal, updateShowModal] = useState({});
  
  const getItems = async (page=1) => {
    const update = (getTodoResp) => {
      console.log(getTodoResp);
      if(getTodoResp?.hasOwnProperty('data')) {
        updateListState(getTodoResp?.data);
      }
      console.log("no data")
    }
    await api.getListFree({ limit: pagLimit, page: page}).then(update);
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
      <div>
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