import React, { useEffect, useState } from 'react';
import { useUserContext, SET_NOTIFICATIONS, UPDATE_UNREAD_COUNT } from '../UserContext';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import "./NotifciationListUser.css";

const NotificationListUser = () => {
  const { state, dispatch } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  // Access notifications from the UserContext state
  const notifications = state.notifications;

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/user/markasread/${notificationId}`, {
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
      const response = await fetch(`/api/notifications/user/delete/${notificationId}`, {
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
      <div className="container">
        <h2 className="text-center mt-4 mb-4">Notifications</h2>
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
        ) : reversedNotifications.length === 0 ? ( // Check if there are no notifications
          <p className="text-center">No Notifications</p>
        ) : (
          <ul className="list-group">
            {reversedNotifications.map((notification) => (
              <li key={notification._id} className="list-group-item">
                <div className="notification-content">
                  <p>
                    {notification.entityType === 'property' ? (
                      <Link to={`/usernotificationproperty/${notification.entityId}`}>
                        {notification.message} {notification.sender.name}
                      </Link>
                    ) : notification.entityType === 'vehicle' ? (
                      <Link to={`/usernotificationvehicle/${notification.entityId}`}>
                        {notification.message} {notification.sender.name}
                      </Link>
                    ) : (
                      notification.message
                    )}
                  </p>
                  <small className="text-muted">
                    {formatDistanceToNow(new Date(notification.timestamp))} ago
                  </small>
                  <div className="notification-buttons">
                    {!notification.isRead && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => markAsRead(notification._id)}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteNotification(notification._id)}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationListUser;
