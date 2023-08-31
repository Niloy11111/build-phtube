const showAllCategory = async () => {
    
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories') ;

    const data = await response.json();
    
    const fullData = data.data ;

    const categoryContainer = document.getElementById('category-name');

    fullData.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="displayCard('${item.category_id}')" class="px-5 py-2 font-medium font-inter text-base rounded-lg bg-gray-400 text-[#252525]">${item.category}</button>
        `;
        
        categoryContainer.appendChild(div);
    })

};

const displayCard = async (categoryId) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)

    const data = await response.json();
    const cardContainer = document.getElementById('card-container');

    cardContainer.textContent = '';
    data.data.forEach((item) => {

        const div = document.createElement('div');
    div.innerHTML = `
    <div class="card-compact pb-6">
    <figure class=""><img class="rounded-lg w-full h-[250px]" src=${item.thumbnail} alt="Shoes" /></figure>
    <div class="">
      <div class="flex gap-3 mt-5">
            <img class="w-12 rounded-full" src='${item.authors[0].profile_picture}' alt="">
        <h3 class="text-[#171717] font-inter font-bold text-base mr-2">Building a Winning UX Strategy Using the Kano Model</h3>
      </div>

      <div class="flex gap-2 mt-2 ml-14">
       <p>${item.authors[0].profile_name}</p>
        <h1>${item.authors[0].verified}</h1>
      </div>
      <p class="ml-14 mt-2">${item.others.views} views</p>
    </div>
  </div>

    `;
    cardContainer.appendChild(div);  
    })

 
};

showAllCategory();