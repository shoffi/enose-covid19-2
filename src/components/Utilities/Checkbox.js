import React from 'react'

export const CheckBox = props => {
    return (
        <div className="">
            <input key={props.id} onClick={props.handleCheckboxes} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </div>
    )
}

export default CheckBox