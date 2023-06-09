import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import ImgSlider from "../ImagesSlider/ImgSlider";
import useApi from "../../hooks/useApi.js";

const EditItem = (props) => {
  const api = useApi();
  console.log(props);
  const emptyItem = {
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
  };

  let newImage; 

  let images = [];
  if (props.item.mainImg) {
    //images.push(props.item.mainImg);
  }  
  images = [...images, ...props.item.images];

  
  const [newItem, setNewItem] = useState(props.item);
  const [selectedImage, setSelectedImage] = useState("");
 // const [mainImg, SetMainImg] = useState(props.item.mainImg);
  const onTypeHandler = (e) => {
    const itemTemp = {
      ...newItem,
      ...{
          nickname: e.target.form.nickname.value,
          realName: e.target.form.realName.value,
          originDescription: e.target.form.originDescription.value,
          superpowers: e.target.form.superpowers.value,
          catchPhrase: e.target.form.catchPhrase.value,
          }
      };

      console.log(itemTemp);
    setNewItem(itemTemp);
  };

  const onSaveImage = async (e) => {
    //console.log("save img to col")
    const setAsMain = document.getElementById("setAsMain").checked;
    console.log(setAsMain)
    e.preventDefault();
    try {
      newImage= await api.uploadImage({img:selectedImage});
      console.log(newImage.data._id)
    } catch (e) {
      console.log(e);
      return 0;
    }

    if (newImage.data._id) {
      if (setAsMain) {
        props.item.mainImg = newImage.data._id;
      } else {
        props.item.images.push(newImage.data._id);
      }
      try {
        //await api.update({id:props.item._id, editedItem:props.item})
      }catch(e){
        console.log(e);
      }
    } else {
    }
    return 0
    
  }
  
  const onSubmitkHandler = async (e) => {
    e.preventDefault();
    console.log("newItem--------------------");
    console.log(newItem);
    await api.update({
      id: props.item._id,
      editedItem: newItem,
    });
    setNewItem(emptyItem);
    props.handleClose();
  };
  const validation = (newItem) => {
    //
    return false;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 550,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteHandler = async (e) =>  {
    e.preventDefault();
    await api.delItem({
      id: props.item._id,
    });
    setNewItem(emptyItem);
    props.handleClose();
  };

  const onDeleteImageHandler = async (index) =>  {
    console.log(`onDeleteImageHandler ${index}`);
    images.splice(index,1);
    const itemTemp = {...newItem, images};
    setNewItem(itemTemp);
  }; 

  const onSetImageHandler = async (index) =>  {
    const itemTemp = {...newItem,mainImg:images[index]};
    console.log(itemTemp);
    setNewItem(itemTemp);
    console.log(`onSetImageHandler ${index}`);
 }; 

  const imgforprev = "url(" + selectedImage + ")";

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form >
          <Modal.Header closeButton>
            <Modal.Title>{"editItem"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <ImgSlider 
            item={newItem} 
              onSetImageHandler={onSetImageHandler}
              deleteHendler={onDeleteImageHandler}
            ></ImgSlider>

            <div className="inputsContainer">
            <input
              id="nickname"
              type="text"
              value={newItem.nickname}
              className="myInput"
              placeholder={"nickname"}
              onChange={onTypeHandler}
            />
            <input
              id="realName"
              type="text"
              value={newItem.realName}
              className="myInput"
              placeholder={"realName"}
              onChange={onTypeHandler}
            />
            <input
              id="originDescription"
              type="text"
              value={newItem.originDescription}
              className="myInput"
              placeholder={"originDescription"}
              onChange={onTypeHandler}
            />
            <input
              id="superpowers"
              type="text"
              value={newItem.superpowers}
              className="myInput"
              placeholder={"superpowers"}
              onChange={onTypeHandler}
            />
            <input
              id="catchPhrase"
              type="text"
              value={newItem.catchPhrase}
              className="myInput"
              placeholder={"catchPhrase"}
              onChange={onTypeHandler}
            />
            

            </div>
            <br/>

            <div className="inputsContainer">
              <input
                className="myInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
           
              <div
                className="ListItem"
                style={{
                  backgroundImage: imgforprev,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div>
                  <div className="itemwrapper">
                    <div className="itemwrapper">
                      <div className="ListHeroNickname">{newItem.nickname}</div>
                      <div className="ListHeroNicknamebg"></div>
                    </div>
                  </div>
                </div>
              </div>
                <br/>
                <button
                  className="login-button"
                  onClick={onSaveImage}
                  disabled={!selectedImage}
                >
                  {"upload img"}
                </button>
                <div className="checkboxWrapper">
                  <input type="checkbox" id="setAsMain" defaultChecked/>
                  <label className="mylabel" htmlFor="setAsMain">and set as main</label>
                </div>
       
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="mybtn"
              onClick={onDeleteHandler}
              disabled={validation()}
            >
              {"delete"}
            </button>
            <button className="mybtn" onClick={() => props.handleClose()}>
              {"close"}
            </button>
            <button className="mybtn" onClick={onSubmitkHandler}>
              {"save"}
            </button>

          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default EditItem;
