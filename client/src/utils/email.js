import emailjs from "emailjs-com";

export function sendEmail(to_email, subject, message) {
  emailjs.send(
    "service_a3ubtln", // ✅ Your EmailJS Service ID
    "template_ef5rfrb", // ❗ Replace with your EmailJS Template ID
    {
      to_email,
      subject,
      message,
    },
    "X2AdJAfMlruyyGzgb" // ✅ Your EmailJS Public Key
  )
  .then((response) => {
    console.log("✅ Email sent successfully", response.status, response.text);
  })
  .catch((error) => {
    console.error("❌ Error sending email", error);
  });
}
