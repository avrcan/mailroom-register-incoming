import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {API} from "../../utils/constants";
import {useContext} from "react";
import {UserInfo} from "../../components/login";

export function AdminDashboard() {
    const currenUserInfo = useContext(UserInfo);
    const [entryList, setEntryList] = useState(null);
    const data = {
        solved: false,
        worker: ""
    };
    const data2 = {
        worker: "Admin"
    };

    function updateEntryList() {
        fetch(`${API}/register`)
            .then((response) => response.json())
            .then((list) => setEntryList(list))
    }

    useEffect(() => {
        updateEntryList();
    }, [])
    if (entryList === null) {
        return (
            <div>
                Loading dashboard...
            </div>
        )
    }

    function handleReset(id, e) {
        fetch(`${API}/register/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .then(() => {
                updateEntryList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleClaim(id, e) {
        fetch(`${API}/register/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data2),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(data2 => {
                console.log(data2);

            })
            .then(() => {
                updateEntryList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="table-div">
            <div className="dash-title-div"><h1>{currenUserInfo.department} Dashboard</h1></div>
            <>
                <table>
                    <thead>
                    <tr>
                        {Object.keys(entryList[0])
                          .map(attr =>
                            <th key={attr}>{attr.toUpperCase()}</th>)}
                    </tr>
                    </thead>
                    <tbody>

                    {entryList.map(({id, registered, name, company, address, about, department, worker, solved}) =>
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{registered}</td>
                            <td>{name}</td>
                            <td>{company}</td>
                            <td>{address}</td>
                            <td>{about}</td>
                            <td>{department}</td>
                            <td>{worker === "" && department === "Administrative" ?
                                <button onClick={() => handleClaim(id)}>Claim</button> : worker}</td>
                            <td>{solved ?
                                <button onClick={() => handleReset(id)}>Reset</button> : solved.toString()}</td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </>

        </div>
    )

}
