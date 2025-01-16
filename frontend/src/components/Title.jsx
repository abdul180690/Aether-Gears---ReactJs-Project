import React from 'react'

const Title = ({title1, title2, titleStyles, title1Styles, paraStyles }) => {
  return (
    <div className={`${titleStyles} pb-10`}>
        <h2 className={`${title1Styles} h2`}>
            {title1}
            <span className='text-seocndary !font-light underline'>{title2}</span>
        </h2>
        <p className={`${paraStyles} hidden`}>
            Discover the best deals on the top-quality products, crafted <br /> to elevate your everyday experience.
        </p>
    </div>
  )
}

export default Title;