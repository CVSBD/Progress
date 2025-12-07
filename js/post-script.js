document.addEventListener('DOMContentLoaded', () => {
    // 1. Get ID from URL (e.g., ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    if (!testId) {
        document.querySelector('.content-wrapper').innerHTML = "<h1>Error: No Test ID specified.</h1>";
        return;
    }

    // Update Header
    document.getElementById('test-header').innerText = `IELTS Practice Test ${testId}`;
    document.getElementById('track-title').innerText = `Track ${testId}.mp3`;

    // 2. Set Audio Source
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = `audiobook/${testId}.mp3`;

    // 3. Fetch Questions
    const questionsContainer = document.getElementById('questions-container');
    
    fetch(`questions/${testId}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Questions not found");
            return response.text();
        })
        .then(html => {
            questionsContainer.innerHTML = html;
        })
        .catch(err => {
            questionsContainer.innerHTML = `<p style="color:red">Error loading questions: ${err.message}</p>`;
        });

    // 4. Handle Answers Button
    const showAnswersBtn = document.getElementById('show-answers-btn');
    const answersContainer = document.getElementById('answers-container');
    let answersLoaded = false;

    showAnswersBtn.addEventListener('click', () => {
        // Toggle visibility
        answersContainer.classList.remove('hidden');
        showAnswersBtn.style.display = 'none'; // Hide button after clicking

        // Fetch only if not already loaded
        if (!answersLoaded) {
            fetch(`answers/${testId}.html`)
                .then(response => {
                    if (!response.ok) throw new Error("Answers not found");
                    return response.text();
                })
                .then(html => {
                    answersContainer.innerHTML = `<h2>Answer Key</h2>${html}`;
                    answersLoaded = true;
                })
                .catch(err => {
                    answersContainer.innerHTML = `<p style="color:red">Error loading answers: ${err.message}</p>`;
                });
        }
    });
});