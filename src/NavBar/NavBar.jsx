import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faXmark, faContactCard, faCopy, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import imgPro_white from '../assets/images/porfo_blanc.png';
import imgPro_dark from '../assets/images/proto_noir.jpg';
import CV from '../assets/download/CV.pdf';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const NaveBar = (props, { mailto }) => {

  const localTheme = localStorage.getItem('theme');

  const [checkboxTheme, setcheckboxTheme] = useState(false)

  const [themeChange, setThemeChange] = useState()
  const handleThemeChange = () => {
    if (localTheme === 'dark') {
      setThemeChange(true)
    } else {
      setThemeChange(false)
    }
    setHiddenInfoUser(false)
    setcheckboxTheme(!checkboxTheme)
  };


  const handlehiddenInfo = () => {
    setcheckboxTheme(false)
    setHiddenInfoUser(!hiddenInfoUser)
  };

  const [hiddenInfoUser, setHiddenInfoUser] = useState(false)

  const [copy, setCopy] = useState('')
  const handleCopy = (element) => {
    navigator.clipboard.writeText(element)
    setCopy(`${element}`)
    setTimeout(() => {setCopy('')}, 5000)
  };

  return (
    <>

      {checkboxTheme && <div className='blanket' style={{ zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 400, minHeight: 150 }} data-theme={props.localTheme}>
          <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
              <div className='buttonCircleRed' onClick={() => { setcheckboxTheme(false) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <h3>Changer le thème</h3>
            <div className="toggle-rect">
              <input type="checkbox" id="rect45365" name="check2" defaultChecked={themeChange} onChange={(e) => { props.handleTheme(e.target.checked) }} />
              <label htmlFor="rect45365"></label>
            </div>
          </div>
        </div>
      </div>}

      {hiddenInfoUser && <div className='blanket' style={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <div className='menu_navbar' style={{ width: '100%', flexDirection: 'column', maxWidth: 900, height: 'max-content' }} data-theme={props.localTheme}>
          <div className='submenu_navbar_title' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
              <div className='buttonCircleRed' onClick={() => { setHiddenInfoUser(false) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }} data-theme={props.localTheme}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>{props.user.firstname}</h2>
            <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
              <p translate='no'>Mon CV:&nbsp;</p>
              <Link to={CV} target="_blank" className='buttonCircleBlue' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Voir'>
                <FontAwesomeIcon icon={faEye} />
              </Link>
            </div>
            <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
              <p translate='no'>Téléphone: {props.user.telephone}&nbsp;</p>
              <div className='buttonCircleBlue' onClick={() => { handleCopy(props.user.telephone) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Copié'>
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </div>
            <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
              <p translate='no'>Email: {props.user.email}&nbsp;</p>
              <div onClick={() => window.location = `mailto:${props.user.email}`} className='buttonCircleRed' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='buttonCircleBlue' onClick={() => { handleCopy(props.user.email) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Copié'>
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </div>
            {copy !== '' &&<p><span>{copy}</span>&nbsp;a été Copié</p>}
          </div>
        </div>
      </div>}

      <div className='navbar' data-theme={props.localTheme}>
      {!props.localTheme && <img style={{ width: 140 }} src={imgPro_dark} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
        {props.localTheme === 'dark' && <img style={{ width: 140 }} src={imgPro_white} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
        {props.localTheme === 'default' && <img style={{ width: 140 }} src={imgPro_dark} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
        <div style={{ display: 'flex', width: 'max-content' }}>
          <div className='buttonCircle' onClick={handlehiddenInfo} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 5 }} data-theme={props.localTheme}>
            <FontAwesomeIcon icon={faContactCard} />
          </div>
          <div className='buttonCircle' onClick={handleThemeChange} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginRight: 5 }} data-theme={props.localTheme}>
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </div>
        </div>
      </div>
    </>
  )
}

export default NaveBar