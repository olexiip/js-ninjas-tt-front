import { useState } from "react";
import { Modal } from "react-bootstrap";

const CreateItem = (props) => {
  const emptyItem = {
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
  };
  const [newItem, setNewItem] = useState(emptyItem);
  const onTypeHandler = (e) => {
    setNewItem({
      nickname: e.target.form.nickname.value,
      realName: e.target.form.realName.value,
      originDescription: e.target.form.originDescription.value,
      superpowers: e.target.form.superpowers.value,
      catchPhrase: e.target.form.catchPhrase.value,
    });
  };
  const onSubmitkHandler = (e) => {
    e.preventDefault();
    props.handleSave(newItem);
    setNewItem(emptyItem);
  };

  const validation = () => {
    return false;
  };

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
          </Modal.Body>
          <Modal.Footer>
            <button 
              className="mybtn" 
              onClick={() => props.handleClose()}>
              {"close"}
            </button>
            <button 
              disabled={validation()}
              className="mybtn"
              >{"save"}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CreateItem;
