import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

const URL = "https://jsonplaceholder.typicode.com/posts/";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        id: -1,
        title: "",
        body: "",
        userId: -1
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${URL}${id}`)
            .then((result) => {
                setPost({ ...result.data });
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div>
            {!isLoading ? (
                <div style={{ textAlaign: "center", margin: "5em" }}>
                    <p>ID: {post.id}</p>
                    <p>Title: {post.title}</p>
                    <p>Body: {post.body}</p>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <PacmanLoader color="#ffe5de" loading={isLoading} size={50} />
                </div>
            )}
        </div>
    );
};

export default PostDetail;
