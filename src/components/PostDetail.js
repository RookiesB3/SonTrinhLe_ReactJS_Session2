import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

const URL="https://jsonplaceholder.typicode.com/posts/";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        id: -1,
        title: "",
        body: "",
        userId: -1
    });
    
    useEffect(() => {
        axios.get(`${URL}${id}`).then(result => {
            setPost({...result.data});
        }).catch(err => {
            console.log(err);
        })
    }, [id])

    return (
        <div>
            <p>
                ID: {post.id}
            </p>
            <p>
                Title: {post.title}
            </p>
            <p>
                Body: {post.body}
            </p>
        </div>
    )
}

export default PostDetail;