import React from 'react'

const ConfirmationModal = ({handleClick}) => {
  return (
    <div id="confirm-modal" className="modal fade" >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete?&hellip;</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleClick}>Confirm</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ConfirmationModal