import { useDispatch,useSelector } from 'react-redux';
import { toggleTemp } from './../store/actions/prefAction';
import { setToast } from './../store/actions/toastAction';
function ToggleTempBtn() {
    const {isToggled} = useSelector(state => state.prefReducer)
    const dispatch = useDispatch();
    const toggleTemperature = () => {
        dispatch(toggleTemp())
        dispatch(setToast({msg: `Temperatures is now displaying in ${isToggled ? 'fahrenheit' : 'celius'}`, type: 'success'}))
    }

    return (
        <label className="switch-container" htmlFor="myToggle">
            <input className={`toggle-input ${isToggled ? 'toggled': ''}`} type="checkbox" id="myToggle" onChange={toggleTemperature} />
            <div className="toggle-fill"></div>
        </label>
    )
}

export default ToggleTempBtn
