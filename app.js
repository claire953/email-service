import express from "express";

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { email } = req.body;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: {
        name: "Claire S",
        email: "claire@hardynutritionals.com"
      },
      to: [{ email }],
      subject: "Test Email",
      htmlContent: "<p>This is a test from your Render service</p>"
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running");
});