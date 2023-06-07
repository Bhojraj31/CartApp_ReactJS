import React from 'react'


const Container = (props) => {
    let classes;
    if (props.fluid)
        classes = "container-fluid";
    else
        classes = "container";
  return (
    <div className={classes}>
          <div className='row'>
              {props.children}
        </div>
    </div>
  )
}
export default Container;