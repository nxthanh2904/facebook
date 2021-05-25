import React from 'react'
import { Link } from "react-router-dom";
import './general.css'
import { connect, useSelector } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

function Album() {

    const { posts } = useSelector(state => state.post)
    const { user, otherUser } = useSelector(state => state.auth)
    const checkTypeVideo = (post) => {
        if (typeof post === 'string' || post instanceof String) {
            let index = post.lastIndexOf(".");
            let typeFile = post.substring(index + 1, post.length).toLowerCase();
            if (typeFile === "mp4") {
                return true;
            }
            else return false;
        }
        else return false;
    }
    const listPost = posts.filter(post => !checkTypeVideo(post.images[0]) && post.creator._id === otherUser._id);

    let listImages = [];
    let allImages = [];
    listPost.forEach(post => {
        const images = post.images;
        if (listImages.length < 9) {
            if (post.images?.length != 0) {
                listImages = [...listImages, images];
            }
        }
        if (post.images?.length != 0) {
            let x = post.images?.map(e => { return { src: e, postId: post._id } });
            allImages = [...allImages, ...x];
        }
    })

    console.log('all img', allImages);
    return (
        <div className="box" style={{ height: "fit-content" }}>
            <div className="box-header with-border">
                <h3 className="box-title">Ảnh</h3>
                <Link to={`/albums/user/${otherUser._id}`} className="pull-right" style={{ color: "#1877F2", fontSize: "normal", cursor: "pointer" }}>Xem tất cả</Link>
            </div>
            <div className="box-body" >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {
                        listImages.length ?
                            listImages.map((image) =>
                                <div className="col-xs-4">
                                    <img src={`${process.env.REACT_APP_SERVER}${image}`} alt="" className="album" />
                                </div>
                            ) : <div>Chưa có ảnh</div>
                    }
                </div>
            </div>
        </div>


    )
}

const mapStateToProps = (state) => {
    return state
}


export default connect(null, null)(withTranslate(Album))
