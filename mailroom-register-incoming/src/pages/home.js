import React from 'react';
import { Route, Routes } from "react-router-dom";
import { MyList } from "./my-list";



export function Home() {
    return (
        <div style={{display: 'flex'}}>
            <Routes>
                <Route path={'/'} element={<MyList />} />
            </Routes>
        </div>
    )
}
