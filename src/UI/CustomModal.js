import React from 'react'
import Dialog from '@mui/material/Dialog';
import Button from "./Button"
import ButtonGroup from './ButtonGroup'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
    <Dialog open={show} onClose={handleClose}>
        <DialogContent>
          <DialogContentText style={{fontWeight : "bold" , color : "black"}} >
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons}
        </DialogActions>
      </Dialog>
  )
}
export default CustomModal