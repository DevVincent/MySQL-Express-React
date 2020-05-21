import React,{useState} from 'react'
import './AdminBlog.css'
import AddPostSVG from '../svg/addpost.svg'

const Admin = (props) => {
    const [post, setPost] = useState({
        title:"",
        body: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost(prevPost => {
            return {
                ...prevPost,
                [name]:value
            };
        });
    }

    const submitPost = (event) => {
        props.onAdd(post);
        setPost({title:"",body:""});
        event.preventDefault();
    }

    return(     
        <div className = "addPost-form" >
            <div className = "content-form">
                <h1 id="form-heading">Add a new post</h1>
                <div className = "form-svg">
                    <img src={AddPostSVG} alt=""/>
                </div>
                <p id="form-para">Type title</p>
                <input 
                    id = "input-title-addPost" 
                    name = "title" 
                    value={post.title} 
                    onChange={handleChange}
                    placeholder="Post title"
                />
                <p id="form-para">Type body</p>
                <textarea 
                    id = "input-body-addPost" 
                    name = "body" 
                    value={post.body} 
                    onChange={handleChange}
                    placeholder="Post body"
                />
                <button id = "button-addPost" onClick={submitPost}>Add Post</button>
                <br/>
            </div>
        </div>
    )
}
export default Admin;