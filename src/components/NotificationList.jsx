import React, { useEffect, useState } from 'react';
import { useUserContext, SET_NOTIFICATIONS, UPDATE_UNREAD_COUNT } from '../UserContext';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import './NotificationList.css';


const NotificationList = () => {
  const { state, dispatch } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const notifications = state.notifications;

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/admin/markasread/${notificationId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      if (response.ok) {
        // If the marking as read is successful, update the notification in the context
        const updatedNotifications = notifications.map((notification) => {
          if (notification._id === notificationId) {
            return { ...notification, isRead: true };
          }
          return notification;
        });

        // Dispatch an action to update the context
        dispatch({ type: SET_NOTIFICATIONS, payload: updatedNotifications });

        // Update the unread count
        const newUnreadCount = updatedNotifications.filter((notification) => !notification.isRead).length;
        dispatch({ type: UPDATE_UNREAD_COUNT, payload: newUnreadCount });
      } else {
        console.error('Error marking notification as read:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/admin/delete/${notificationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      if (response.ok) {
        // If deletion is successful, remove the notification from the context
        const updatedNotifications = notifications.filter((notification) => notification._id !== notificationId);

        // Dispatch an action to update the context
        dispatch({ type: SET_NOTIFICATIONS, payload: updatedNotifications });

        // Update the unread count
        const newUnreadCount = updatedNotifications.filter((notification) => !notification.isRead).length;
        dispatch({ type: UPDATE_UNREAD_COUNT, payload: newUnreadCount });
      } else {
        console.error('Error deleting notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') {
      return true;
    }
    return filter === 'read' ? notification.isRead : !notification.isRead;
  });

  // Reverse the filteredNotifications array to show the latest notifications first
  const reversedNotifications = [...filteredNotifications].reverse();

  return (
    <div className="main mt-4">
      <h2 className="text-center mb-4">Notifications</h2>
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn btn-success ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-success ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
        <button
          className={`btn btn-success ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="list-group">
          {Array.isArray(reversedNotifications) &&
            reversedNotifications.map((notification) => (
              <li key={notification._id} className="list-group-item notification-item">
                <div className="d-flex align-items-center">
                  <img
                    src={notification.sender.picture}
                    alt={notification.sender.name}
                    className="rounded-circle notification-image"
                    width="50"
                    height="50"
                  />
                  <div className="notification-content">
                    <p className="mb-1">
                      {notification.entityType === 'property' ? (
                        <Link to={`/adminnotificationsdetails/${notification.entityId}`}>
                          {notification.message} {notification.sender.name}
                        </Link>
                      ) : notification.entityType === 'vehicle' ? (
                        <Link to={`/adminnotificationsdetailsvehicle/${notification.entityId}`}>
                          {notification.message} {notification.sender.name}
                        </Link>
                      ) : (
                        notification.message
                      )}
                    </p>
                   
                  </div>
                </div>
                <div className="notification-actions">
                  {!notification.isRead && (
                    <button
                      className="btn btn-primary btn-sm mark-as-read-button"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm delete-button"
                    onClick={() => deleteNotification(notification._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
                <small className="text-muted">
                      {formatDistanceToNow(new Date(notification.timestamp))} ago
                    </small>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
