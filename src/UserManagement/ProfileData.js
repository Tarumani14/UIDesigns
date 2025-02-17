import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from './userProfileService';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const emailId = 'Jayaseelan@triveniturbines.com'; // Replace with actual emailId
    const userId = '5'; // Replace with actual userId

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await fetchProfile(emailId);
                setProfileData(Array.isArray(data) ? data : [data]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [emailId, userId]);

    const handleEditUser = (userId) => {
        navigate(`/edituser/${userId}`);
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h3 style={{textAlign:'center',width:"100%",top:0}}>User Profile Inofrmation </h3>
            {profileData.length > 0 ? (
                profileData.map((profile, index) => (
                    <div key={index}>
                        <h4>Profile {index + 1}</h4>
                        <p>User ID: {profile.userId}</p>
                        <p>Employee ID: {profile.employeeId}</p>
                        <p>Employee Name: {profile.employeeName}</p>
                        <p>Email: {profile.emailId}</p>
                        <p>Contact Number: {profile.contactNumber}</p>
                        <button className="btn btn-success" onClick={() => handleEditUser(profile.userId)}>Edit User</button>
                        {/* Render other profile data as needed */}
                    </div>
                ))
            ) : (
                <p>No profiles found.</p>
            )}
        </div>
    );
};

export default ProfilePage;
