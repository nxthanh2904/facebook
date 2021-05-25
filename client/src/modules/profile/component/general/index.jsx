import React from 'react'
import Album from './Album'
import Friend from './Friend'
import Introduction from './Introduction'
import FlipMove from "react-flip-move"

function General() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <FlipMove style={{ width: "100%" }}>
                <Introduction />
                <Album />
                <Friend />
            </FlipMove>
        </div>
    )
}

export default General
