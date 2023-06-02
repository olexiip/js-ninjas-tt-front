import ListItem from "../ListItem/ListItem.js"
import ShowItem from "../ShowItemModal/ShowItem.js"
import React, {useState, useEffect} from "react";
import useApi from "../Hooks/useApi.js";
import Pages from '../Pagination/pagination.js';


const List = () => {  
  console.log(">>>List")
  const api = useApi();
  const pagLimit = 10;

    useEffect(()=>{
        getItems(1);
    }, []);

  const [updatedList, updateListState] = useState({itemList:[], page:1, total:undefined, limit: pagLimit});
  const [currentShowModal, updateShowModal] = useState({});


  
  const getItems = async (page=1) => {
    const update = async (getTodoResp) => {
      //console.log(getTodoResp.data);s
      updateListState(getTodoResp.data);
      console.log("update list");
    }
    await api.getListFree({ limit: pagLimit, page: page}).then(update);
  }
    
        
  //--------------------------------------------------------------SHOW  
    const handleShowClose = () => {
      updateShowModal({});
  }
    const showShowModal = (props) => {
      // console.log(props)
      // console.log("show item")
      // console.log(props)
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
  //--------------------------------------------------------------PAGINATION

  const onChangePage = (page) => {
    console.log(`page ${page}`)
    if (page === updatedList.page) {
      return;
    };
    getItems(page);
  };

  const getPagesCount = () => {
    return Math.ceil(updatedList.total / updatedList.limit);
  };
  //--------------------------------------------------------------|

    return (
      <div className="List"> 
        Register and create ur own hero



          {
              updatedList.itemList.map((item)=>(
                  <ListItem 
                      key={item._id} 
                      item={item} 
                      showItemHandler={showItemHandler}
                  ></ListItem>
              ))
              
          }
          
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