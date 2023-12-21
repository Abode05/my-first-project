setuI();

get_users();
getposts();

function getcurrentID() {
     let urlparam= new URLSearchParams(window.location.search)
    const idusers=urlparam.get("userId")
    console.log(idusers)
    return idusers
}


function get_users() {
    toggleLoader(true)
     const id=getcurrentID()
    axios.get(`${baseurl}/users/${id}`)
        .then(function (response) {
            let user = response.data.data
            console.log(user)
            
            document.getElementById("main-info-email").innerHTML=user.email
            document.getElementById("main-info-name").innerHTML=user.name
            document.getElementById("main-info-username").innerHTML = user.username
            document.getElementById("main-posts").innerHTML = user.username
            document.getElementById("main-info-image").src = user.profile_image
            
            //comment &post
            document.getElementById("post-count").innerHTML=user.posts_count
            document.getElementById("post-comment").innerHTML=user.comments_count
         
            
        })
        .catch(function () {
                   const message= "error"
                     showAlert(message, "danger")  
        }).finally(() => {
                    toggleLoader(false)
                })
}

 
function getposts() {
     toggleLoader(true)
     const id=getcurrentID()
            axios.get(`${baseurl}/users/${id}/posts`)
                .then(function (response) {
                   
                    let res = response.data.data
                    console.log(res)
                    
                    document.getElementById("user-post").innerHTML=""
                    for (responses of res)
                    {
                            const author=responses.author;
                            let postTitle=""
                            if(responses.title!=null){
                                postTitle=responses.title
                            }
                            // show or hide (btn edit) 
                            let user = getusername()
                            let ismypost = user != null && responses.author.id == user.id
                            let editbtnContent = ``
                            if (ismypost) {
                                editbtnContent =
                                `
                                <button type="button" class="btn btn-danger   " style="margin-left:5px; float:right" onclick="deletepostclicked('${encodeURIComponent(JSON.stringify(responses))}')">delete</button>          

                                <button type="button" class="btn btn-secondary  " style="float:right" onclick="editpostclicked('${encodeURIComponent(JSON.stringify(responses))}')">edit</button>
                                
                                `            

                            } 
                                
                            
                            let content=`
                        
                            <div class="card shadow my-4">
                            <div class="card-header" >
                                <img src=${author.profile_image} alt="" class=" rounded-circle border border-1" style="width: 40px ;height: 40px;">
                                <b>${author.username}</b>

                                ${editbtnContent}

                            </div>
                            <div class="card-body"  onclick="postClicked(${responses.id})"  style="cursor:pointer">
                            <img  class="w-100 " src="${responses.image}" alt="" style="height: 500px;">
                            <h6 class="mt-1 text-dark-emphasis">${responses.created_at}</h6>
                            <h5>${postTitle}</h5>

                            <p>${responses.body}</p>
                                <hr>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                </svg>

                                <span>
                                (${responses.comments_count}) comment
                                    
                                    <span id="post-tags-${responses.id}">
                                    
                                    </span>
                                    
                                    
                                    </span>

                            </div>
                            </div>
                        </div>
                        <!-- END card post -->
                    
          
                        
                        `
                        document.getElementById("user-post").innerHTML+=content;
                        
                        const curresnttags=`post-tags-${responses.id}`
                        document.getElementById(curresnttags).innerHTML=""
                        for(tag of responses.tags)
                        {

                            console.log(tag.name)
                            let tag_contemt=
                            `
                                <button class="btn btn-sm rounded-5 bg-secondary"> 
                                 ${tag.name}
                                </button >
                            `
                             document.getElementById(curresnttags).innerHTML +=tag_contemt

                        }
                    // console.log(res);


                    }
                })
                .catch(function (error) {
                    // handle error
                    const message = error.response.data.error_message;
                                        console.log(message);

                }).finally(()=> {
                    toggleLoader(false)
                })
}
          function postClicked(postid) {
        // alert(postid)
        window.location = `postDetails.html?postId=${postid}`
}