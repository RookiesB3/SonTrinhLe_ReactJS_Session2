import React, { useEffect, useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const URL = "https://jsonplaceholder.typicode.com/users/";

const Profile = ({ account }) => {
    const [userDetail, setUserDetail] = useState({
        name: "",
        id: ""
    });

    useEffect(() => {
        if (account.userId !== "") {
            axios
                .get(`${URL}${account.userId}`)
                .then((result) => {
                    setUserDetail({
                        name: result.data.name,
                        id: result.data.id
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [account]);

    return (
        <div className="d-flex justify-content-center" style={{ margin: "5em" }}>
            { userDetail.id !== "" ? (
                <div>
                    <h4>Profile</h4>
                    <p>Name: {userDetail.name}</p>
                    <p>UserId: {userDetail.id}</p>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <PacmanLoader color="#ffe5de" loading={true} size={50} />
                </div>
            )}
        </div>
    );
};

export default Profile;
