import basicImg from "../../img/unknown.png";
import previmage from "../../img/loader.gif";
import useApi from "../../hooks/useApi.js";
import { useState, useEffect } from "react";

const ListItem = (props) => {
  console.log(props)
  const api = useApi();

  const [currImage, updImg] = useState(previmage);

  useEffect(() => {
    if (props.item.mainImg === "") {
    } else {
      const res = api.getImage({id: props.item.mainImg});
      res.then(update);
    }
    }, []);

  function update(data) {
    if (data.data.img) {
      updImg(data.data.img);
    }
  }

  const imgpbg = () => {
    let res;
    //console.log(currImage)
    if (props.item.mainImg === "") {
      res = "url(" + basicImg + ")";
      return res;
    }
    res = "url(" + currImage + ")";
    return res;
  };

  const clickhandler = () => {
    props?.showItemHandler(props.item);
  };

  const editHandler = () => {
    props.editItemHandler(props.item);
  };

  if (props.hasOwnProperty("editItemHandler")) {
    return (
      <div className="ListItem" style={{ backgroundImage: imgpbg() }}>
        <div className="itemContainer">
          <div className="editbtn" onClick={editHandler}>
            edit
          </div>
          <div onClick={clickhandler}>
            <div className="clickableArea">
              <div className="itemwrapper">
                <div className="ListHeroNickname">{props.item.nickname}</div>
                <div className="ListHeroNicknamebg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ListItem" style={{ backgroundImage: imgpbg() }}>
      <div onClick={clickhandler}>
        <div className="clickableArea">
          <div className="itemwrapper">
            <div className="ListHeroNickname">{props.item.nickname}</div>
            <div className="ListHeroNicknamebg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
