import React from 'react';
import image1 from './static/home1.jpg';
import setting from '../constant';

const Home = (props) => {
    return (
        <div style={{ margin: "5em" }}>
            <div>
                <span>
                    <img src={image1}
                        className="img-fluid img-thumbnail"
                        alt="Responsive image"
                        width={setting.img1Size.width}
                        height={setting.img1Size.height} />
                </span>
                <span style={{ marginLeft: "10px" }}>
                    Some random text display!!!
                </span>
            </div>
        </div>
    )
}

export default Home;