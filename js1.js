const loadFetch = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => showFetch(data.data.tools.slice(0,6)))
}


const showFetch = (data) => {
    console.log(data);

    const parantDiv = document.getElementById('parantDiv');
    parantDiv.innerHTML='';
    data.forEach(singleItem => {
        const childDiv = document.createElement('div');
        childDiv.classList.add('col');
        childDiv.innerHTML=`
        <div class="card h-100">
            <img src="${singleItem.image}" class="card-img-top align-items-center" alt="...">
            <div class="card-body">
                <h4 class="card-title">Features</h4>
                <p class="m-0">1. ${singleItem.features[0]}</p>
                <p class="m-0">2. ${singleItem.features[1]}</p>
                <p class="m-0">3. ${singleItem.features[2]}</p>
                
             </div>
             <span class="border mx-3 border-top-0 border-light-subtle"></span>
             <div class="mx-3 mt-4">
                 <div class="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <h4>${singleItem.name}</h4>
                        <div class="d-flex align-itemx-center gap-2">
                         <i class="fa-regular fa-calendar mt-1 text-black"></i>
                         <p class="">${singleItem.published_in}</p>
                        </div>
                    </div>
                     <div>
                     <button onclick="loadDetails('${singleItem.id}')" type="button" class = "btn btn-secondary" data-bs-toggle="modal" data-bs-target="#showDetailsModal"> <i class="fa-solid fa-arrow-right"></i></button>
                     </div>
                 </div>
             </div>
        </div>
        `;
        parantDiv.appendChild(childDiv);

    })
}

const fetchForSeeMore = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => seeMore(data.data.tools));

}

function seeMore(newdata){
    showFetch(newdata);
    document.getElementById('see-more').classList.add('d-none');
    
}


function loadDetails(id){
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.data))
    
}

const showDetails = data =>{
    console.log(data);
    const modalCard = document.getElementById('modalCard');
    modalCard.innerHTML = '';
    modalCard.innerHTML += `
    <div class="col">
        <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.</p>
        </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body px-4">
            <h4 class="card-title text-center">${data.input_output_examples[0].input}</h4>
            <p class="card-text text-center">${data.input_output_examples[0].output}</p>
        </div>
        </div>
    </div>
    `
    
}

loadFetch();
// loadShowDetails();

// fetchForSeeMore();