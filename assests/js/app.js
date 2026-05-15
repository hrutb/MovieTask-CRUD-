





let localArr= []; 
    localArr= JSON.parse(localStorage.getItem('moviesArr'));
 

const movieContainer= document.getElementById('movieContainer'); 
const addMovie= document.getElementById('addMovie');
const backdrop= document.getElementById('backdrop');
const movieModel= document.getElementById('movieModel');  
const closeMovie= [...document.querySelectorAll('.closeModel')] ;

const movieForm= document.getElementById('movieForm');
const MurlControl= document.getElementById('Murl')
const MnameControl= document.getElementById('Mname')
const MdescriptionControl= document.getElementById('Mdescription')
const MratingControl= document.getElementById('Mrating')



function setRating(rating){ 
        if(rating>4){
           return 'badge-success'
        }else if(rating >2 && rating <4){ 
            return 'badge-warning'
        }else{ 
            return 'badge-danger'
        }
}

function template(arr){
   let res =' '; 
   arr.forEach(ele=>{  
      res +=` <div class="col-md-3 col-sm-6" id="${ele.movieId}">
                        <div class="card  movieCard">
                           
                            <div class="card-header  d-flex justify-content-between flex-grow-1">
                                <h2>${ele.movieName}</h2>
                                
                                <h3>

                                    <span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span>
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="movieCard">
                                       
                                     <figure>
                                           
                                            <img 
                                                src="${ele.movieImg}" 
                                                
                                                alt="${ele.movieName}">                                        
     
                                        <figcaption>
                                               <h4>${ele.movieName}</h4>
                                                <p>${ele.movieDesciption}</p>
                                        </figcaption>
    
                                      </figure>
                                 </div> 
                            </div>
                            <div class="card-footer">
                              <div class="icons d-flex justify-content-between">
                                <button class="btn btn-inline-block btn-outline-primary">Edit</button>
                                  <button onclick="onRemove(this)" class="btn btn-inlice-block btn-outline-danger">Remove</button>
                                 
                                </div>
                            </div>
                        </div>
                    </div>`
   })
     movieContainer.innerHTML= res;
} 


template(localArr) 

// function onShowHandler(){ 
     
// backdrop.classList.add('active')
// movieModel.classList.add('active')

// }



function onMovieToggle(){ 
      backdrop.classList.toggle('active')
      movieModel.classList.toggle('active') 
}


function onSubmit(eve){ 
       eve.preventDefault(); 
   console.log('movieAdd!!!');
   
    let newObj = { 
      movieName:MnameControl.value ,
      movieImg:MurlControl.value ,
      movieDescription:MdescriptionControl.value ,
      movieRating:MratingControl.value,
      movieId:Date.now().toString() 

    } 


  console.log(newObj);
  
  localArr.push(newObj); 
  localStorage.setItem('moviesArr', JSON.stringify(localArr));
    
  eve.target.reset()
  //to hide moviemodel and back drop    
  onMovieToggle()
   
let Col3 = document.createElement('div')
    Col3.className=`col-md-3`;
    Col3.id=newObj.movieId;
    Col3.innerHTML= `<div class="card">
                     <div class="card-header d-flex justify-content-between flex-grow-1">
                                <h2>${newObj.movieName}</h2>
                                <h3>

                            <span class="badge ${setRating(newObj.movieRating)}">${newObj.movieRating}</span>
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="movieCard">
                                       
                                     <figure>
                                           
                                            <img 
                                                src="${newObj.movieImg}" 
                                                
                                                alt="${newObj.movieName}">                                        
     
                                        <figcaption>
                                               <h4>${newObj.movieName}</h4>
                                                <p>${newObj.movieDescription}</p>
                                        </figcaption>
    
                                      </figure>
                                 </div> 
                            </div>
                            <div class="card-footer">
                              <div class="icons d-flex justify-content-between">
                                <button class="btn btn-inline-block btn-outline-primary">Edit</button>
                                  <button onclick="onRemove()" class="btn btn-inlice-block btn-outline-danger">Remove</button>
                                 
                                </div>
                            </div>
                        </div>`  


    movieContainer.append(Col3);

     }



function onRemove(ele){ 
    console.log(ele);
    
       let remove= ele.closest('col-md-3').id; 
       console.log(remove); 
    
       let getindex= moviesArr.findIndex(ele=>ele.movieId===remove); 
          
       let getconfirm = confirm('You want to delete movie')
       if(getconfirm){
       localArr.splice(getindex,1); 

       localStorage.setItem('moviesArr',JSON.stringify(localArr));
       
        ele.closest('col-md-3').remove;
       }



       
}


addMovie.addEventListener('click', onMovieToggle)

closeMovie.forEach(btn =>btn.addEventListener('click', onMovieToggle ))
movieForm.addEventListener('submit', onSubmit)
