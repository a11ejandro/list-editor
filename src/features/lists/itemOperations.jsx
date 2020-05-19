import { addItem, removeItem, addSublist,
  removeSublist, moveItemUp, moveItemDown } from './listSlice'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import PropTypes from 'prop-types'


const ItemAdd = ({addItem, parentId}) => {
  const [itemName, setItemName] = useState('')
  const onChange = e => setItemName(e.target.value)

  const submit = e => {
    e.preventDefault()
    addItem({name: itemName, parentId})
    setItemName('')
  }

  return (
    <ul>
      <li>
        <form onSubmit={submit}>
          <input value={itemName} onChange={onChange} />
          <button type="submit">Add Item</button>
        </form>
      </li>
    </ul>
  )
}

ItemAdd.propTypes = {
  addItem: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired
}

const ItemRemove = ({removeItem, itemId, parentId}) => (
  <button onClick={() => removeItem({itemId, parentId})}>Remove</button>
)

ItemRemove.propTypes = {
  removeItem: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired
}

const SublistAdd = ({addSublist, parentId}) => (
  <button onClick={() => addSublist({ parentId })}>AddSublist</button>
)

SublistAdd.propTypes = {
  addSublist: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired
}

const SublistRemove = ({removeSublist, parentId}) => (
  <button onClick={() => removeSublist({ parentId })}>Remove Sublist</button>
)

SublistRemove.propTypes = {
  removeSublist: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired
}

const Up = ({moveItemUp, itemId, parentId}) => (
  <button onClick={() => moveItemUp({ itemId, parentId })}>&uarr;</button>
)

Up.propTypes = {
  moveItemUp: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired
}

const Down = ({moveItemDown, itemId, parentId}) => (
  <button onClick={() => moveItemDown({ itemId, parentId })}>&darr;</button>
)

Down.propTypes = {
  moveItemDown: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired
}

export const MoveUp = connect(null, { moveItemUp })(Up)
export const MoveDown = connect(null, { moveItemDown })(Down)
export const AddSublist = connect(null, { addSublist })(SublistAdd)
export const RemoveSublist = connect(null, { removeSublist })(SublistRemove)
export const AddItem = connect(null, { addItem })(ItemAdd)
export const RemoveItem = connect(null, { removeItem })(ItemRemove)
