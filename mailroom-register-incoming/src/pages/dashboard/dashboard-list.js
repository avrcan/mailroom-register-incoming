import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { API } from "../../utils/constants";
import { useContext } from "react";
import { UserInfo } from "../../components/login";

export function DashboardList() {
    const currenUserInfo = useContext(UserInfo);
    const [entryList, setProductList] = useState(null);
    const data = {worker: currenUserInfo.name};

    function updateEntryList() {
        fetch(`${API}/register`)
            .then((response) => response.json())
            .then((list) => setProductList(list))
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

        function handleClaim(id, e) {
        fetch(`${API}/register/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);

            })
            .then(() => {updateEntryList();
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
                            .filter(o => o !== "solved")
                             .map(attr =>
                      <th key={attr}>{attr.toUpperCase()}</th>)}
                      </tr>
                    </thead>
                    <tbody>

                    {entryList.filter(obj => obj.worker.length === 0 && obj.department === currenUserInfo.department).map(({id, registered,name, company, address, about, department, worker}) =>
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{registered}</td>
                      <td>{name}</td>
                      <td>{company}</td>
                      <td>{address}</td>
                      <td>{about}</td>
                      <td>{department}</td>
                      <td><button onClick={() => handleClaim(id)}>Claim</button></td>
                    </tr>
                    )}

                    </tbody>
                    </table>
                    </>
        </div>
    )

}
