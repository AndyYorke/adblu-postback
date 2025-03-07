const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Ambil data dari AdbluMedia
    const payload = req.body;

    // Konfigurasi Telegram
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    // Format pesan
    const message = `🔔 **POSTBACK DITERIMA** 🔔
      Campaign: ${payload.campaign_id}
      Status: ${payload.status}
      Payout: $${payload.payout}`;

    // Kirim ke Telegram
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message
      }
    );

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Gagal mengirim');
  }
};
