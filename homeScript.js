  setuI();
      getposts(); 

 
        ////////////////
        let currentpage=1;
        let lastpage=1;
        ///INFINTE SCROLL//////
        window.addEventListener("scroll",function(){
              const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
              
            console.log(window.innerHeight, window.pageYOffset,document.body.scrollHeight)
              
            if(endOfPage &&currentpage<lastpage){
                currentpage=currentpage+1;
                getposts(false,currentpage)

            }

        })
                ///INFINTE SCROLL///////

      //reload =هاد السطر مرة بدي استخدمه ومرة لل ف عرفت متغير اسمه ريلاود 
function getposts(reload = true, page = 1)
{
     toggleLoader(true)   

    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=6&page=${page}`)
        .then(function (response) {

            lastpage=response.data.meta.last_page
            // handle success
            let res=response.data.data
            if(reload)
            {
                document.getElementById("posts").innerHTML = "";

            }
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
                 <span onclick="usercontentclicked(${author.id})" style="cursor:pointer">
                    <img src=${author.profile_image} alt="" class=" rounded-circle border border-1" style="width: 40px ;height: 40px;">
                    <b>${author.username}</b>
                 </span>

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

                    <span>(${responses.comments_count}) comment
                        
                        <span id="post-tags-${responses.id}">
                            <button class="btn btn-sm rounded-5 bg-secondary" > policy</button>
                            <button class="btn btn-sm rounded-5 bg-secondary" > action</button>
                            <button class="btn btn-sm rounded-5 bg-secondary" > power</button>
                            </span>
                        
                        
                        </span>

                    </div>
                </div>
            </div>
            <!-- END card post -->
            
    
                
                `
                document.getElementById("posts").innerHTML+=content;
                
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


            }
            console.log(res);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert("sji")
        }).finally(() => {
                     toggleLoader(false)

                })
    }

    function postClicked(postid) {
        // alert(postid)
        window.location = `postDetails.html?postId=${postid}`
}
        
function usercontentclicked(userid)
{
    // alert(userid)
    window.location=`profile.html?userId=${userid}`
}
  
  function addBtnClicked()
{
            document.getElementById("post-create-modal-btn").innerHTML="create"
            document.getElementById("post-id-input").value=""
            document.getElementById("post-title-input").value=""
            document.getElementById("post-body-input").value=""
            document.getElementById("post-modal-title").innerHTML="create a new post"
            let postmodal=new bootstrap.Modal(document.getElementById("new-post-modal"),{})
            postmodal.toggle()
}
        




