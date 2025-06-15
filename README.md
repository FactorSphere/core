# FactorSphere

<div align="center">

### 🔎 [Explore Journal Rankings](https://factorsphere.github.io/core) | ⭐ [Star Project](https://github.com/FactorSphere/core) | 📊 [View Data](https://github.com/FactorSphere/core/tree/main/src/data)

</div>

FactorSphere is a personal project aimed at democratizing academic journal rankings through transparent, community-driven metrics. Born out of frustration with closed-source impact factors and opaque ranking methodologies, this platform provides researchers with clear, accessible journal metrics.

## Core Features

### 📊 Transparent Rankings
- Open-source impact factor calculations
- Community-verified data
- Real-time metric updates
- Multi-source ranking aggregation

### 🔍 Smart Search & Filtering
- Instant journal search
- Field-specific filtering
- Advanced sorting options
- Citation metrics integration

### 🎨 Modern Interface
- Responsive design for all devices
- Dark/Light theme support
- Clean, GitHub-inspired aesthetics
- Accessibility-focused UI

### 📈 Comprehensive Metrics
- Impact Factor (sourced from OOIR.org)
- SCImago Journal Rank (SJR)
- H-index tracking
- Citation analytics

### AI Journal Recommender (Beta)

Find the perfect journal for your research using our AI-powered recommendation system:
- Semantic search using PineCone vector database
- Fast and accurate matching using embeddings
- Sorted by Impact Factor (IF)
- Real-time field matching

## Technology Stack

### Frontend
- Pure JavaScript, HTML5, CSS3
- Responsive design with CSS Grid/Flexbox
- Theme switching (light/dark mode)
- Client-side data processing

### Backend (Recommendations)
- Cloudflare Workers for serverless deployment
- PineCone Vector Database for semantic search
- OpenAI embeddings for text processing
- Cross-Origin Resource Sharing (CORS) enabled
- Response format:
  ```json
  {
    "matches": [
      {
        "metadata": {
          "journal_name": "journal title",
          "discipline": "field1, field2, ...",
          "OOIR_IF": "impact factor"
        },
        "score": 0.875
      }
    ]
  }
  ```

## Project Structure

```
factorsphere/
├── src/
│   ├── css/
│   │   └── styles.css          # Global styles & theme variables
│   ├── js/
│   │   ├── main.js            # Core functionality & search
│   │   ├── details.js         # Journal details page logic
│   │   └── theme-init.js      # Theme initialization
│   ├── data/
│   │   ├── factorsphere_data.json  # Journal database
│   │   └── dictionary.csv     # Field definitions
│   ├── img/
│   │   ├── favicon.svg        # Site favicon
│   │   ├── logo_cr.png       # Circular logo
│   │   └── logo.png          # Full logo
│   └── ever/
│       ├── Details.html      # Journal details page
│       └── us.html           # About page
└── index.html               # Main entry point
```

## Contributing

I welcome contributions from fellow researchers and developers! Here's how you can help:

### Data Contributions
1. Verify existing journal metrics
2. Submit new journal data
3. Report inconsistencies
4. Suggest additional metrics

### Code Contributions
1. Fork the repository
2. Create a descriptive branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request with details

### Design & UX
- Suggest UI improvements
- Report accessibility issues
- Propose new features
- Share user feedback

## Community Discussions

Join our [GitHub Discussions](https://github.com/FactorSphere/core/discussions) to:
- Ask questions and get help
- Share ideas and feedback
- Discuss journal metrics
- Connect with other researchers
- Stay updated on project news

### Discussion Categories
- 📣 Announcements
- 💡 Ideas & Feature Requests
- 🙏 Q&A
- 🌟 Show and Tell
- 🔧 Data Updates

## Data Sources & Methodology

### Current Sources
- OpenAlex API for citation metrics
- SCImago Journal Rank (SJR)
- AI Recommendations via PineCone Vector DB
- Community contributions

### Verification Process
1. Automated data validation
2. Cross-reference checking
3. Community peer review
4. Regular updates

## Vision

FactorSphere aims to become the go-to platform for transparent journal metrics. By combining open data with community verification, we're building a more equitable academic publishing landscape.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Support

- Created by: [@REXFEDEC](https://github.com/REXFEDEC)
- Issues & Features: [GitHub Issues](https://github.com/FactorSphere/core/issues)
- Project Homepage: [https://github.com/FactorSphere/core](https://github.com/FactorSphere/core)

## Acknowledgments

Special thanks to:
- The academic community for data contributions
- Open-source metric providers
- GitHub's design system for inspiration
- All contributors and supporters