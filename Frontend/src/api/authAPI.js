import api from './config';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.patch('/auth/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// const mockUsers = [
//   {
//     id: "1",
//     name: "Admin User",
//     email: "admin@healthpulse.com",
//     password: "admin123",
//     role: "admin",
//     region: null,
//   },
//   {
//     id: "2",
//     name: "Healthcare Provider",
//     email: "provider@region1.health",
//     password: "provider123",
//     role: "provider",
//     region: "Region-1",
//   },
// ];

// export const mockLogin = (credentials) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = mockUsers.find(
//         (u) =>
//           u.email === credentials.email && u.password === credentials.password
//       );

//       if (user) {
//         resolve({
//           user: {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             region: user.region,
//           },
//           role: user.role,
//         });
//       } else {
//         reject(new Error("Invalid credentials"));
//       }
//     }, 1000);
//   });
// };

// export const mockSignup = (userData) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (mockUsers.some((u) => u.email === userData.email)) {
//         reject(new Error("Email already exists"));
//         return;
//       }

//       const newUser = {
//         id: String(mockUsers.length + 1),
//         ...userData,
//         role: "provider",
//         region: `Region-${mockUsers.length + 1}`,
//       };

//       mockUsers.push(newUser);
//       resolve({ success: true });
//     }, 1000);
//   });
// };
