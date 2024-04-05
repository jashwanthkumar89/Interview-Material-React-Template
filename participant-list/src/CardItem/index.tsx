import React from 'react';

const CardItem = ({leftItem, rightItem, ...props}:any) => {
    return (
        <div {...props}>
            <div className='left'>
                {leftItem}
            </div>
            <div className='right'>
                {rightItem}
            </div>
        </div>
    )
}

export default CardItem;