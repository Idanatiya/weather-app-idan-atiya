
import React,{useEffect} from 'react'
import notFoundLogo from '../assets/imgs/modal-logo.jpg';
import { useDispatch } from 'react-redux';
import { setToast } from './../store/actions/toastAction';
import { Link } from 'react-router-dom';


function NoMatch() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setToast({msg: 'Page is not exists.', type: 'error'}))
    },[])

    return (
        <section className="no-match">
            <figure>
                <img src={notFoundLogo} alt="page-not-found" />
            </figure>
            <Link to="/"> Go To Dashboard!!</Link>
        </section>
    )
}

export default NoMatch
