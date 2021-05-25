import React, { useState, useEffect } from 'react';

import { DialogModal, UploadFile } from "../../../common-components";
import ReactEmoji from 'react-emoji';
const listFeeling = [
    {
        id: 1,
        code: ':)',
        name: "Vờ lờ"
    },
    {
        id: 2,
        code: ':D',
        name: "Vui vẻ"
    },
    {
        id: 3,
        code: '<3',
        name: "Có tính yêu"
    },
    {
        id: 4,
        code: ':(',
        name: "Buồn"
    },
    {
        id: 5,
        code: 'O:-)',
        name: "Phê"
    },
    {
        id: 6,
        code: ':P',
        name: "Ngớ ngẩn"
    },
    {
        id: 7,
        code: ':/',
        name: "Hụt hẫng"
    },
    {
        id: 8,
        code: ':-O',
        name: "Ồ ngạc nhiên vl"
    },
    {
        id: 9,
        code: ':*',
        name: "Sướng"
    },
    {
        id: 10,
        code: ':poop:',
        name: "như shit"
    },
]

const Feeling = (props) => {

    const onChangeFeeling = (value) => {
        console.log('emojiiiiiiiiiii', value);
        props.onChangeFeeling(value)
    }

    return (
        <DialogModal
            modalID="modal-create-post-feeling"
            formID="form-create-post-feeling"
            title= "Feeling"
            hasNote={false}

        >
            <div style= {{display: "flex", flexWrap:"wrap",}}>
                 {
                    listFeeling.map(emoji => (
                        <div className={'col-md-6'} onClick={()=>onChangeFeeling(emoji)}  style= {{display: "flex"}}  id = {emoji.id}>
                            <div>{ReactEmoji.emojify(emoji.code)}</div>
                            <div style= {{ marginLeft:"10px"}}>{emoji.name}</div>
                        </div>
                    ))
            }
           </div>

        </DialogModal>
        )
    
}

export default Feeling;