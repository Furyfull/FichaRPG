fetch('skills.txt')
    .then(response => response.text())
    .then(data => {
        const products = data.split('\n');
        const tableBody = document.querySelector('#skills-table');

        products.forEach(product => {
            if (product.trim() === '') return; // Ignorar linhas vazias

            const [name, skill, score, bonusClass] = product.split(',').map(item => item.trim());
            const row = document.createElement('tr');

            // Adiciona o nome
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            row.appendChild(nameCell);

            // Adiciona o skill bonus
            const skillCell = document.createElement('td');
            skillCell.textContent = `${skill}`;
            row.appendChild(skillCell);

            // Adiciona o score
            const scoreCell = document.createElement('td');
            abrirAbScore(score).then(resp => {
                scoreCell.textContent = resp[1] + " "+score
            });
            row.appendChild(scoreCell);

            // Calcula o total
            const finalPriceCell = document.createElement('td');
            if(bonusClass != 0){
                abrirAbScore(score).then(resp => {
                    finalPriceCell.textContent = resp[1] + parseFloat(skill)+ 3
                });
            }else{
                abrirAbScore(score).then(resp => {
                    finalPriceCell.textContent = resp[1] + parseFloat(skill)
                });
            }
            row.appendChild(finalPriceCell);



            tableBody.appendChild(row);
        });
    });

// Ctrl + Shift + L

async function abrirAbScore(quq) {
        const response = await fetch('AbilScore.txt');
        const data = await response.text();
        const bib = {};

        for (key of data.split('\n')) {
            var tot = key.match(/\w+/),
                mod = +key.match(/\d+/);
            bib[tot] = [mod, Math.round((mod-10)/2)];
        }
        return bib[quq]
}

