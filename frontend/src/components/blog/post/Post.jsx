import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FullPost from './FullPost'
import PostSVG from '../../svg/tea.svg'

import './Post.css'

const Post = (props) => {
    const handleClick = () => {
        props.onDelete(props.id);
    }
    const body = props.body;
    return(
        <div className = "post">
            <div className = "image"> 
                <img src={PostSVG} alt=""/>
            </div> 
            <div className = "content">
                <h1>{props.title}</h1>
                <p>{body.substring(0, 160)}</p>
                {body.length<160 ? "" : <p className = "noselect" onClick = {()=>console.log("pew pew")}>read more  . . .</p>}
                <p>{props.date}</p>
                
            </div>
            <div className = "delete-button">
                {props.isLogged ? <DeleteForeverIcon onClick = {handleClick}/>:<div/>}
            </div>
            <FullPost
                title = {props.title}
                body = {props.body}
            />
        </div>
    )
}
export default Post;