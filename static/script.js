document.addEventListener('DOMContentLoaded', () => {

    /* --- #5. Typing Animation --- */
    const textToType = "Detect Fake Reviews Instantly";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);

    /* --- Elements --- */
    const analyzeBtn = document.getElementById('analyze-btn');
    const reviewInput = document.getElementById('review-input');
    const resultsArea = document.getElementById('results-area');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const resultCard = document.getElementById('result-card');
    
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const sentimentScore = document.getElementById('sentiment-score');

    /* --- Analyze Action --- */
    analyzeBtn.addEventListener('click', async () => {
        const text = reviewInput.value.trim();
        if (!text) {
            alert('Please paste a review to analyze.');
            return;
        }

        // Setup UI for processing
        resultsArea.classList.remove('hidden');
        progressContainer.classList.remove('hidden');
        resultCard.classList.add('hidden');
        resultCard.className = 'result-card hidden'; // Reset classes
        
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

        // Simulate Progress Bar (#10)
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90; // Wait at 90% for fetch to finish
            progressFill.style.width = `${progress}%`;
        }, 200);

        try {
            // Call API
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review: text })
            });

            const data = await response.json();
            
            clearInterval(interval);
            progressFill.style.width = '100%';
            
            // Wait slightly for 100% paint then show data
            setTimeout(() => {
                progressContainer.classList.add('hidden');
                displayResult(data);
                
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Analyze Review';
            }, 500);

        } catch (error) {
            clearInterval(interval);
            alert("Error connecting to the server. Please ensure the backend is running.");
            console.error(error);
            progressContainer.classList.add('hidden');
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Try Again';
        }
    });

    function displayResult(data) {
        resultCard.classList.remove('hidden');
        
        // Populate specific data
        resultTitle.textContent = data.prediction;
        sentimentScore.textContent = data.sentiment_score;
        
        // Build reasons message
        let msgHtml = '';
        if (data.is_fake) {
            msgHtml = `<strong>Fraudulent features detected:</strong><ul>`;
            data.reasons.forEach(r => msgHtml += `<li>${r}</li>`);
            msgHtml += `</ul>`;
        } else {
            msgHtml = `<p>The text patterns and sentiment profile match genuine user behavior. <br>${data.reasons[0]}</p>`;
        }
        resultMessage.innerHTML = msgHtml;

        /* --- #7. Result Highlight Animation (Red/Green) --- */
        if (data.is_fake) {
            resultCard.classList.add('result-fake');
            resultIcon.className = 'fa-solid fa-triangle-exclamation';
        } else {
            resultCard.classList.add('result-genuine');
            resultIcon.className = 'fa-solid fa-circle-check';
        }
    }
});
