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
            <form >    
                <Modal.Header closeButton>
                    <Modal.Title>{"Hero info"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                    <div className="info-text">{"nickname:"} </div>
                    <div className="info-field">{props.item.nickname} </div>

                    <div className="info-text">{"realName:"} </div>
                    <div className="info-field">{props.item.realName} </div>

                    <div className="info-text">{"superpowers:"} </div>
                    <div className="info-field">{props.item.superpowers} </div>

                    <div className="info-text">{"originDescription:"} </div>
                    <div className="info-field">{props.item.originDescription} </div>

                    <div className="info-text">{"catchPhrase:"} </div>
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