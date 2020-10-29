import React from 'react'

export const CheckBox = props => {
    return (
        <div className="">
            <input 
                key={props.id} 
                onClick={props.handleCheckboxes} 
                type="checkbox" 
                checked={props.isChecked} 
                value={props.value}
                style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "10px",
                    marginBottom: "20px"
                }} 
            /> {props.value}
        </div>
    )
}

export default CheckBox