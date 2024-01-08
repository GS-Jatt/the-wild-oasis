
import CreateCabinForm from "./CreateCabinForm"

import {Modal} from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";


const StyledAddCabin = styled.div`
    margin: 2rem ;
    float: right;
`


export default function AddCabin(){
    return(
        <StyledAddCabin>

        <Modal>
            <Modal.Open open={'cabin-form'}>
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name={'cabin-form'}>
                <CreateCabinForm type='modal'/>
            </Modal.Window>
        </Modal>
        </StyledAddCabin>
    );
}







// export default function AddCabin(){
//     const [showModal, setShowModal] = useState(false)


//     return(<>
//     <button onClick={()=>setShowModal((showModal)=>!showModal)}>shown from</button>
//     {showModal && <Modal closeModal={()=>setShowModal((showModal)=>!showModal)}>
//         <CreateCabinForm type='modal' closeModal={()=>setShowModal((showModal)=>!showModal)} />
//             </Modal>}
//     </>
//     );
// }