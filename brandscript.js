const brandsContainer = document.getElementById('brands-container');

fetch('brands.json')
  .then(response => response.json())
  .then(data => {
    data.brands.forEach(brand => {
      const brandCard = document.createElement('span');
      brandCard.className = 'brand-card';
      brandCard.style.display = "inline-block";
      brandCard.style.width ="150px" ;

      const brandLink = document.createElement('a');
      brandLink.href = brand.link;
      brandLink.target = '_blank';

      const brandImage = document.createElement('img');
      brandImage.src = brand.image;
      brandImage.alt = brand.name;
      brandImage.className = 'brand-image';

      const brandName = document.createElement('p');
      brandName.textContent = brand.name;
      brandName.className = 'brand-name';

      brandLink.appendChild(brandImage);
      brandCard.appendChild(brandLink);
      brandCard.appendChild(brandName);
      brandsContainer.appendChild(brandCard);
    });
  })
  .catch(error => {
    console.error('Error fetching brands:', error);
  });
