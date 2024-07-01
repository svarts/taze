# Taze

This project is a web based cryptocurrency tracking application developed using Next.js 14. The application allows users to view and track the prices of various cryptocurrencies in realtime using the CoinGecko API.

## Features

- **Cryptocurrency List**: View a list of all cryptocurrencies with the latest prices, logos, names, 24-hour price changes, and 24-hour volumes.
- **Search Functionality**: Search within the list of cryptocurrencies.
- **Watchlist**: Created a watchlist by starring cryptocurrencies from the main list.
- **Dashboard**: The watchlisted cryptocurrencies are displayed at the top of the main screen as separate components.
- **Price Change Graph**: Each cryptocurrency in the watchlist includes a component displaying its price change graph.
- **Details Page**: Accessible from the main list and watchlist components, the details page provides:
  - Logo
  - Cryptocurrency name
  - Price change graph (24 hours/7 days/30 days/1 year)
  - Description
  - Market capitalization
  - 24-hour low/high prices
- **Crypto News (Bonus)**: Displayed cryptocurrency news on the dashboard from the using the CoinGecko News API.

### Implementation Details

The cryptocurrency news displayed on the dashboard and the details page are fetched using the [CoinGecko News API](https://www.coingecko.com/tr/news). This allows the application to provide up to date news related to various cryptocurrencies, enhancing the user experience with relevant information.

To integrate the CoinGecko News API, we made use of axios to fetch the news data and displayed it on the dashboard and detail pages accordingly.

## Technical Details

### Setup

**Libraries Used**:
   - `Axios`: For API requests. Chosen for its simplicity and ease of use.
   - `Chakra UI`: For building a responsive and accessible UI with predesigned components. Chosen for its ease of integration, customizability, and comprehensive set of UI components.
   - `Chart.js`: For displaying price change graphs. Chosen for its flexibility and wide range of chart types.

### Optimization and Performance

- **Server Side Rendering (SSR)**: Utilized `getServerSideProps` to fetch cryptocurrency data from the CoinGecko API. This approach enhances performance by rendering pages on the server before sending them to the client, ensuring faster page loads and improved SEO.
- **Hooks**:
  - `useCoinSearch`: Custom hook to manage the search functionality for cryptocurrencies. It optimizes the search by debouncing input changes, reducing the number of API requests.
  - `useWatchlist`: Custom hook to manage the user's watchlist. It optimizes the performance by using local state management and caching mechanisms to reduce redundant API calls.
- **Lazy Loading**: Implemented for components and images to reduce the initial load time. This approach ensures that only the necessary content is loaded initially, improving the perceived performance and user experience.
- **Infinite Scroll**: Used for loading the cryptocurrency list. This technique improves performance by loading data in chunks as the user scrolls, rather than loading all data at once. This reduces initial load time and enhances user experience.
- **API Caching**: Implemented caching mechanism in the `fetchCoins` function to store API responses for 1 minute. This minimizes redundant requests and reduces loading times by using cached data when available.

### Styling

- **UI Libraries**: `Chakra UI` used for prebuilt components to ensure a consistent and responsive design.

## How to Run

1. **Clone the repository**:
    ```bash
   git clone <https://github.com/svarts/taze.git>
   cd taze
   ```

2. **Install dependencies**:
    ```bash
   npm install
   ```

3. **Run the development server**:
    ```bash
   npm run dev
   ```
   
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional Notes

- **Code Quality**: Ensure to follow best practices for code quality and maintainability.
- **Documentation**: Inline comments and documentation should be provided for better understanding and collaboration.
- **Scalability**: The application should be scalable to handle an increasing number of users and data.

By following these guidelines and utilizing the specified libraries and optimizations, the Crypto Tracker application aims to provide a robust and user friendly experience for tracking cryptocurrency prices and trends.