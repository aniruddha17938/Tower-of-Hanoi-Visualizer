let rods = { A: [], B: [], C: [] };

function renderDisks(numDisks) {
    ['A', 'B', 'C'].forEach(id => {
        const rod = document.getElementById(id);
        rod.innerHTML = '';
        rods[id] = [];
    });

    for (let i = numDisks; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.classList.add('disk');
        const width = 20 + i * 20;
        disk.style.width = `${width}px`;
        disk.style.left = `calc(50% - ${width / 2}px)`; // Center the disk
        disk.style.bottom = `${(numDisks - i) * 22}px`;
        disk.dataset.size = i;
        rods['A'].push(disk);
        document.getElementById('A').appendChild(disk);
    }
}

async function moveDisk(from, to) {
    const fromRod = document.getElementById(from);
    const toRod = document.getElementById(to);

    const disk = rods[from].pop();
    rods[to].push(disk);

    disk.remove();
    const height = rods[to].length - 1;
    disk.style.bottom = `${height * 22}px`;

    const width = parseInt(disk.style.width);
    disk.style.left = `calc(50% - ${width / 2}px)`; // Recenter on new rod

    toRod.appendChild(disk);
}

async function animateMoves(moves) {
    for (let i = 0; i < moves.length; i++) {
        const [from, to] = moves[i];
        await new Promise(resolve => setTimeout(resolve, 500));
        moveDisk(from, to);
    }
}

function startHanoi() {
    const numDisks = Math.min(parseInt(document.getElementById('numDisks').value), 6);
    renderDisks(numDisks);

    fetch('/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num_disks: numDisks })
    })
    .then(response => response.json())
    .then(data => animateMoves(data));
}
