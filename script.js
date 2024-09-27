// Set the start time when the page loads
document.addEventListener("DOMContentLoaded", function () {
  window.applicationStartTime = Math.floor(Date.now() / 1000);
});

document
  .getElementById("applicationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Send data to your server endpoint
    fetch("/submit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Application-Start-Time": window.applicationStartTime.toString(),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert(
            "Thank you for your application! We will review it and get back to you soon."
          );
          // Optionally, reset the form here
          document.getElementById("applicationForm").reset();
        } else {
          alert(
            "There was an error submitting your application. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error submitting your application. Please try again."
        );
      });
  });
