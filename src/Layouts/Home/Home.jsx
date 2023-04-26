import './Home.scss';
import React, { useState, useEffect, ReactPDF } from "react";
import { spinner } from '../../utils';
import { Data_Realisation, Data_Realisation_Personnel, Experience } from '../../data/Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CV from '../../assets/download/CV.pdf';
import { faCopy, faEnvelope, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

const Home = (props) => {


    const [fullScreen, setFullScreen] = useState(false)
    const [fullScreenData, setFullScreenData] = useState('')

    const [fullScreenPerso, setFullScreenPerso] = useState(false)
    const [fullScreenDataPerso, setFullScreenDataPerso] = useState('')

    const [hidden, setHidden] = useState(false)

    const handleClick = () => {
        setHidden(true)
        setTimeout(() => { setHidden(false) }, 1000)
    }

    const [copy, setCopy] = useState('')
    const handleCopy = (element) => {
        navigator.clipboard.writeText(element)
        setCopy(`${element}`)
        setTimeout(() => { setCopy('') }, 5000)
    };


    const [fullScreenImg, setFullScreenImg] = useState('')

    if (!Data_Realisation || !props.user) return (
        <>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ paddingTop: 50 }} data-theme={props.localTheme}>
                    {spinner()}
                </div>
            </div>
        </>
    )

    return (
        <>
            {fullScreenImg && <div className='blanket' onClick={() => { setFullScreenImg('') }} style={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }} >
                <div className='container_img_fullScreen'>
                    <img onClick={() => { setFullScreenImg('') }} style={{ width: '100%', maxWidth: 1500, borderRadius: 15, objectFit: 'contain' }} src={fullScreenImg} alt="" />
                </div>
            </div>}

            <div className='CoverImage FlexEmbed FlexEmbed--2by1' data-theme={props.localTheme}>

                <ul className={!hidden ? "circles" : "circles active"} data-theme={props.localTheme}>
                    <li onClick={handleClick} style={{ background: 'orange' }} translate='no'>HTML</li>
                    <li onClick={handleClick} style={{ background: '#00b7ff' }} translate='no'>CSS</li>
                    <li onClick={handleClick} style={{ background: '#ffee00' }} translate='no'>JS</li>
                    <li onClick={handleClick} style={{ background: 'pink' }} translate='no'>SASS</li>
                    <li onClick={handleClick} style={{ background: 'green' }} translate='no'>NODE</li>
                    <li onClick={handleClick} style={{ background: 'cyan' }} translate='no'>REACT</li>
                    <li onClick={handleClick} style={{ background: 'linear-gradient(50deg, black, white)' }} translate='no'>GIT</li>
                    <li onClick={handleClick} style={{ background: 'linear-gradient(50deg, #009625, #805700)' }} translate='no'>Mongo</li>
                    <li onClick={handleClick} style={{ background: '#008cff' }} translate='no'>Sequelize</li>
                    <li onClick={handleClick} style={{ background: 'linear-gradient(50deg, cyan, orange)' }} translate='no'>MySQL</li>
                </ul>

            </div>

            <div className='container_Name' data-theme={props.localTheme}>
                {props.user.image !== null && <img className='img_user' src={props.user.image} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                <div className='content_Name' data-theme={props.localTheme}>
                    <h1 style={{ textAlign: 'center' }}>{props.user.job}</h1>
                    <h2 style={{ textAlign: 'center' }}>{props.user.lastname}&nbsp;{props.user.firstname}</h2>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={props.localTheme}>
                    <h2 id='Qui_suis_je' className='underline' data-theme={props.localTheme}>Qui suis-je ?</h2>
                    <div className='container_card' data-theme={props.localTheme}>
                        {props.user.image !== null && <img className='img_user' style={{ width: 150, height: 150 }} src={props.user.image} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />}
                        <p style={{ textAlign: 'center', width: '100%', maxWidth: 900 }} translate='no'>
                            {props.user.presentation}
                        </p>
                    </div>
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={props.localTheme}>
                    <h2 className='underline' data-theme={props.localTheme}>Réalisations</h2>
                    {!fullScreen && <div className='container_card' data-theme={props.localTheme}>
                        {Data_Realisation?.map((data) => (
                            <img onClick={() => {
                                setFullScreen(true)
                                setFullScreenData(data)
                            }} className='animation' style={{ width: '100%', maxWidth: 300, cursor: 'pointer', margin: 10, objectFit: 'contain', height: 'max-content', borderRadius: 15 }} src={data.image} alt={data.title} key={data.title} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        ))}
                    </div>}
                    {fullScreen && <div className='scrollbar animation' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: 500, overflowX: 'auto' }} data-theme={props.localTheme}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                            <div onClick={() => { setFullScreen(false) }} className='buttonCircleRed' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                        <h3>{fullScreenData.title}</h3>
                        <img onClick={() => { setFullScreenImg(fullScreenData.image) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in' }} src={fullScreenData.image} alt="" />
                        <p translate='no' style={{ width: '100%', maxWidth: 600 }}>{fullScreenData.data}</p>
                        {fullScreenData.image1 && <img onClick={() => { setFullScreenImg(fullScreenData.image1) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in', marginBottom: 20 }} src={fullScreenData.image1} alt="" />}
                        {fullScreenData.image2 && <img onClick={() => { setFullScreenImg(fullScreenData.image2) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in', marginBottom: 20 }} src={fullScreenData.image2} alt="" />}
                        {fullScreenData.image3 && <img onClick={() => { setFullScreenImg(fullScreenData.image2) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in' }} src={fullScreenData.image3} alt="" />}
                    </div>}
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={props.localTheme}>
                    <h2 className='underline' data-theme={props.localTheme}>Réalisations personnelles</h2>
                    {!fullScreenPerso && <div className='container_card' data-theme={props.localTheme}>
                        {Data_Realisation_Personnel?.map((data) => (
                            <img onClick={() => {
                                setFullScreenPerso(true)
                                setFullScreenDataPerso(data)
                            }} className='animation' style={{ width: '100%', maxWidth: 300, cursor: 'zoom-in', margin: 10, objectFit: 'contain', borderRadius: 15 }} src={data.image} alt={data.title} key={data.title} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        ))}
                    </div>}
                    {fullScreenPerso && <div className='scrollbar animation' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: 500, overflowX: 'auto' }} data-theme={props.localTheme}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                            <div onClick={() => { setFullScreenPerso(false) }} className='buttonCircleRed' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                        <h3 translate='no'>{fullScreenDataPerso.title}</h3>
                        <img onClick={() => { setFullScreenImg(fullScreenDataPerso.image) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', cursor: 'zoom-out', height: 'max-content' }} src={fullScreenDataPerso.image} alt="" />
                        <p translate='no' style={{ width: '100%', maxWidth: 600 }}>{fullScreenDataPerso.data}</p>
                        {fullScreenDataPerso.image1 && <img onClick={() => { setFullScreenImg(fullScreenDataPerso.image1) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in', marginBottom: 20 }} src={fullScreenDataPerso.image1} alt="" />}
                        {fullScreenDataPerso.image2 && <img onClick={() => { setFullScreenImg(fullScreenDataPerso.image2) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in', marginBottom: 20 }} src={fullScreenDataPerso.image2} alt="" />}
                        {fullScreenDataPerso.image3 && <img onClick={() => { setFullScreenImg(fullScreenDataPerso.image3) }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 500, borderRadius: 15, objectFit: 'contain', height: 'max-content', cursor: 'zoom-in' }} src={fullScreenDataPerso.image3} alt="" />}
                    </div>}
                </div>
            </div>

            <div className='cter_sect'>
                <div className='ctent_arti' data-theme={props.localTheme}>
                    <h2 className='underline' data-theme={props.localTheme}>Compétences</h2>
                    <div className='container_card' data-theme={props.localTheme}>
                        {Experience?.map((data) => (
                            <div className='container_competence' key={data.title} data-theme={props.localTheme}>
                                <h4 translate='no'>{data.title}</h4>
                                <img src={data.image} style={{ width: '100%', maxWidth: 80, marginBottom: 15 }} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                                <div className="progress">
                                    <div className="progressBar" style={{ width: `${data.progressBar}%` }} data-theme={props.localTheme}></div>
                                </div>
                                <h4>{data.progressBar}%</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className='cter_sect'>
                <div className='ctent_arti' style={{ borderRadius: 0, maxWidth: '100%' }} data-theme={props.localTheme}>
                    <h2 className='underline' data-theme={props.localTheme}>Contact</h2>
                    <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
                        <p translate='no'>Mon CV:&nbsp;</p>
                        <Link to={CV} target="_blank" className='buttonCircleBlue' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Voir'>
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </div>
                    <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
                        <p translate='no'>Téléphone: {props.user.telephone}</p>
                        <div className='buttonCircleBlue' onClick={() => { handleCopy(props.user.telephone) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Copié'>
                            <FontAwesomeIcon icon={faCopy} />
                        </div>
                    </div>
                    <div className='contact' style={{ display: 'flex', alignItems: 'center' }} data-theme={props.localTheme}>
                        <p translate='no'>Email: {props.user.email}</p>
                        <div onClick={() => window.location = `mailto:${props.user.email}`} className='buttonCircleRed' style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div className='buttonCircleBlue' onClick={() => { handleCopy(props.user.email) }} style={{ width: 30, height: 30, fontSize: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }} title='Copié'>
                            <FontAwesomeIcon icon={faCopy} />
                        </div>
                    </div>
                    {copy !== '' && <p><span>{copy}</span>&nbsp;a été Copié</p>}
                </div>
            </div>

        </>
    )
}

export default Home