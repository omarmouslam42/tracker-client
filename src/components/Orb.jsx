import React, { useEffect, useState } from 'react'

export default function Orb() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])
    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])
    // console.log(size);
    const ele = document.getElementsByClassName('.orb')
    const style = document.createElement("style")
    style.innerHTML = `
     @keyframes body {
    0%{
      transform:translate(0,0);
    }
    50%{
      transform: translate(${size[0]}px,${size[1] / 1.3}px)
    }
    100%{
      transform: translate(0,0);
    }
  }`
    document.head.appendChild(style)
    //   ele.style.animation="body  alternate linear infinite "
    return (
        <div className='orb' >

        </div>
    )
}
