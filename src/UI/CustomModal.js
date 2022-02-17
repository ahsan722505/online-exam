import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { useSelector,useDispatch } from 'react-redux'
import { uiActions } from '../store/ui-slice'
import Button from "./Button"
// import Button from '@restart/ui/esm/Button'
// import 'bootstrap/dist/css/bootstrap.css';

const CustomModal = () => {
    const {show,content}=useSelector(state=>state.ui.modal);
    const dispatch=useDispatch();
    const handleClose=()=> dispatch(uiActions.setModal({show : false , content : ""}))
  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header  closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button style={{width : "3rem"}} onClick={handleClose}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
export default CustomModal