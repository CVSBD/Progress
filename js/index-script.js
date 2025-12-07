document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get Data from records.js
    // 'manualData' is a global variable defined in js/records.js
    let friendsArray = manualData;

    // 2. Calculate Average for each friend
    friendsArray = friendsArray.map(friend => {
        return {
            ...friend, // copies name, taken, score
            average: friend.testsTaken === 0 ? 0 : (friend.totalScore / friend.testsTaken).toFixed(1)
        };
    });

    // 3. Sort by Total Score (Highest to Lowest)
    friendsArray.sort((a, b) => b.totalScore - a.totalScore);

    // 4. Render Table
    const tbody = document.querySelector('#leaderboard-table tbody');
    tbody.innerHTML = '';

    friendsArray.forEach((friend, index) => {
        // Highlight top 3
        let rankEmoji = `#${index + 1}`;
        if (index === 0) rankEmoji = '🥇';
        if (index === 1) rankEmoji = '🥈';
        if (index === 2) rankEmoji = '🥉';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rankEmoji}</td>
            <td><strong>${friend.name}</strong></td>
            <td>${friend.testsTaken}</td>
            <td>${friend.totalScore}</td>
            <td>${friend.average}</td>
        `;
        tbody.appendChild(tr);
    });
});