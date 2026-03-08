import time
from flask import Flask, render_template, request, jsonify
from textblob import TextBlob
import re

app = Flask(__name__)

def analyze_review_text(text):
    # This is a heuristic mock of a Machine Learning model.
    # In a real scenario, we would load a trained scikit-learn model here
    # (e.g., LogisticRegression) and use TF-IDF vectors.
    
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    
    # Heuristics for "Fake" reviews:
    # 1. Very short review with extreme sentiment
    # 2. Repeated excessive punctuation (e.g., "!!!!")
    # 3. Specific patterns ("absolutely perfect", "best purchase ever")
    
    text_lower = text.lower()
    length = len(text.split())
    
    is_fake = False
    reasons = []
    
    if length < 5 and abs(sentiment_score) > 0.8:
        is_fake = True
        reasons.append("Review is incredibly short with extreme sentiment.")
        
    if re.search(r'!{3,}', text):
        is_fake = True
        reasons.append("Excessive use of exclamation marks detected.")
        
    fake_keywords = ["absolutely perfect", "best purchase ever", "100% recommend to everyone blindly", "buy this right now"]
    for kw in fake_keywords:
        if kw in text_lower:
            is_fake = True
            reasons.append(f"Suspicious repeated pattern detected: '{kw}'.")
            
    if "fake" in text_lower or "scam" in text_lower:
         # "fake" word used to test the model manually
         pass
         
    # If not caught by heuristics, we assume genuine, or add randomness? 
    # Let's just stick to heuristics for predictability during demo.
    
    prediction = "Fake Review" if is_fake else "Genuine Review"
    
    return {
        "prediction": prediction,
        "sentiment_score": round(sentiment_score, 2),
        "reasons": reasons if is_fake else ["Review appears natural and balanced."],
        "is_fake": is_fake
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'review' not in data:
        return jsonify({'error': 'No review text provided'}), 400
        
    review_text = data['review']
    
    # Simulate processing delay to show the loading spinner and progress bar
    time.sleep(1.5)
    
    result = analyze_review_text(review_text)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
