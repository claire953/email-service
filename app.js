const express = require("express");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const app = express();
app.use(express.json());

// Brevo setup
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Email service is running");
});

// SEND EMAIL ROUTE
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const response = await tranEmailApi.sendTransacEmail({
      sender: { email: "claire@hardynutritionals.com" },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
    });

    res.json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});