// module.exports = {
//   reactStrictMode: true,
// }

// BPS THIS WAS USED FOR WEBPACK 4. 
// BPS I was trying to use webpack 4 for react-bootstrap package

module.exports =  {
  // Force ignore fs client-side
  reactStrictMode: true,
  webpack5: false,
  webpack: (config, { isServer }) => {
    // Check if server
    if (!isServer) {
      // If server
      config.node = {
        // Ignore fs
        fs: "empty",
        //child_process: "empty"
      };
    }
    
    // Return modified config
    return config;
  },
} ;



