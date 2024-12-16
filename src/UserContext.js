import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

// Define the initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
  error: null,
  notifications: [],
  unreadCount: 0, // Add unreadCount to the initial state
};

// Define action types
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT'; // Add a new action type

// Modify the userReducer to handle notifications and unread count
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload, unreadCount: calculateUnreadCount(action.payload) };
    case UPDATE_UNREAD_COUNT: // Handle the action to update unread count
      return { ...state, unreadCount: action.payload };
    default:
      return state;
  }
};

const calculateUnreadCount = (notifications) => {
  return notifications.filter(notification => !notification.isRead).length;
};

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    setIsLoading(true);

    try {
      // Check if state and state.user exist
      if (state && state.user && state.user.token) {
        const url = state.user.isAdmin
          ? `/api/notifications/admin`
          : `/api/notifications/user`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        if (response.ok) {
          const notifications = await response.json();
          dispatch({ type: SET_NOTIFICATIONS, payload: notifications });
        }
      }
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: 'Failed to fetch notifications' });
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    // Clear user data and set notifications and unreadCount to initial values
    dispatch({ type: SET_USER, payload: null });
    dispatch({ type: SET_NOTIFICATIONS, payload: [] }); // Clear notifications
    dispatch({ type: UPDATE_UNREAD_COUNT, payload: 0 }); // Reset unreadCount
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, [state.user]); // Only fetch when the user object changes

  useEffect(() => {
    // Check local storage for user data during initialization
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // Set the user data only if it exists
    if (storedUserData) {
      dispatch({ type: SET_USER, payload: storedUserData });
    }
  }, []);

  // Function to update the unread count based on notifications
  const updateUnreadCount = () => {
    const newUnreadCount = calculateUnreadCount(state.notifications);
    dispatch({ type: UPDATE_UNREAD_COUNT, payload: newUnreadCount });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, isLoading, updateUnreadCount }}>
      {children}
    </UserContext.Provider>
  );
};
