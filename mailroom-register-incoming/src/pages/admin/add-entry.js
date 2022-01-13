import { UserInfo } from "../../components/login";
import { React, useContext, useState, useEffect } from "react";
import { useForm } from "../../utils/use-form";
import { API } from "../../utils/constants";

export function AddEntry() {
    const currenUserInfo = useContext(UserInfo);
    const current = new Date()
    const currDate = `${current.getFullYear()}-${("0" + current.getMonth() + 1).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;
    const [formValues, formProps] = useForm({
        registered: currDate,
        name: '',
        company: '',
        address: '',
        about: '',
        department: '',
        worker: '',
        solved: false
    })
    const [message, setMessage] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        setMessage(null)
        fetch(`${API}/register`, {
                method: 'post',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(formValues)
            })
            .then(() => setMessage('Entry registered'))
            .catch(() => setMessage('Entry could not be registered'))

    }

    if (!currenUserInfo.isAdmin) {
        return (
            <div>
                You don't have access to admin dashboard
            </div>
        )
    }

    return (
        <div className="add-form">
            <form className={'AddEntryForm'} onSubmit={handleSubmit}>
                <h3>{currDate} </h3>
                <label>Name<input type="text" {...formProps.name} /></label>
                <label>Company<input type="text" {...formProps.company} /></label>
                <label>Address<input type="text" {...formProps.address} /></label>
                <label>About<input type="text" {...formProps.about} /></label>
                <label>Department
                    <select {...formProps.department} >
                        <option value=''></option>
                        <option value='Administrative'>Administrative</option>
                        <option value='Human Resources'>Human Resources</option>
                        <option value='Accounting'>Accounting</option>
                    </select>
                </label>
                <div>
                    <button variant="contained" type={'submit'}>Register entry</button>
                </div>
                {message && (<div>{message}</div>)}
            </form>
        </div>
    )
}
