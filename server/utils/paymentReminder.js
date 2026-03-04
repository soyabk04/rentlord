const { Paymentmodel } = require("../Models/Payment.model")
const { sendmail } = require("../utils/sendmail")

async function paymentReminder() {

  const today = new Date()

  const payments = await Paymentmodel
    .find({ status: "pending" })
    .populate("tenant")

  for (const payment of payments) {

    if (!payment.tenant?.email) continue

    const email = payment.tenant.email.split(',')[0]
    // console.log(payment.dueamount)
    const diffDays = Math.floor(
      (payment.dueDate - today) / (1000 * 60 * 60 * 24)
    )

    if (diffDays === 3) {
      await sendmail(
        email,
        `Your rent of ₹${payment.dueamount} is due in 3 days`
      )
    }

    if (diffDays === 0) {
      await sendmail(
        email,
        `Your rent of ₹${payment.dueamount} is due today`
      )
    }

    if (diffDays < 0) {
      await sendmail(
        email,
        `Your rent of ₹${payment.dueamount} is overdue`
      )
    }
  }
}

module.exports = paymentReminder