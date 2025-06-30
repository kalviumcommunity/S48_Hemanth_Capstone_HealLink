import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '' });
  const [mode, setMode] = useState('view');
  const [form, setForm] = useState({});
  const [msg, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUser(data);
        } else {
          setMessage("Failed to load user info");
        }
      })
      .catch(() => setMessage("Server error"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/edit', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    });
    const data = await res.json();
    setMessage(data.msg);
    if (res.ok) {
      setMode('view');
      setUser(prev => ({ ...prev, username: form.username }));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/change-password', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(data.msg);
    if (res.ok) setMode('view');
  };

  return (
    <div className="profile-container">
      <h2>View Profile</h2>
      {msg && <p className="msg">{msg}</p>}

      {mode === 'view' && (
        <>
          <label>Username</label>
          <input value={user.username} disabled />
          <label>Email</label>
          <input value={user.email} disabled />

          <div className="buttons">
            <button onClick={() => setMode('edit')}>Edit Profile</button>
            <button onClick={() => setMode('password')}>Change Password</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}

      {mode === 'edit' && (
        <form onSubmit={handleEdit}>
          <label>New Username</label>
          <input name="username" onChange={handleChange} required />
          <label>Enter Password</label>
          <input name="password" type="password" onChange={handleChange} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setMode('view')}>Cancel</button>
        </form>
      )}

      {mode === 'password' && (
        <form onSubmit={handleChangePassword}>
          <label>Current Password</label>
          <input name="currentPassword" type="password" onChange={handleChange} required />
          <label>New Password</label>
          <input name="newPassword" type="password" onChange={handleChange} required />
          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" onChange={handleChange} required />
          <button type="submit">Change Password</button>
          <button type="button" onClick={() => setMode('view')}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
