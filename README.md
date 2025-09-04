# Monad NFT Analytics Dashboard

A real-time NFT analytics dashboard that uses **Magic Eden APIs** to fetch live NFT data and filters it specifically for **Monad ecosystem collections**. No mock data - 100% real marketplace data!

## 🚀 Real Magic Eden Integration

### **Live Data Sources:**
- **Magic Eden Collections API** - Real NFT marketplace data
- **Magic Eden Search API** - Live collection search
- **Magic Eden Trending API** - Real trending collections
- **Magic Eden Portfolio API** - Actual wallet holdings
- **CoinGecko Price API** - Live ETH/MON pricing

### **Monad Ecosystem Filtering:**
The dashboard automatically filters Magic Eden's real data for Monad-related collections using keywords:
- `monad`, `mon`, `monks`, `portals`, `crystals`, `mechs`, `spirits`, `genesis`
- `monadlabs`, `monadchain`, `monadnft`, `monadverse`, `monadeco`

## 🎯 Features

### **Real-Time Collections:**
- Live Magic Eden NFT data filtered for Monad ecosystem
- Real floor prices, volumes, and trading statistics
- Actual owner counts and supply numbers
- Live 24h price changes and market data

### **Advanced Search:**
- Search Magic Eden's entire database for Monad collections
- Real-time API calls with pagination
- Filter results by Monad-related keywords
- No cached or dummy data

### **Portfolio Tracking:**
- Enter any Ethereum wallet address
- View real Monad-related NFT holdings
- Live portfolio values based on current floor prices
- Actual collection ownership data

### **Trending Analysis:**
- Real trending collections from Magic Eden
- Filtered specifically for Monad ecosystem
- Live 24h sales and volume data
- Actual market performance metrics

## 🛠 Setup

### 1. Get Magic Eden API Key
```bash
# Visit https://docs.magiceden.dev/
# Sign up for free API access
# Get your API key
```

### 2. Configure Environment
```bash
cp .env.example .env
# Add your Magic Eden API key:
REACT_APP_MAGIC_EDEN_API_KEY=your_magic_eden_api_key_here
```

### 3. Install & Run
```bash
npm install
npm start
```

## 📊 How It Works

### **Data Flow:**
1. **Fetch** - Calls Magic Eden APIs for real NFT data
2. **Filter** - Searches for Monad-related keywords in collection names/descriptions
3. **Display** - Shows only collections related to Monad ecosystem
4. **Update** - Real-time data with pagination and search

### **API Endpoints Used:**
- `GET /collections/v7` - All collections with metadata
- `GET /search/collections/v2` - Search collections by name
- `GET /collections/trending/v1` - Trending collections
- `GET /users/{address}/collections/v3` - User portfolio

### **Monad Detection:**
Collections are identified as Monad-related if their name, symbol, or description contains:
- Direct Monad references (`monad`, `mon`)
- Monad collection names (`monks`, `portals`, `crystals`, `mechs`, `spirits`, `genesis`)
- Monad ecosystem terms (`monadlabs`, `monadchain`, `monadnft`)

## 🔍 Search Examples

Try searching for these terms to find Monad collections:
- `monad` - General Monad ecosystem collections
- `monks` - Monad Monks collections
- `portals` - Monad Portals collections
- `crystals` - Monad Crystals collections
- `mechs` - Monad Mechs collections
- `spirits` - Monad Spirits collections

## 📈 Real Data Features

### **Live Statistics:**
- Real floor prices from Magic Eden marketplace
- Actual 24h trading volumes
- Live owner counts and total supply
- Real price change percentages
- Actual sales counts and market caps

### **Portfolio Analysis:**
- Real wallet holdings from blockchain data
- Live floor value calculations
- Actual collection ownership numbers
- Real-time portfolio value in ETH/MON

### **Market Trends:**
- Live trending data from Magic Eden
- Real 24h sales performance
- Actual volume rankings
- Live market activity

## 🚫 No Mock Data

This dashboard contains **ZERO mock/dummy data**:
- ❌ No hardcoded collections
- ❌ No simulated prices
- ❌ No fake statistics
- ✅ 100% real Magic Eden API data
- ✅ Live blockchain information
- ✅ Real marketplace statistics

## 🔧 Technical Details

### **API Rate Limits:**
- Magic Eden: Standard rate limits apply
- Automatic retry logic for failed requests
- Efficient pagination to minimize API calls

### **Data Processing:**
- Real-time filtering of Magic Eden responses
- Keyword matching for Monad ecosystem detection
- Live data formatting and normalization
- Automatic duplicate removal

### **Performance:**
- Optimized API calls with proper pagination
- Efficient filtering algorithms
- Real-time updates without page refresh
- Responsive design for all devices

## 🌐 Live Demo

The dashboard shows real Magic Eden data filtered for Monad collections:
- **Collections Tab**: Browse real Monad NFT collections
- **Trending Tab**: See actual trending Monad collections
- **Portfolio Tab**: Track real Monad NFT holdings

## 📝 Notes

- **Real Data Only**: All information comes from live APIs
- **Monad Focus**: Automatically filters for Monad ecosystem
- **Live Updates**: Data refreshes with real marketplace changes
- **No Simulation**: Every statistic is from actual blockchain/marketplace data

Built with real Magic Eden APIs for authentic Monad NFT ecosystem tracking! 🟣⚡