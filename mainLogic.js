    const baseurl = "https://tarmeezacademy.com/api/v1";


function setuI()

        {
        const token=localStorage.getItem("token2");

        const add_post=document.getElementById("add_post_btn");
        const logindiv=document.getElementById("login-div");
        const logoutdiv=document.getElementById("logout-div");
        if(token==null)
        {
             logoutdiv.style.setProperty("display","none","important")
            logindiv.style.setProperty("display", "block")
            if (add_post != null)
            {
                add_post.style.setProperty("display", "none", "important")
            }

        }else
        {
            logindiv.style.setProperty("display", "none", "important")
            logoutdiv.style.setProperty("display", "block")
            if (add_post != null)
            {
               add_post.style.setProperty("display", "block")

            }
            const user = getusername();
         document.getElementById("nav-username").innerHTML=user.username
         document.getElementById("profileimg").src=user.profile_image

        }
}
//////////////////////////////////////////////////////////  
//////////////////////////////////////////////////////////  
function loginbuttonclicked()
{
                toggleLoader(true)


            const username= document.getElementById("username-input").value
            const password= document.getElementById("password-input").value
            const params= {
                username: username,
                password: password
    }
            axios.post(`${baseurl}/login`,params )
                .then(function (response) {
                    // console.log(response.data);
                    localStorage.setItem("token2",response.data.token)
                    localStorage.setItem("user",JSON.stringify(response.data.user));

                    //close login modal window
                let modal=document.getElementById("login-modal")
                let modalinstance= bootstrap.Modal.getInstance(modal)
                modalinstance.hide()
              
                successlogin("welcome all in your word");
                setuI();
                showAlert("login is success","success");

                })
                .catch(function (error) {
                    console.log(error);
                    alert()
                }).finally(() => {
                     toggleLoader(false)

                })
        }
///////////////////////////////////////////////////
///////////////////////////////////////////////////
function signin_buttonclicked()
{
        toggleLoader(true)

        const name = document.getElementById("signin-name-input").value
        const username = document.getElementById("signin-username-input").value
        const password = document.getElementById("password-input").value
        const profileimage = document.getElementById("profile-image-input").files[0]
        //use form data
        let formData = new FormData();
        formData.append("name", name)
        formData.append("username", username)
        formData.append("image", profileimage)
        formData.append("password", password)

        let header = {
            "Content-Type": "multipart/form-data",
        }

        axios.post(`${baseurl}/register`,formData, {
            headers:header
        })
            .then(function (response) {
                    console.log(response.data);
                localStorage.setItem("token2", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));

                //close login modal window
                let modal = document.getElementById("signin-modal")
                let modalinstance = bootstrap.Modal.getInstance(modal)
                modalinstance.hide()

                successlogin("heeeey");
                setuI();
                showAlert("register a new user is success","success");

            })
            .catch(function (error) {

                console.log(error);
                showAlert(error.response.data.message,"danger")
            }).finally(() => {
                     toggleLoader(false)

                })
}
 ///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////// 
function logout()
            {
                localStorage.removeItem("token2");
                localStorage.removeItem("user");
                setuI();
                showAlert("logout is success","success")     
            }
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
  function successlogin(messagealert)
        {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${messagealert}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
////////////////////////////////////////////////////
////////////////////////////////////////////////////   
function getusername()
        {
            let user=""
            let storageuser=localStorage.getItem("user")

            if(storageuser!=null){
                user=JSON.parse(storageuser)

            }
            return user;
        }        
 ///////////////////////////////////////////////////
///////////////////////////////////////////////////

function showAlert(custMmessage,type)
        {
            const alertPlaceholder = document.getElementById('sucess-alert')
            const appendAlert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')

                alertPlaceholder.append(wrapper)
                
            }

            //to dos:hide alert
                    appendAlert(custMmessage,type)
                    setTimeout(() => {
                        const alert = bootstrap.Alert.getOrCreateInstance('#sucess-alert')
                          //alert.close();
                    }, 2000);

        }
   ////////////////////////////////////////////////////
////////////////////////////////////////////////////
//
   function deletepostclicked(postobj)
{
   let post=JSON.parse(decodeURIComponent(postobj))
     console.log(post)
    
     document.getElementById("delete-post-id-input").value= post.id

        let postmodal=new bootstrap.Modal(document.getElementById("delete-post-modal"),{})
        postmodal.toggle()
}
//////
function confirm_post_delete()
{
    //  alert("confirm")   
           let postID = document.getElementById("delete-post-id-input").value
                const token=localStorage.getItem("token2")

           let header = {
                "Content-Type": "multipart/form-data",
                "authorization": `Bearer ${token}`
              }
              

            axios.delete(`${baseurl}/posts/${postID}`,{
                headers:header
                })
                .then(function (response) {
                  console.log(response)

                    //close login modal window
                let modal=document.getElementById("delete-post-modal")
                let modalinstance= bootstrap.Modal.getInstance(modal)
                modalinstance.hide()
              
                successlogin("good bye");
                    showAlert("delete post is success", "success");
                    getposts();


                })
                .catch(error=> {
                    console.log(error);
                     const message= error.response.data.error_message;
                     showAlert(message, "danger") 
                }).finally(() => {
                     toggleLoader(false)

                })
}
////////////////////////////////////////////
/////////////////////////////////////

function create_new_post() {
     toggleLoader(true)
            let postID = document.getElementById("post-id-input").value
            let isCreate =postID==null || postID==""
            // alert(postID)
           


            const title = document.getElementById("post-title-input").value
            const body = document.getElementById("post-body-input").value
            const image = document.getElementById("post-image-input").files[0]
            const token=localStorage.getItem("token2")

            //use form data
            let formData= new FormData();
            formData.append("body",body)
            formData.append("title",title)
            formData.append("image",image)

            let header = {
                "Content-Type": "multipart/form-data",
                "authorization": `Bearer ${token}`
            }
                let url=``
    if (isCreate)   
        {
                url = `${baseurl}/posts`     

        }
    else {
        formData.append("_method","put")
           url = `${baseurl}/posts/${postID}`  
            
            
            }
                  axios.post(url, formData,{
                headers:header
                })
                      .then(function (response) {
                    console.log(response)
                    //close login modal window
                    let modal = document.getElementById("new-post-modal")
                    let modalinstance = bootstrap.Modal.getInstance(modal)
                    modalinstance.hide()

                    successlogin("Successfully established");
                    showAlert("create post is successed","success")
                       getposts();

                })
                .catch(function (error) {
                    console.log(error);
                    const message= error.response.data.error_message;
                     showAlert(message, "danger")   
                }).finally(() => {
                     toggleLoader(false)

                })
        
}
  

function editpostclicked(postobj)
{
        let post=JSON.parse(decodeURIComponent(postobj))
    console.log(post)
    document.getElementById("post-create-modal-btn").innerHTML="update"
    document.getElementById("post-id-input").value=post.id
    document.getElementById("post-title-input").value=post.title
    document.getElementById("post-body-input").value = post.body
    document.getElementById("post-modal-title").innerHTML="edet post"
    let postmodal=new bootstrap.Modal(document.getElementById("new-post-modal"),{})
    postmodal.toggle()

}


function profileclickuser() {
   const user= getusername()
  const userid=user.id
        window.location=`profile.html?userId=${userid}`


}
//////////////////////////////////////////
function toggleLoader(show = true)
{
    if (show)
    {
         document.getElementById("loader").style.visibility='visible'
    } else {
            document.getElementById("loader").style.visibility='hidden'

    }  
    
}