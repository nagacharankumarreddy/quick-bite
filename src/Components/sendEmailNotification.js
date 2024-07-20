import emailjs from "emailjs-com";
import { serviceID, userID, templateID } from "../Utils/constants";

const sendEmailNotification = async (
  toEmail,
  username,
  // items,
  totalPrice,
  address,
  timestamp
) => {
  try {
    const templateParams = {
      to_email: toEmail,
      username,
      // items,  will implement later
      totalPrice: totalPrice.toFixed(2),
      address: address || "N/A",
      timestamp: new Date(timestamp).toLocaleString(),
    };

    const result = await emailjs.send(
      serviceID,
      templateID,
      templateParams,
      userID
    );

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmailNotification;
