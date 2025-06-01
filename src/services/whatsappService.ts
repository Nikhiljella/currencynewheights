export const sendWhatsAppNotification = async (to: string, message: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, message })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
    return false;
  }
};

export const subscribeUser = async (phoneNumber: string, notificationThreshold: number): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, notificationThreshold })
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe user');
    }

    return true;
  } catch (error) {
    console.error('Failed to subscribe user:', error);
    return false;
  }
};

export const unsubscribeUser = async (phoneNumber: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber })
    });

    if (!response.ok) {
      throw new Error('Failed to unsubscribe user');
    }

    return true;
  } catch (error) {
    console.error('Failed to unsubscribe user:', error);
    return false;
  }
};