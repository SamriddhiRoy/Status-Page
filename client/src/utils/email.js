import emailjs from "emailjs-com";

export function sendEmail(to_email, subject, message) {
  emailjs.send(
    "service_a3ubtln", 
    "template_ef5rfrb", 
    {
      to_email,
      subject,
      message,
    },
    "X2AdJAfMlruyyGzgb" 
  )
  .then((response) => {
    console.log("✅ Email sent successfully", response.status, response.text);
  })
  .catch((error) => {
    console.error("❌ Error sending email", error);
  });
}
