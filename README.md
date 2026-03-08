# ReviewGuard
ReviewGuard
ReviewGuard is a web application designed to detect and flag potentially fake or suspicious online reviews. It uses natural language processing (NLP) and heuristic rules to analyze the sentiment, length, and content of a review to determine its authenticity.
## Developer

Developed by Saira Alvi
Department of Computer Science
University of 

## Features

- **Fake Review Detection:** Analyzes reviews based on text length, sentiment extremes, excessive punctuation, and suspicious keyword patterns.
- **Sentiment Analysis:** Utilizes TextBlob to calculate the sentiment polarity of the provided review text.
- **Interactive Web Interface:** A modern and user-friendly frontend to submit reviews and view analysis results in real-time.
- **Detailed Reporting:** Provides specific reasons if a review is flagged as potentially fake, giving users clear explanations for the system's decision.

## Technology Stack

- **Backend:** Python, Flask
- **NLP Library:** TextBlob
- **Frontend:** HTML, CSS, JavaScript

## Prerequisites

Before running the application, make sure you have Python installed on your system. You will also need to install the required Python packages.

```bash
pip install Flask textblob
```

## How to Run

1. Clone or download this repository.
2. Navigate to the project directory in your terminal:
   ```bash
   cd reviewguard
   ```
3. Run the Flask application:
   ```bash
   python app.py
   ```
4. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## How It Works

The application uses a heuristic approach (which can be easily replaced or augmented with a trained machine learning model) to evaluate reviews. Current heuristic rules include:

1.  **Short & Extreme Sentiment:** Flags very short reviews that display extreme positive or negative sentiment (e.g., highly polarized without detail).
2.  **Excessive Punctuation:** Detects unnatural use of repeated punctuation marks (e.g., "!!!!!").
3.  **Suspicious Keywords:** Looks for common patterns often found in incentivized or fake reviews (e.g., "100% recommend to everyone blindly", "best purchase ever").

## Future Improvements

- Integrate a scikit-learn machine learning model trained on a real dataset of fake and genuine reviews (e.g., using TF-IDF and Logistic Regression) to replace the current heuristic logic.
- Expand the frontend features to support bulk review analysis via file uploads (CSV/JSON).
- Add support for multiple languages.


