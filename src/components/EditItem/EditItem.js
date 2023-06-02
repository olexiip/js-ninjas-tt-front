import React from "react";
import { useState } from "react"
import {Modal} from "react-bootstrap";
import imageCompression from 'browser-image-compression';

const EditItem = (props) => {
console.log("EditItem ------------");
console.log(props);
const emptyItem={
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: ""
}
const [newItem, setNewItem] = useState(props.item); 
const [selectedImage, setSelectedImage] = useState(props.item.mainImg);
const onTypeHandler = (e) => {
    // console.log(e);
    console.log(e.target.form.nickname.value);
    console.log(e.target.form.realName.value);
    console.log(e.target.form.originDescription.value);
    console.log(e.target.form.superpowers.value);
    console.log(e.target.form.catchPhrase.value);
    // emptyItem.nickname = e.target.value;
    setNewItem({
        nickname : e.target.form.nickname.value,
        realName : e.target.form.realName.value,
        originDescription : e.target.form.originDescription.value,
        superpowers : e.target.form.superpowers.value,
        catchPhrase : e.target.form.catchPhrase.value,
    })
    console.log(newItem);
}

const onSubmitkHandler = (e) => {
    e.preventDefault();
    if (selectedImage) {
        newItem.mainImg = selectedImage;
    }
    props.handleSave(props.item._id, newItem);
    setNewItem(emptyItem);
}
const validation = (newItem) => {
    //
    return false;    
}

const handleImageChange = async (event) => {
    const file = event.target.files[0];
    
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 300,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(file, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); 
        console.log(`compressedFile size ${compressedFile.size / 500 / 500} MB`); 
        

        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64Image = reader.result;
          setSelectedImage(base64Image);
        };
      
        reader.readAsDataURL(compressedFile);
        console.log(selectedImage)

      } catch (error) {
        console.log(error);
      }

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
            <form onSubmit={onSubmitkHandler}>   
                <Modal.Header closeButton>
                    <Modal.Title>{"editItem"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input 
                        id="nickname"
                        type="text" 
                        value={newItem.nickname} 
                        className="inputNewItem" 
                        placeholder={"nickname"} 
                        onChange={onTypeHandler}
                    />          
                    <input 
                        id="realName"
                        type="text" 
                        value={newItem.realName} 
                        className="inputNewItem" 
                        placeholder={"realName"} 
                        onChange={onTypeHandler}
                    />     
                    <input 
                        id="originDescription"
                        type="text" 
                        value={newItem.originDescription} 
                        className="inputNewItem" 
                        placeholder={"originDescription"} 
                        onChange={onTypeHandler}
                    />     
                    <input 
                        id="superpowers"
                        type="text" 
                        value={newItem.superpowers} 
                        className="inputNewItem" 
                        placeholder={"superpowers"} 
                        onChange={onTypeHandler}
                    />     
                    <input 
                        id="catchPhrase"
                        type="text" 
                        value={newItem.catchPhrase} 
                        className="inputNewItem" 
                        placeholder={"catchPhrase"} 
                        onChange={onTypeHandler}
                    />     

                <div className="imageUploader">
                    <input className="myinput" type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="ListItem" 

                    style={{  
                        backgroundImage: imgforprev,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                > 
                    <div>   
                        <div className="itemwrapper">
                            <div className="itemwrapper">
                                <div className="ListHeroNickname" >{newItem.nickname}</div>
                                <div className="ListHeroNicknamebg" ></div>
                            </div>
                        </div>
                    </div>
                </div>



                </Modal.Body>
                <Modal.Footer>
                    <button className="mybtn"
                        disabled={validation()} 
                    >{"delete"}</button>
                    <button className="mybtn"
                        onClick={()=>(props.handleClose())}
                    >{"close"}</button>
                    <button className="mybtn"
                        disabled={validation()} 
                    >{"save"}</button>
                </Modal.Footer>
            </form>  
    </Modal>
</div>
)}

export default EditItem