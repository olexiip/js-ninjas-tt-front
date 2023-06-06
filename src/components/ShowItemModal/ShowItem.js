import {Modal} from "react-bootstrap";
import basicImg from "../img/unknown.png";

const ShowItem = (props) => {

    const imgpbg = () => {
        if (props.item.mainImg==="") {
            const res = "url(" + basicImg + ")"
            return res;
        }
        const res = "url(" + props.item.mainImg + ")"
        return res;
    }    

return (
    <div>
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form className="myModal">    
                <Modal.Header closeButton>
                    <Modal.Title>{"Hero info"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="imageHolder">
                    <div className="ListItem"
                        style={{  
                            backgroundImage: imgpbg(),
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    > 
                        <div>   
                        <div className="clickableArea">
                                <div className="itemwrapper">
                                    <div className="ListHeroNickname" >{props.item.nickname}</div>
                                    <div className="ListHeroNicknamebg" ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="info-text name">{"real name :"} </div>
                    <div className="info-field">{props.item.realName} </div>

                    <div className="info-text powers">{"super powers :"} </div>
                    <div className="info-field">{props.item.superpowers} </div>

                    <div className="info-text origin">{"origin :"} </div>
                    <div className="info-field">{props.item.originDescription} </div>

                    <div className="info-text phrase">{"catch phrase :"} </div>
                    <div className="info-field">{props.item.catchPhrase} </div>

                    <div>{props.item.images} </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="mybtn"
                        onClick={()=>(props.handleClose())}
                    >{"close"}</button>


                </Modal.Footer>
            </form>  
        </Modal>
    </div>
    )}

export default ShowItem