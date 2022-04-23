import React from "react";
import "./styles.css";

const userProfile = ({user}) => {
    //const {user} = props;
    //console.log(user);
    return (
        <div>
            <table>
                <tr>
                    <td colspan="1">
                        <img src={user?.profilePicture} width="100" height="100" /></td>
                    <td >
                        <div className="name">{user?.name}</div>
                    </td>
                </tr>
                <tr>
                    <td className="details-td">
                        <div className="label">Phone</div> : <div className="phone">{user?.phone}</div>
                        <br />
                        <div className="label">Address</div> : <div className="mobile">{user?.city}, {user?.country}</div>
                        <br />
                        <div className="label">Email</div> : <div className="email">{user?.emailID}</div>
                    </td>
                    <td className="description-td">
                        <img src="" onClick={() => { alert("test") }} className="edit" />
                        <input type="button" value="Update" className="update" />
                        <div className="description" spellcheck="false">{user?.about}</div>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default userProfile;