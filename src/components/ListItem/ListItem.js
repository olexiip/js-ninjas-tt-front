
import basicImg from "../img/unknown.png";
import "./style.css"
const ListItem = (props) => {
    console.log(props)
    const imgpbg = () => {
        if (props.item.mainImg==="") {
            // console.log("false")
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
        props.editItemHandler( props.item)

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