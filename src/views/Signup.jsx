import React, {useState} from 'react';
import doge from '../assets/imgs/icondoge.png';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {signup, login} from '../store/actions/userAction';
import {uploadImg} from './../services/img-upload.service';
import {setToast} from './../store/actions/toastAction';

const initialState = {
  username: '',
  skills: [],
  skill: '',
  userImg: '',
};
function Signup () {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const {errMsg} = useSelector(state => state.userReducer)
  const [user, setUser] = useState (initialState);
  const [isSignup, setIsSignup] = useState (true);
  const [isLoading, setIsLoading] = useState (false);
  const modalLink = isSignup
    ? 'Already have an account? Sign in!'
    : 'You dont have an account? Sign up!';
  const btnTxt = isSignup ? 'Signup' : 'Login';


  const handleSubmit = ev => {
    ev.preventDefault ();
      if(isSignup) {
        const {username, skills, userImg} = user;
        const userToAdd = {username, userImg, skills};
        dispatch (signup (userToAdd));
      } else {
        dispatch(login(user.username))
      }
      history.push('/')
      dispatch(setToast({msg: `Welcome, ${user.username}`, type: 'success'})) 
    
  };
  

  const handleKeyDown = ev => {
    let {skills, skill} = user;
    if (skill && ev.code === 'Enter') {
      if (skills.includes (skill.toLowerCase ())) {
        dispatch (setToast ({msg: `${skill} is already exists in skills`,type: 'error'}));
        return;
      }
      skills.unshift (skill);
      setUser ({...user, skills, skill: ''});
      ev.preventDefault ();
    }
  };

  const handleChange = ev => {
    const {name, value} = ev.target;
    setUser ({
      ...user,
      [name]: value,
    });
  };

  const onUploadImg = async ev => {
    setIsLoading (true);
    const res = await uploadImg (ev);
    setUser ({...user, userImg: res.url});
    setIsLoading (false);
    dispatch (setToast ({msg: 'Image has been uploaded!', type: 'success'}));
  };

  const CustomUploadBtn = () => (
    <label className="custom-upload-btn">
      <span className="user-circle-icon">
        <i className="far fa-user-circle" />
      </span>
      <input type="file" onChange={onUploadImg} name="userImg" />
    </label>
  );

  return (
    <section className="signup-container">
      <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>{btnTxt} Form</h1>
        {isLoading && <div>Loading...</div>}
        {user.userImg && !isLoading
          ? <img className="img-preview" src={user.userImg} alt="" />
          : <CustomUploadBtn />}
        <div className="floating-label">
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>

        {isSignup &&
          <div className="floating-label">
            <input
              type="text"
              placeholder="Enter A Skill"
              name="skill"
              value={user.skill}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <label>Skills</label>
            {user.skills &&
              user.skills.map ((skill, idx) => (
                <div className="pill" key={idx}>{skill}</div>
              ))}
          </div>}
        <div className="btn-wrapper">
          <button className="submit-btn" disabled={!user.username}>
            <span className="button-text">{btnTxt}</span>
            <span className="button-icon">
              <img className="doge-logo" src={doge} />
            </span>
          </button>
        </div>
        <span className="toggle-form-mode" onClick={() => setIsSignup(!isSignup)}>{modalLink}</span>
      </form>

      </div>
      <div className="img-div">
        <h2 className="img-title">DogeWeather - React Hooks & Redux</h2>
        <img
          className="app-preview"
          src="https://api.pikwy.com/web/6063ca5995840022fe710aa3.jpg"
          alt=""
        />
        <div className="features-container">
        <h3 className="features-title">Features</h3>
          <span>Autocomplete search, Weekly forecast, Favorites, Temperature toggle, Custom themes, Dark Mode/Light Mode. <br /></span>
          <span>Login/Signup to check this up!</span>
          <p>Check The Code on GIT</p>
          <a className="github-btn" href="https://github.com/Idanatiya/weather-app-idan-atiya"><i className="fab fa-github"></i> GITHUB</a>
        </div>
      </div>
    </section>
  );
}

export default Signup;
