import React from 'react';
import Header from '../../header/Header';
import Form from '../../posts/form/Form';
import Posts from '../../posts/Posts';
import Background from './background';
import General from './general';

const Profile = () => {
    return (
        <>
        <div style={{ backgroundColor: "#F0F2F5" }}>
            <Header />
            <Background />
            <div className="container">
                <div className="row">
                    <div className="col-md-5" style={{ marginTop: "10px" }}>
                        <General />
                    </div>
                    <div className="col-md-7 right-post">
                        <Form />
                        <Posts />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;