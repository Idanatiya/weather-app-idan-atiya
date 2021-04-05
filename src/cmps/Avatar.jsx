

export default function Avatar({username,userImg,bcg = 'rgb(179 176 177)'}) {
    const name = username.split(' ').map(letter => letter.charAt(0)).join('').toUpperCase();
    const bgColor = userImg && username ? 'transparent' : bcg;
    return (
        <div className={`avatar ${userImg && username ? '' : 'rounded-white'}`} style={{backgroundColor: bgColor, borderRadius: '50%'}}>
           {userImg && username ? ( <img src={userImg} alt="avatar-preview"/> ) : ( <span>{name}</span>)}
        </div>
        
    )
}
