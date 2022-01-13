import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { API } from "../utils/constants";
import { useContext } from "react";
import { UserInfo } from "../components/login";

export function MyList() {
    const currenUserInfo = useContext(UserInfo);

    const [myList, setMyList] = useState(null);
    const data = { solved: true };

    function updateEntryList() {
        fetch(`${API}/register`)
            .then((response) => response.json())
            .then((list) => setMyList(list))
    }

    useEffect(() => {
        updateEntryList();
    }, [])
    if (myList === null) {
        return (
            <div>
                Loading mys...
            </div>
        )
    }

    function handleSoldOut(id, e) {
        fetch(`${API}/register/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
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

    return (
        currenUserInfo.name === "Anonymous" ? '' :
        <div className="table-div">
            <div className="dash-title-div"><h1>My list</h1></div>
                {myList.filter(obj => obj.worker === currenUserInfo.name ).length === 0 ?
                <><p> Looks like you are up to date. Pick something from the dashboard </p></> :
                <>
                <table>
                <thead>
                  <tr>
                  {Object.keys(myList[0]).filter(o => o !== "worker").map(attr =>
                  <th key={attr}>{attr.toUpperCase()}</th>)}
                  </tr>
                </thead>
                <tbody>
                {myList.filter(obj => obj.worker === currenUserInfo.name)
                .filter(obj => obj.solved === false).map(({id, registered,  name, company, address, about, department, solved}) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{registered}</td>
                      <td>{name}</td>
                      <td>{company}</td>
                      <td>{address}</td>
                      <td>{about}</td>
                      <td>{department}</td>
                      <td>{solved}<button onClick={() => handleSoldOut(id)}>Solved</button></td>
                    </tr>))}
                    </tbody>
                    </table>
                    </>
                  }
        </div>
    )
}
