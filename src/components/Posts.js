import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Link,
} from 'react-router-dom';
import PacmanLoader from "react-spinners/ClipLoader";

const URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [initialPosts, setInitialPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get(URL).then(result => {
            setPosts(result.data);
            setInitialPosts(result.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }, []);


    const handleRemove = (post) => {
        const filterPost = posts.filter(p => p.id !== post.id);
        setPosts(filterPost);
        setInitialPosts(filterPost);
    }

    const handleInput = (e) => {
        setSearch(e.target.value);
        if (search !== "") {
            const filterPost = initialPosts.filter(p => p.title.includes(e.target.value));
            setPosts(filterPost);
        }
    }

    const handlePaste = (e) => {
        setSearch(e.clipboardData.getData('Text'));
            if (search !== "") {
                const filterPost = initialPosts.filter(p => p.title.includes(e.target.value));
                setPosts(filterPost);
        }
    }

    const handleChange = (e) => {
        if(e.target.value === "asc"){
            setPosts([...posts.sort((item1, item2) => {
                if (item1.title < item2.title) return -1;
                if (item1.title > item2.title) return 1;
                return 0;
            } )])
        }
        if(e.target.value === "des"){
            setPosts([...posts.sort((item1, item2) => {
                if (item1.title > item2.title) return -1;
                if (item1.title < item2.title) return 1;
                return 0;
            })])
        }
        if(e.target.value === "none"){
            setPosts([...initialPosts]);
        }
    }

    return (
        <div>
            {!isLoading &&
                <div>
                    <div>
                        <input
                            name="search"
                            value={search}
                            style={{ margin: "1em", borderRadius: "5px" }}
                            placeholder="Search by title"
                            onInput={handleInput}
                            onPaste={handlePaste} />
                    </div>
                    <div>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">
                                        <span>Title</span>
                                        <span>
                                            <select className="col-1" name="gender" onChange={handleChange}>
                                                <option value="none">NONE</option>
                                                <option value="asc">ASC</option>
                                                <option value="des">DES</option>
                                            </select>
                                        </span>
                                    </th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post =>
                                    <tr>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.title}</td>
                                        <td>
                                            <span style={{ marginRight: "2em" }}>
                                                <Link to={`posts/${post.id}`}>View detail</Link>
                                            </span>
                                            <span>
                                                <button className="btn  btn-danger"
                                                    onClick={() => handleRemove(post)}>Remove</button>
                                            </span>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>}
            {isLoading &&
                <div>
                    <PacmanLoader color="#ffe5de" loading={isLoading} size={50} />
                </div>}
        </div>
    )
}

export default Posts;