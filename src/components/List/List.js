import ListItem from "../ListItem/ListItem.js"
import EditItem from "../EditItem/EditItem.js"
import ShowItem from "../ShowItemModal/ShowItem.js"
import React, {useState, useEffect} from "react";
import CreateItem from "../CreateItem/CreateItem.js";
import useApi from "../Hooks/useApi.js";
import Pages from '../Pagination/pagination.js';
import basicImg from "../img/plus.png";

const List = () => {  
  console.log(">>>List")
  const api = useApi();
  const pagLimit = 10;

    useEffect(()=>{
        getItems(1);
    }, []);

  const [updatedList, updateListState] = useState({itemList:[], page:1, total:undefined, limit: pagLimit});
  const [currentModalEdit, updateModal] = useState({});
  const [currentShowModal, updateShowModal] = useState({});
  const [currentCreateModal, updateCreateModal] = useState({});

  
  const getItems = async (page=1) => {
    const update = async (getTodoResp) => {
      //console.log(getTodoResp.data);s
      updateListState(getTodoResp.data);
      console.log("update list");
    }
    await api.getList({ limit: pagLimit, page: page}).then(update);
  }
    
  const deleteItem = async (clickedID) => {
        console.log(`delete ${clickedID}`);
          await api.delItem({
            "id": clickedID,
            })
            getItems();
  }

  const doneItem = async (clickedID, currStatus) => {
        console.log(`doneItem ${clickedID}`);
        console.log(`doneItem ${currStatus}`);
        await api.isComplited({
          "id": clickedID,
          "isComplited": !currStatus,
          })
          getItems();
  }
    //--------------------------------------------------------------EDIT
    const handleClose = () => {
        updateModal({});
    }
    
    const handleSave = async (editableID, editedTitle) => {
      console.log(`editableID ${editableID}`);
      console.log(`editedTitle ${editedTitle}`);
      await api.update({
        "id": editableID,
        "editedItem": editedTitle,
        })
        getItems();
        updateModal({});
    }

    const editItemHandler = (item) => {
      console.log("edit this item")
      console.log(item)
        updateModal({show:true, item});
    }
    
    function showEditModal() {
      console.log("currentModalEdit--------------------")
      console.log(currentModalEdit)
        return (
            <EditItem 
            show={currentModalEdit.show} 
            item={currentModalEdit.item}
            handleClose = {handleClose} 
            handleSave={handleSave}
        ></EditItem>  
        )
    }


        //--------------------------------------------------------------CREATE
        const handleCloseCreate = () => {
            updateCreateModal({show:false});
        }
        
        const handleSaveCreate = async (newItem) => {
          // console.log(`new ${newItem}`);
          // console.log(`ne################################################`);
          await api.createItem(newItem)
            getItems();
            updateCreateModal({show:false});
        }
    
        const createItemHandler = () => {
            console.log(`createItemHandler`);
            updateCreateModal({show:true});
        }
        
        function showCreateModal() {
            return (
                <CreateItem 
                show={true}
                handleClose = {handleCloseCreate} 
                handleSave={handleSaveCreate}
            ></CreateItem>  
            )
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
      // console.log("item=======================")
      // console.log(item)
      //console.log("clicked Edit on item with ID " + editableID);
      updateShowModal({show:true, item:item});
      //setTimeout(()=>{console.log(currentModal)}, 1000);
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
  //console.log(updatedList.itemList);

  const basicimage = "url(" + basicImg + ")";

    return (
      <div className="List"> 

          <div className="ListItem"
            style={{  
                backgroundImage: basicimage,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        > 
            <div onClick={createItemHandler}>   
            <div className="clickableArea">
                    <div className="itemwrapper">
                        <div className="ListHeroNickname" >{"add hero"}</div>
                        <div className="ListHeroNicknamebg" ></div>
                    </div>
                </div>
            </div>
        </div>



          {
              updatedList.itemList.map((item)=>(
                  <ListItem 
                      key={item._id} 
                      item={item} 
                      deleteItem={deleteItem} 
                      editItemHandler={editItemHandler} 
                      showItemHandler={showItemHandler}
                      doneItem={doneItem} 
                  ></ListItem>
              ))
              
          }
          
          <Pages
            onChange={onChangePage}
            active={updatedList.page}
            pages={getPagesCount()}
            maxButtons={3}
          />     
          {currentModalEdit.show?showEditModal():console.log()}
          {currentCreateModal.show?showCreateModal():console.log()}
          {currentShowModal.show?showShowModal():console.log()}
            
      </div>
    )
}

export default List;