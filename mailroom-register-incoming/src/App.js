import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from "react";
import { anonymousUserInfo, Login, UserInfo } from "./components/login";
import { Menu } from "./components/menu";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Dashboard } from "./pages/dashboard";
import { AdminDashboard } from "./pages/admin/admin-dashboard";
import { AddEntry } from "./pages/admin/add-entry";

const userInfoStoreKey = 'userInfo';

let currentUser = anonymousUserInfo;
const storedUserInfoStr = sessionStorage.getItem(userInfoStoreKey);
if (storedUserInfoStr) {
    currentUser = JSON.parse(storedUserInfoStr)
}

function App() {
    const [userInfo, setUserInfo] = useState(currentUser)

    function handleLogin(newUser) {
        setUserInfo(newUser);
        sessionStorage.setItem(userInfoStoreKey, JSON.stringify(newUser))
    }

    function handleLogout() {
        setUserInfo(anonymousUserInfo);
        sessionStorage.setItem(userInfoStoreKey, JSON.stringify(anonymousUserInfo))
    }

    return (
        <div className="App">
            <UserInfo.Provider value={userInfo}>
                <BrowserRouter>
                    <div className={'header'}>
                        <Menu />
                        <Login onLogin={handleLogin} onLogout={handleLogout} />
                    </div>
                    <Routes>
                        <Route path={'/*'} element={<Home/>} />
                        <Route path={'/dashboard/*'} element={<Dashboard />} />
                        <Route path={'/admin/add-entry'} element={<AddEntry />} />
                        <Route path={'/admin/admin-dashboard'} element={<AdminDashboard />} />
                        <Route path={'*'} element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserInfo.Provider>
        </div>
    );
}

export default App;
