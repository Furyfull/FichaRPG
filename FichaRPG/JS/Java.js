document.addEventListener('DOMContentLoaded', () => {
    fetch('produtos.txt')
        .then(response => response.text())
        .then(data => {
            const products = data.split('\n');
            const tableBody = document.querySelector('#product-table tbody');

            products.forEach(product => {
                if (product.trim() === '') return; // Ignorar linhas vazias

                const [name, price, discount] = product.split(',').map(item => item.trim());
                const row = document.createElement('tr');

                // Adiciona a célula do nome
                const nameCell = document.createElement('td');
                nameCell.textContent = name;
                row.appendChild(nameCell);

                // Adiciona a célula do preço, se não for zero
                const priceCell = document.createElement('td');
                if (price !== '0') {
                    priceCell.textContent = `${price}`;
                }
                row.appendChild(priceCell);

                // Adiciona a célula do desconto, se não for zero
                const discountCell = document.createElement('td');
                if (discount !== '0%' && discount !== '0') {
                    discountCell.textContent = discount;
                }
                row.appendChild(discountCell);

                const finalPrice = parseFloat(price) * (1 - parseFloat(discount) / 100);
                const finalPriceCell = document.createElement('td');
                if (finalPrice !== parseFloat(price) && finalPrice !== 0 ){
                    finalPriceCell.textContent = `${finalPrice}`;
                }
                
                row.appendChild(finalPriceCell);


                
                tableBody.appendChild(row);
            });
        })
});
