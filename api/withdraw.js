export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, withdrawCount, withdrawAmount, address } = req.body;

    // Direct Bot Token Integration
    const BOT_TOKEN = "8600671562:AAEwPvb6eQIkxNs6s5U_0C5jBOq7QgHFYhE";
    const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "@Allwithdrawhistory";

    const message = `<b>New Payout Request</b>\n\n` +
                    `<b>User:</b> ${username}\n` +
                    `<b>Withdraw Count:</b> ${withdrawCount}\n` +
                    `<b>Amount:</b> ${parseFloat(withdrawAmount).toFixed(2)} ALTA\n` +
                    `<b>TON Address:</b> <code>${address}</code>`;

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHANNEL_ID, text: message, parse_mode: 'HTML' })
        });

        const data = await telegramRes.json();
        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ error: data.description });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Failed to communicate with Telegram API' });
    }
}
