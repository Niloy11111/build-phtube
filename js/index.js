const showAllCategory = async () => {
    
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories') ;

    const data = await response.json();
    
    const fullData = data.data ;

    const categoryContainer = document.getElementById('category-name');

    fullData.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="displayCard('${item.category_id}')" class="px-5 py-2 text-[#191919B3] font-medium font-inter text-base rounded bg-[#19191926] text-[#252525]">${item.category}</button>
        `;
        
        categoryContainer.appendChild(div);
    })

};

const displayCard = async (categoryId) => {
  sortByView(categoryId)

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)

    const data = await response.json();
    
    const cardContainer = document.getElementById('card-container');

    cardContainer.textContent = '';
    data.data.forEach((item) => {
      
        const div = document.createElement('div');
        div.classList.add('card');

        
        const seconds = item.others.posted_date;
        
        const totalSeconds = parseFloat(seconds);
       
        const totalMinutes = Math.floor(totalSeconds/60);
        const minutes = totalMinutes % 60 ;
        
        const totalHours = Math.floor(totalMinutes / 60);

      
    div.innerHTML = `
    <div class="card-compact pb-6">
    <figure class=""><img class="rounded-lg w-full h-[250px]" src=${item.thumbnail} alt="Shoes" />
      </figure>

      <div id="hours-minute" class="relative lg:ml-[300px] ml-64 md:ml-64 lg:ml-56 -top-10 px-2 py-1 w-max rounded bg-[#171717] text-[#FFF] text-xs font-normal font-inter"> ${totalHours? totalHours : ''} ${totalHours? 'hrs' : ''} ${minutes? minutes : ''} ${minutes? 'min ago' : ''}</div>
    <div class="">
      <div class="flex gap-3 mt-5">
            <img class="w-[48px] h-[45px] rounded-full" src='${item.authors[0].profile_picture}' alt="">
        <h3 class="text-[#171717] font-inter font-bold text-base mr-2">Building a Winning UX Strategy Using the Kano Model</h3>
      </div>

      <div class="flex gap-2 mt-2 ml-14">
       <p class="text-[#111111B3] font-inter font-normal text-sm">${item.authors[0].profile_name}</p>
        ${item.authors[0].verified?'<img src=".//image/fi_10629607.svg">' : ''}
      </div>
      <p class="ml-14 mt-2 text-[#111111B3] font-inter font-normal text-sm">${item.others.views} views</p>
    </div>
  </div>

    `;
    cardContainer.appendChild(div);
    
    });

    if( data?.data?.length === 0 && data.message == 'no data found!!!' && data.status == false){
      const noDataContainer = document.getElementById('no-data-container');
      noDataContainer.innerHTML = "" ;
      
      const div = document.createElement('div');
          div.innerHTML = `
          <div class="">
          <img class="mb-8 mx-auto" src="./image/Icon.png" alt="">
          <h2 class="text-[#171717] text-3xl font-bold font-inter font-inter text-center">Oops!! Sorry, There is no <br> content here</h2>
         </div>
          ` ;
          div.classList.add('h-[580px]', 'flex' ,'justify-center', 'items-center')
          noDataContainer.appendChild(div);
        }
        else if(data?.data?.length > 0  || data?.status == true){
          const noDataContainer = document.getElementById('no-data-container');
          noDataContainer.textContent = "" ;
        }   ;
};

const sortByView = async () => {

  const cardContainer = document.getElementById('card-container');
  const cards = cardContainer.getElementsByClassName('card');

  const cardsArray = Array.from(cards);

  console.log(cardsArray)

  cardsArray.sort((a, b) => {
    const viewA = b.childNodes[1].childNodes[5].childNodes[5].innerText.slice(0,3)*1000 ;
    const viewB = a.childNodes[1].childNodes[5].childNodes[5].innerText.slice(0,3)*1000 ;

    return viewA - viewB ;
  })

    cardContainer.innerHTML = "" ;
    
    cardsArray.forEach(card => {
      cardContainer.appendChild(card);
    });
};


displayCard('1000');
showAllCategory();