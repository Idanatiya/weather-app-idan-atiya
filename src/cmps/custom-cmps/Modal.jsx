import {useEffect} from 'react';
import {createPortal } from 'react-dom';
import logo from '../../assets/imgs/hero.png';

const elModalContainer = document.querySelector('#app-modal')
function Modal({showModal,hide}) {
    console.log('show modal?:',showModal);
    console.log('hide modal?:',hide);
    useEffect(() => {
        function handleKeyDown(ev) {
            if(ev.keyCode === 27) hide()
        }
        if(showModal) document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown',handleKeyDown)
        }
    },[showModal])

    return showModal ? createPortal(
        <section onClick={hide} className="overlay">
        <section className="modal-container flex column align-center" onClick={ev => ev.stopPropagation()}>
            <img className="modal-img" src={logo} alt="modal-log" />
            <p>The Modal is very cool am i right? </p>
            <span className="close-btn" onClick={hide}><i className="far fa-times-circle"></i></span>
            <a href="https://github.com/Idanatiya"  target="_blank" className="modal-btn"><i className="fab fa-github-alt fa-lg"></i> Check my github</a>
            <span>My name is idan</span>
        </section>
      </section>
    ,elModalContainer) : null
}

export default Modal;
