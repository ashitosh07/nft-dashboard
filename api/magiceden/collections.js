export default async function handler(req, res) {
  const { method, query } = req;
  
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = new URLSearchParams(query);
    const url = `https://api-mainnet.magiceden.dev/v3/rtp/ethereum/collections/v7?${params}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_MAGIC_EDEN_API_KEY}`,
        'accept': '*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}