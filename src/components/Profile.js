import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PacmanLoader from "react-spinners/ClipLoader";

const URL = "https://jsonplaceholder.typicode.com/users/";

const Profile = ({ account }) => {

    const [userDetail, setUserDetail] = useState({
        name: "",
        id: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (account.userId !== "") {
            setIsLoading(true)
            axios.get(`${URL}${account.userId}`).then(result => {
                setUserDetail({
                    name: result.data.name,
                    id: result.data.id
                })
            })
            setIsLoading(false);
        }
    }, [account])

    return (
        <div>
            {
                !isLoading ? (
                    <div>
                        <h4>Profile</h4>
                        <p>Name: {userDetail.name}</p>
                        <p>UserId: {userDetail.id}</p>
                    </div>
                ) : (
                    <div>
                        <PacmanLoader color="#ffe5de" loading={isLoading} size={50} />
                    </div>
                )
            }
        </div>
    )
}

export default Profile;