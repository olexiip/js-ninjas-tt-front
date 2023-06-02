import basicImg from "../img/unknown.png";

const ListItem = (props) => {
    const imgpbg = () => {
        if (props.item.mainImg==="") {
            const res = "url(" + basicImg + ")"
            return res;
        }
        const res = "url(" + props.item.mainImg + ")"
        return res;
    }
    
    const clickhandler = () => {
        props?.showItemHandler(props.item);
    }

    const editHandler = () => {
        props.editItemHandler(props.item)

    }

    if (props.hasOwnProperty("editItemHandler")) {
        return (
            <div className="ListItem"
                style={{  
                    backgroundImage: imgpbg(),
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            > 
                
                <div className="itemContainer">
                    <div className="editbtn" onClick={editHandler}>edit</div>
                        <div onClick={clickhandler}>   
                            <div className="clickableArea">
                                 <div className="itemwrapper">
                                    <div className="ListHeroNickname" >{props.item.nickname}</div>
                                    <div className="ListHeroNicknamebg" ></div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    
        )
    }

    return (
        <div className="ListItem"
            style={{  
                backgroundImage: imgpbg(),
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        > 
            <div onClick={clickhandler}>   
            <div className="clickableArea">
                    <div className="itemwrapper">
                        <div className="ListHeroNickname" >{props.item.nickname}</div>
                        <div className="ListHeroNicknamebg" ></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ListItem;