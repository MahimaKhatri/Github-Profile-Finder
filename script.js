let API_LINK='https://api.github.com/users';
let search_btn = document.querySelector(".search");
let search_term = document.getElementById("search-term");
var repoUl = document.getElementById("repo");

let searching = document.querySelector(".searching");
search_term.focus();
var repo=new Array(0);
search_btn.addEventListener("click",(e)=>{
    e.preventDefault();
if(search_term.value){
    searching.innerHTML='Searching...';
    setTimeout(() => {
        getUserDetaile(`${API_LINK}/${search_term.value}`);
      
  }, 2000);
    setTimeout(() => {
        getRepoDetaile(`${API_LINK}/${search_term.value}/repos`);
  }, 1000);
}else{
    alert('please enter any github username');
search_term.focus();
}
});


  function showUserDetails(data){
    var box = document.querySelector(".box-body");
    var j=``;
    repo.forEach((r)=>{
        r.forEach((e)=>{
           j+=`<a href="${e.html_url}" target="_blank"><li>${e.name}</li></a>`;
        })
    })
searching.innerHTML="";

    box.innerHTML=(`
    <div class="profile-box">
    <div class="row">
        <div class="image">
            <img src="${data.avatar_url}" alt="">
        </div>
       <div class="about">
        <div class="details">
            <h1 class="name">${data.name}</h1>
            <h3 class="username">@${data.login}</h3>
            <p class="country"><span><ion-icon name="location-sharp"></ion-icon></span>${data.location===null ? 'Unknown' : data.location}</p>
        </div>
        <div class="btn-profile">
            <a href="${data.html_url}" target="_blank">Visit Profile</a>
        </div>
       </div>
    </div>
    <div class="bio">
        <h3>About</h3>
        <p>${data.bio===null ? 'Bio description is unavailable' : data.bio}</p>
    </div>
    <div class="row-followers">
        <div class="col">
            <h3 class="heading">
                Followers
            </h3>
            <p>${data.followers}</p>
        </div>
        <div class="col">
            <h3 class="heading">
                Following
            </h3>
            <p>${data.following}</p>
        </div>
        <div class="col">
            <h3 class="heading">
                Repos
            </h3>
            <p>${data.public_repos}</p>
        </div>
    </div>
    <h3 class="repo-heading">Repositories</h3>
    <div class="respos-row">
        <ul id="repo">
        ${j}
        </ul>
    </div>
</div>
    `);
    repoUl.innerHTML=j;
}


async function getUserDetaile(api){
    let query = await fetch(api)
    .then(async (query)=>{
     return await query.json();
    }).then((result)=>{
      if(result.name==null){
          alert("User not found");
          location.reload();
      }else{
          showUserDetails(result);
      }
    }).catch((error)=>{
        console.log(error)
    })
}


async function getRepoDetaile(repi_api){
    let repo_query = await fetch(repi_api)
    .then(async (repo_query)=>{
     return await repo_query.json()
    }).then((repo_result)=>{
     repo.push(repo_result);
    }).catch((repo_error)=>{
        console.log(repo_error)
    });
}