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
        document.getElementById('spinner').classList.add('d-none');

    })
}

const fetchForSeeMore = () => {
    document.getElementById('spinner').classList.remove('d-none');
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

    const accuracy = data.accuracy.score*100;
    const accuracyFeild = document.getElementById('accuracy');
    if(accuracy===0){
        accuracyFeild.classList.add('d-none');
    }
    else{
        accuracyFeild.classList.remove('d-none');
        accuracyFeild.innerText =accuracy + '% Accuracy';
    }
    
    const modalCard = document.getElementById('modalCard');
    modalCard.innerHTML = '';
    modalCard.innerHTML += `
    <div class ="">
        <div class="col">
            <div style="background: rgba(235, 87, 87, 0.05);" class="card">
                <h5 class = "my-2 px-2">${data.description}</h5>
             <div class="card-body">
                 <div class="row row-cols-1 row-cols-md-3 g-4">
                        <div class="col">
                            <div class="card text-success py-2 px-1">
                                <h5 class ="text-center fs-6 m-0"> ${data.pricing?data.pricing[0].price:'no price'}</h5>
                                <h5 class ="text-center fs-6 m-0 "> ${data.pricing?data.pricing[0].plan:'no basic'}</h5> 
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-warning py-2 px-1">
                                <h5 class ="text-center fs-6 m-0"> ${data.pricing?data.pricing[1].price:'no price'}</h5>
                                <h5 class ="text-center fs-6 m-0 "> ${data.pricing?data.pricing[1].plan:'no pro'}</h5>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-danger-emphasis py-2 px-1">
                                <h5 class ="text-center fs-6 m-0"> ${data.pricing?data.pricing[2].price.slice(0,10):'no contact'}</h5>
                                <h5 class ="text-center fs-6 m-0 "> ${data.pricing?data.pricing[2].plan:'nothing'}</h5>
                            </div>
                        </div>    
                  </div>
                 <div class="">
                    <div class=" ">
                        <div class ="d-flex justify-content-between mt-2">
                            <div class ="">
                                <h5 class="gap-0 m-0 p-0">Feature</h5>
                                <ul class="p-2">
                                    <li class="fs-6">${data.features[1].feature_name}</li>
                                    <li class="fs-6">${data.features[2].feature_name}</li>
                                    <li class="fs-6 ">${data.features[3].feature_name}</li>
                                </ul>
                            </div>
                            <div>
                                <h5 class="gap-0 m-0 p-0">Integration</h5>
                                <ul class="p-3">
                                    <li class="fs-6">${data.integrations?data.integrations[0]:'not found'}</li>
                                    <li class="fs-6">${data.integrations?data.integrations[1]:'not found'}</li>
                                    <li class="fs-6">${data.integrations?data.integrations[2]:'not found'}</li>
                                </ul>
                            </div>
                        </div>    
                    </div>
                </div>
             </div>
          </div>
        </div>
    </div>

    <div class="col">
        <div class="card p-4">
             
            <img src="${data.image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body px-4">
                <h4 class="card-title text-center">${data.input_output_examples?data.input_output_examples[0].input:'Can you give me any example?'}</h4>
                <p class="card-text text-center">${data.input_output_examples?data.input_output_examples[0].output:'No! Not Yet! Talke a break!!!'}</p>
            </div>
        </div>
    </div>

    `;
    document.getElementById('spinner').classList.add('d-none');
    
}


function showSpinner(){
    document.getElementById('spinner').classList.remove('d-none');
}


loadFetch();
