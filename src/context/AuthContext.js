import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const userData = JSON.parse(saved);
      setUser(userData);
      setIsLoggedIn(true);
      setIsGuest(userData.role === 'guest');
    }
  }, []);

  const ADMIN_EMAIL = 'fa24-bse-002@students.cuisahiwal.edu.pk';
  const ADMIN_PASSWORD = 'waleed#777';

  // Guest Login
  const guestLogin = () => {
    const guestData = {
      name: 'Guest User',
      email: 'guest@shopapp.com',
      role: 'guest',
    };
    setUser(guestData);
    setIsLoggedIn(true);
    setIsGuest(true);
    localStorage.setItem('user', JSON.stringify(guestData));
    return 'guest';
  };

  const login = (email, password) => {
    // Admin Check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = {
        name: 'Admin',
        email: email,
        role: 'admin',
      };
      setUser(userData);
      setIsLoggedIn(true);
      setIsGuest(false);
      localStorage.setItem('user', JSON.stringify(userData));
      alert('🔐 Admin Login successful!');
      return 'admin';
    }

    // User Check
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        name: foundUser.name || 'User',
        email: foundUser.email,
        role: 'user',
      };
      setUser(userData);
      setIsLoggedIn(true);
      setIsGuest(false);
      localStorage.setItem('user', JSON.stringify(userData));
      alert('✅ Login successful!');
      return 'user';
    } else {
      alert('❌ Invalid email or password! Please register first.');
      return null;
    }
  };

  const register = (name, email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = registeredUsers.find(u => u.email === email);

    if (existingUser) {
      alert('❌ User already exists! Please login.');
      return false;
    }

    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    alert('✅ Registration successful! Please login.');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsGuest(false);
    localStorage.removeItem('user');
    alert('Logout successful!');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isGuest, 
      login, 
      register, 
      logout, 
      guestLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}