import React, {useState, useEffect} from "react";
import useApi from "../../hooks/useApi.js";
import unknown from "../../img/unknown.png";
import preview from "../../img/loader.gif";

const ImgSlider = (props) => {  
   console.log(props)
  const api = useApi();

  let images = [];
  if (props.item.mainImg) {
    //images.push(props.item.mainImg);
  }  
  images = [...images, ...props.item.images];
  // console.log(images);
  const [currImage, updImg] = useState(unknown);
  const [prevImage, updPrevImg] = useState(unknown);
  const [nextImage, updNextImg] = useState(unknown);
  const [currCounter, setCounter] = useState(0);

  useEffect(() => {
    if (images.length===0) {
      } else {
        getImgPrev(images[prevIndex()]);
        getImg(images[currCounter]);
        getImgNext(images[nextIndex()]);
      }
    }, []);

  const prevIndex = (index=currCounter)=>{
    if (index==0) {
      if (images.length>0) {
         return images.length-1;
      }
        return 0
      }
      if (images.length>0) {
        return index-1;
      }
      return 0
  }

  const nextIndex = (index=currCounter)=>{
      if (images.length===0) {
        return 0;
      }
      if (index===(images.length-1)) {
         return 0;
      }
      return index+1;
  }

  const getImg = async (img) => {
    if (images.length>0) {
      try {
        const res = api.getImage({id: img});
        updImg(preview);
        res.then(update);
      }catch(e){
        console.log(e)
      }
    }
    
  }  

  const getImgPrev = async (img) => {
    if (images.length>0) {
      try {
        const res = api.getImage({id: img});
        updPrevImg(preview);
        res.then(updatePrev);

      }catch(e){
        console.log(e)
      }
    }
    
  }  

  const getImgNext = async (img) => {
    if (images.length>0) {
      try {
        const res = api.getImage({id: img});
        updNextImg(preview);
        res.then(updateNext);
      }catch(e){
        console.log(e)
      }
    }
    
  }  

  function update(data) {
    if (data?.data?.img) {
      updImg(data?.data?.img);
      updImg(prev=>prev);
    }
  }

  function updateNext(data) {
    if (data?.data?.img) {
      updNextImg(data?.data?.img);
      updNextImg(prev=>prev);
    }
  }

  function updatePrev(data) {
    if (data?.data?.img) {
      updPrevImg(data?.data?.img);
      updPrevImg(prev=>prev);
    }
  }

  const imgpbg = (img) => {
    let res;
    //console.log(currImage)
    if (currImage === "") {
      res = "url(" + unknown + ")";
      return res;
    }
    res = "url(" + currImage + ")";
    return res;
  };

  const imgpbgPrev = (img) => {
    let res;
    //console.log(currImage)
    if (currImage === "") {
      res = "url(" + unknown + ")";
      return res;
    }
    res = "url(" + prevImage + ")";
    return res;
  };

  const imgpbgNext = (img) => {
    let res;
    //console.log(currImage)
    if (currImage === "") {
      res = "url(" + unknown + ")";
      return res;
    }
    res = "url(" + nextImage + ")";
    return res;
  };

  const onClickLeft = () => {
    if(images.length>0) {
      let newconunter;
      if (currCounter===0) {
        newconunter = images.length-1;
      } else {
        newconunter = currCounter-1;
      }
      setCounter(newconunter);
      updImg(prevImage);
      updNextImg(currImage);
      getImgPrev(images[prevIndex(newconunter)]);
    }
    // console.log(currCounter);
  }

  const onClickRight = () => {
    if(images.length>0) {
      let newconunter;
      if (currCounter===images.length-1) {
        newconunter=0;
      } else {
        newconunter=currCounter+1;
      }
      setCounter(newconunter);
      updImg(nextImage);
      updPrevImg(currImage)
      getImgNext(images[nextIndex(newconunter)]);
    }
  }

  const onClickSet = () => {
    console.log("Set");
    props.onSetImageHandler(currCounter);
  }
  const onClickDel = () => {
    props.deleteHendler(currCounter);
    console.log("Del");
  }
if (props.hasOwnProperty("deleteHendler")) {
  return (  
    <div className="imgSlider">
      <div className="prevSlide" style={{ backgroundImage: imgpbgPrev() }}></div>
      <div className="currSlide" style={{ backgroundImage: imgpbg() }}>
        <div className="clickableArea">
          <div className="itemwrapper">
            <div className="ListHeroNickname">{props.item.nickname}</div>
            <div className="ListHeroNicknamebg"></div>
          </div>
        </div>
        <div className="SliderBtn SliderDel " onClick={onClickSet}>set as main</div>
        <div className="SliderBtn SliderSet" onClick={onClickDel}>delete</div>
      </div>      
      <div className="nextSlide" style={{ backgroundImage: imgpbgNext() }}></div>
      <div className="SliderArrow SliderL" onClick={()=>onClickLeft()}>{"prev"}</div>
      <div className="SliderArrow SliderR" onClick={()=>onClickRight()}>{"next"}</div>
    </div>
  )
}
return (    
  <div className="imgSlider">
    <div className="prevSlide" style={{ backgroundImage: imgpbgPrev() }}></div>
    <div className="currSlide" style={{ backgroundImage: imgpbg() }}>
      <div className="clickableArea">
        <div className="itemwrapper">
          <div className="ListHeroNickname">{props.item.nickname}</div>
          <div className="ListHeroNicknamebg"></div>
        </div>
      </div>
    </div>
    <div className="nextSlide" style={{ backgroundImage: imgpbgNext() }}></div>
    <div className="SliderArrow SliderL" onClick={()=>onClickLeft()}>{"prev"}</div>
  <div className="SliderArrow SliderR" onClick={()=>onClickRight()}>{"next"}</div>    
</div>
    )
}

export default ImgSlider;