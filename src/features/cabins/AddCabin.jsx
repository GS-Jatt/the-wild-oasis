
import CreateCabinForm from "./CreateCabinForm"

import {Modal} from "../../ui/Modal";
import Button from "../../ui/Button";



export default function AddCabin(){
    return(
        <Modal>
            <Modal.Open open={'cabin-form'}>
                <Button>shown from</Button>
            </Modal.Open>
            <Modal.Window name={'cabin-form'}>
                <CreateCabinForm type='modal'/>
            </Modal.Window>
        </Modal>
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