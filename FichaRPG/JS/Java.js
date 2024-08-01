fetch('skills.txt')
    .then(response => response.text())
    .then(data => {
        const products = data.split('\n');
        const tableBody = document.querySelector('#skills-table');

        products.forEach(product => {
            if (product.trim() === '') return; // Ignorar linhas vazias

            const [name, skill, score, bonusClass] = product.split(',').map(item => item.trim());
            const row = document.createElement('tr');

            // Adiciona a célula do nome
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            row.appendChild(nameCell);

            // Adiciona a célula da skill bonus, se não for zero
            const skillCell = document.createElement('td');
            if (skill !== '0') {
                skillCell.textContent = `${skill}`;
            }
            row.appendChild(skillCell);

            // Adiciona a célula do score, se não for zero
            const scoreCell = document.createElement('td');
            if (score !== '0%' && score !== '0') {
                scoreCell.textContent = score;
            }
            row.appendChild(scoreCell);

            const finalPrice = parseFloat(skill) + parseFloat(score) + 3 ? bonusClass != 0 : skill + score;
            const finalPriceCell = document.createElement('td');
            if (finalPrice !== parseFloat(skill) && finalPrice !== 0) {
                finalPriceCell.textContent = `${finalPrice}`;
            }

            row.appendChild(finalPriceCell);



            tableBody.appendChild(row);
        });
    });


