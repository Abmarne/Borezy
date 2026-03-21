// src/utils/sendEmail.js
import emailjs from 'emailjs-com';

// Generic email sending function
export const sendEmail = async ({ serviceId, templateId, params, publicKey }) => {
  const defaultServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_9lslyi2';
  const defaultPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '14_ths1xYdpFcvGAU';
  
  try {
    await emailjs.send(
      serviceId || defaultServiceId,
      templateId || 'template_2t7erac',
      params,
      publicKey || defaultPublicKey
    );
    
    return {
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error.text || 'Failed to send email',
      error
    };
  }
};

// Send branch creation notification
export const sendBranchNotification = async (ownerEmail, password, ownerName, startDate, endDate, amount) => {
  const templateParams = {
    to_email: ownerEmail,
    username: ownerEmail,
    password: password,
    ownerName: ownerName,
    startDate: startDate,
    endDate: endDate,
    amount: amount
  };

  return sendEmail({
    templateId: 'template_2t7erac',
    params: templateParams
  });
};

// Send welcome email
export const sendWelcomeEmail = async (userEmail, userName) => {
  return sendEmail({
    templateId: 'welcome_template',
    params: {
      to_email: userEmail,
      to_name: userName
    }
  });
};

// Send notification email
export const sendNotificationEmail = async (userEmail, subject, message) => {
  return sendEmail({
    templateId: 'notification_template',
    params: {
      to_email: userEmail,
      subject,
      message
    }
  });
};
