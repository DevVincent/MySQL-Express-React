import React,{useState, useEffect} from 'react'
import AdminBlog from '../admin/AdminBlog'
import Post from './post/Post'

import './Blog.css'

const Blog = (props) => {
    const [posts, setPosts] = useState([]);
    const PORT = 4000;
    useEffect(() => {
        // Create an scoped async function in the hook
        const anyNameFunction = () => {
            window.onerror = function(msg, url, linenumber) {
                alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
                return true;
              }
        }
        //async function anyNameFunction() {
        //  await loadPosts();
        //}
        // Execute the created function directly
        anyNameFunction();
    }, []);

    const loadPosts = () => {
        fetch(`http://localhost:${PORT}/posts`)
        .then(response => response.json())
        .then(({data}) => {
            console.log(data)
            setPosts(data);
        })
        .catch(err => console.error(err))        
    }
    const sendMessage = () => {
        fetch(`http://localhost:${PORT}/posts`)  
    }
    const setPost = (data) => {
        Object.entries(data);
        setPosts(data);       
    }
    const addPost = (newPost) => {
        fetch(`http://localhost:${PORT}/posts/add?title=${newPost.title}&body=${newPost.body}`)
        .then(loadPosts())
        .catch(err => console.error(err))
        //setPosts(prevPosts => {
        //    return [...prevPosts, newPost];
        //});
    }

    const deletePost = (id) => {
        fetch(`http://localhost:${PORT}/posts/delete?ID=${id}`)
        .then(loadPosts())
        .catch(err => console.error(err));
        //setPosts(prevPosts => 
        //    return prevPosts.filter((post, index)=> {
        //        return index !== id;
        //    });
        //});
    }

    return(
        <div className = "blog" id="Blog">
            <div className = "blog-heading">
                <h1>See my latest posts</h1>
            </div>          
                <div className = "spacer"></div>
                <div className = "container">
                    <div className = "posts">
                    {posts.map((post, index) => {
                        return(
                            <Post
                                key = {index}
                                id = {post.postID}
                                title = {post.title}
                                img = {post.img}
                                body = {post.body}
                                date = {post.date}
                                isLogged = {props.logged}
                                onDelete = {deletePost}
                            />
                        );
                    })}       
                    </div>
                </div>
            <div className = "admin-blog">
                {props.logged ? <AdminBlog allPosts = {posts} onAdd = {addPost}/> : <div/>  }
            </div>
            <button onClick={sendMessage}>Send message</button>
        </div>
        
    )
}
export default Blog;