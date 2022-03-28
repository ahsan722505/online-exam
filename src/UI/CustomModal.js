import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "./Button"
import ButtonGroup from './ButtonGroup'
const CustomModal = ({show,content,handleClose,proceedHandler}) => {
  const buttons= proceedHandler ? <ButtonGroup>
    <Button style={{width : "5rem"}} onClick={()=>{proceedHandler(); handleClose()}}>
  yes
</Button>
<Button style={{width : "5rem"}} onClick={handleClose}>
  no
</Button>
  </ButtonGroup> : <Button style={{width : "5rem"}} onClick={handleClose}>
  ok
</Button> ;

  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header  closeButton>
        </Modal.Header>
        <Modal.Body style={{fontWeight : "bold"}}>{content}</Modal.Body>
        <Modal.Footer>
          {buttons}
        </Modal.Footer>
      </Modal>
  )
}
export default CustomModal