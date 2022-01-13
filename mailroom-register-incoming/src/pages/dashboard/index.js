import React from 'react';
import { Route, Routes } from "react-router-dom";
import { DashboardList } from "./dashboard-list";



export function Dashboard() {
    return (
        <div style={{display: 'flex'}}>
            <Routes>
                <Route path={'/'} element={<DashboardList />} />
            </Routes>
        </div>
    )
}
