import React, { useState, ChangeEvent } from 'react';

const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const sendOtp = async () => {
    if (!phone) {
      setMessage('Please enter your phone number.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage(`OTP sent! For demo, OTP is: ${data.otp}`);
      } else {
        setMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('Error sending OTP.');
    }
  };

  const register = async () => {
    if (!name || !email || !phone || !password || !otp) {
      setMessage('Please fill all fields including OTP.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Token: ' + data.token);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Error during registration.');
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <div className="signup-form">
      <h2>Create Account</h2>
      <label htmlFor="name">Enter Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleChange(setName)}
      />
      <label htmlFor="email">Enter Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <label htmlFor="phone">Enter Phone</label>
      <input
        id="phone"
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={handleChange(setPhone)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      {otpSent && (
        <>
          <label htmlFor="otp">Enter OTP</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange(setOtp)}
          />
        </>
      )}
      <label htmlFor="password">Enter Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <button onClick={register}>Sign Up</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupForm;
