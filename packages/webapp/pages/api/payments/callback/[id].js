const getJsonResError = (status, message) => ({
  meta: {
    status_code: status,
    detail: {
      global_error_messages: [message],
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json(getJsonResError(405, `متد ${req.method} مجاز نیست.`));
    return;
  }

  const { id } = req.query;

  if (!id)
    res.status(400).json(getJsonResError(400, `آیدی تراکنش ارسال نشده است`));

  res.redirect(302, `/payment/${id}/redirect?data=${JSON.stringify(req.body)}`);
}
