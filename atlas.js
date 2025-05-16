const continent = document.getElementById('continent');
const modal = new bootstrap.Modal(document.getElementById('windowCountry'));
const modalBody = document.getElementById('modal-body-content');

async function getData(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      let blocks = '';
      json.forEach((country) => {
        blocks += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" style="margin-top: 20px">                
                <div class="card">
                    <img class="card-img-top" src="${country.flags.png}"  alt="Vlajka">
                    <div class="card-body">
                      <h4 class="card-title">${country.name.common}</h4>
                      <p class="card-text">Počet obyvatel: ${country.population}</p>
                      <a href="#" class="btn btn-info card-link" data-name="${country.name.common}">Informace</a>
                    </div>
                </div>
            </div>            
        `;
      });
      listCountries.innerHTML = blocks;
      document.querySelectorAll('[data-name]').forEach(button => {
        button.addEventListener('click', () => {
          const countryName = button.getAttribute('data-name');
          modal.show();
          fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then(res => res.json())
          .then(data => {
            const country = data[0];
            modalBody.innerHTML = `
            <h4>${country.name.common}</h4>`
          })
          .catch(error => {
            console.error(error)
          })
        })
      });
    } catch (error) {
      console.error(error.message);
    }
  }

continent.addEventListener('change', ()=> {
    getData(continent.value);
});

getData('europe');
