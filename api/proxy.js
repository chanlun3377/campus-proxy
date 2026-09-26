export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 把前端传来的参数原样转发给完美校园
    const params = new URLSearchParams(req.body).toString();
    
    const response = await fetch('https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://xqh5.17wanxiao.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 2211133C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36'
      },
      body: params
    });

    const data = await response.text();
    // 返回原始数据给 GitHub Actions
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
