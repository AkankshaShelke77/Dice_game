const dicePatterns = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
};

// Generate dots on a face
function createDots(face, num) {
    face.innerHTML = '';
    const positions = Array(9).fill(false);
    dicePatterns[num].forEach(i => positions[i] = true);
    positions.forEach(pos => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (!pos) dot.style.visibility = 'hidden';
        face.appendChild(dot);
    });
}

// Map dice number to cube rotation
function getRotation(num) {
    switch(num) {
        case 1: return {x: 0, y: 0};
        case 2: return {x: -90, y: 0};
        case 3: return {x: 0, y: -90};
        case 4: return {x: 0, y: 90};
        case 5: return {x: 90, y: 0};
        case 6: return {x: 180, y: 0};
    }
}

const players = [0,1,2,3];
let currentPlayer = 0;

// Pre-fill all faces of all cubes with dots 1-6
players.forEach(p => {
    const cube = document.querySelector(`#cube${p}`);
    createDots(cube.querySelector('.front'), 1);
    createDots(cube.querySelector('.back'), 6);
    createDots(cube.querySelector('.right'), 3);
    createDots(cube.querySelector('.left'), 4);
    createDots(cube.querySelector('.top'), 2);
    createDots(cube.querySelector('.bottom'), 5);
});

document.getElementById('rollBtn').addEventListener('click', () => {
    const cube = document.querySelector(`#cube${currentPlayer}`);
    const roll = Math.floor(Math.random() * 6) + 1;

    // Get rotation to show correct face
    const rot = getRotation(roll);

    // Add some random spins for visual effect
    const extraX = Math.floor(Math.random()*4)*360;
    const extraY = Math.floor(Math.random()*4)*360;
    cube.style.transform = `rotateX(${rot.x + extraX}deg) rotateY(${rot.y + extraY}deg)`;

    // Move to next player
    document.getElementById(`p${currentPlayer}`).classList.remove('active');
    currentPlayer++;
    if (currentPlayer >= players.length) {
        document.getElementById('status').innerText = "Game Over!";
        document.getElementById('rollBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline';
    } else {
        document.getElementById(`p${currentPlayer}`).classList.add('active');
        document.getElementById('status').innerText = `Player ${currentPlayer+1}'s Turn`;
    }
});
