export default {
  API_ENDPOINT: `https://puppylove-api.herokuapp.com`,
  API_KEY: process.env.REACT_APP_API_KEY,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    chatService: process.env.TWILIO_CHAT_SERVICE_SID
  },
}