let ajaxRequestVariable;

(function($) {
    // Owl-carousel-icons2
    if($('.owl-carousel-icons2').length > 0){
        var owl = $('.owl-carousel-icons2');
        owl.owlCarousel({
            loop: false,
            rewind: false,
            margin: 0,
            animateIn: 'fadeInDowm',
            animateOut: 'fadeOutDown',
            autoplay: false,
            autoplayTimeout: 5000, // set value to change speed
            autoplayHoverPause: true,
            dots: false,
            nav: false,
            autoplay: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1300: {
                    items: 2,
                    nav: false
                }
            }
        })
    }
    
    //Init the carousel
    if($(".story-slider").length > 0){
        $(".story-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            onInitialized: startProgressBar,
            onTranslate: resetProgressBar,
            onTranslated: startProgressBar
        });
    }
    
    function startProgressBar() {
        // apply keyframe animation
        $(".slide-progress").css({
            width: "100%",
            transition: "width 10000ms"
        });
    }

    function resetProgressBar() {
        $(".slide-progress").css({
            width: 0,
            transition: "width 0s"
        });
    }

    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem) {
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

})(jQuery);


var md = new MobileDetect(window.navigator.userAgent);


function doOpen(e) {
    document.getElementById('filechose_button').value = null
    if (e.target.id != 'filechose_button') {
        document.getElementById('filechose_button').click()
    }
}

function adminCreateStory(path,user_id){
    $.ajax({
        url:'/save-route',
        type:'post',
        data:{path:path},
        success:(res) => {
            $.ajax({
                url     : `/admin-create-story-submit/${user_id}`,
                type    : 'post',
                data    : {name:'sds'},
                success : function(res){
                    window.location.href = `/admin-create-story/${res.user_id}/${res.id}`
                }
            })
        }
    })
}

function adminOnUploadPage(elem,story_id,user_id) {
    var file            = elem.files[0];
    var fileType        = elem.files[0].name.split('.')[elem.files[0].name.split('.').length-1]
    const allowedTypes  = ['jpg','jpeg','png','mp4']
    if(!allowedTypes.includes(fileType)){
        toastr.error('Only jpg, jpeg, png and mp4 is allowed');
        return;
    }
    var kb = file.size/1024;
    var mb = kb/1024;

    if(mb > 30){
        toastr.error("You can't upload file greater then 30 mb");
        return;
    }

    let formData = new FormData();
    formData.append('story_id',story_id)
    formData.append('user_id',user_id)
    formData.append('story_file',file)

    var loader = `<div class="file-upload active" id="page-loader">
                    <div class="file-select file-select-box">
                        <div class="file-upload-custom-btn text-center" style="text-align: center;">
                            <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
                    </div>
                </div>`;

    $('#new-box #uploadBox').before(loader);
    
    if(ajaxRequestVariable !== undefined && ajaxRequestVariable.readyState > 0 && ajaxRequestVariable.readyState < 4){
        ajaxRequestVariable.abort();
    }

    ajaxRequestVariable = $.ajax({
                                url         : '/save-story-page',
                                type        : 'post',
                                data        : formData,
                                async       : false,
                                processData : false,
                                contentType : false,
                                success : function(res){
                                    if(res.data && res.data['id']){
                                        $("#page-loader").remove()
                                    }
                                    if(res.error){
                                        toastr.error(res.error);
                                        $("#page-loader").remove()
                                        return;
                                    }
                                    let data = res.data
                                    var loader = `<div class="file-upload active" id="page-`+data.id+`">
                                            <div class="file-select file-select-box">
                                                <div class="file-upload-custom-btn text-center" style="text-align: center;">
                                                    <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
                                            </div>
                                        </div>`;

                                    $('#new-box #uploadBox').before(loader);
                                }
                            })
}

function createStory(path){
    $.ajax({
        url:'/save-route',
        type:'post',
        data:{path:path},
        success:(res) => {
            $.ajax({
                url     : '/create-story-submit',
                type    : 'post',
                data    : {name:'sds'},
                success : function(res){
                    window.location.href = '/create-story/'+res.id
                }
            })
        }
    })
}

function onUploadPage(elem,story_id) {
    var file            = elem.files[0];
    var fileType        = elem.files[0].name.split('.')[elem.files[0].name.split('.').length-1]
    const allowedTypes  = ['jpg','jpeg','png','mp4']
    if(!allowedTypes.includes(fileType)){
        toastr.error('Only jpg, jpeg, png and mp4 is allowed');
        return;
    }
    var kb = file.size/1024;
    var mb = kb/1024;

    if(mb > 30){
        toastr.error("You can't upload file greater then 30 mb");
        return;
    }

    let formData = new FormData();
    formData.append('story_id',story_id)
    formData.append('story_file',file)

    var loader = `<div class="file-upload active" id="page-loader">
                    <div class="file-select file-select-box">
                        <div class="file-upload-custom-btn text-center" style="text-align: center;">
                            <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
                    </div>
                </div>`;

    $('#new-box #uploadBox').before(loader);
    
    if(ajaxRequestVariable !== undefined && ajaxRequestVariable.readyState > 0 && ajaxRequestVariable.readyState < 4){
        ajaxRequestVariable.abort();
    }

    ajaxRequestVariable = $.ajax({
                                url         : '/save-story-page',
                                type        : 'post',
                                data        : formData,
                                async       : false,
                                processData : false,
                                contentType : false,
                                success : function(res){
                                    if(res.data && res.data['id']){
                                        $("#page-loader").remove()
                                    }
                                    if(res.error){
                                        toastr.error(res.error);
                                        $("#page-loader").remove()
                                        return;
                                    }
                                    let data = res.data
                                    var loader = `<div class="file-upload active" id="page-`+data.id+`">
                                            <div class="file-select file-select-box">
                                                <div class="file-upload-custom-btn text-center" style="text-align: center;">
                                                    <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
                                            </div>
                                        </div>`;

                                    $('#new-box #uploadBox').before(loader);
                                }
                            })
}

function onUploadStoryCover(elem,story_id){

    const user_id       = story_user_id
    const file          = elem.files[0]
    var fileType        = elem.files[0].name.split('.')[elem.files[0].name.split('.').length-1]
    const allowedTypes  = ['jpg','jpeg','png']
    if(!allowedTypes.includes(fileType)){
        toastr.error('Only jpg, jpeg, svg and png allowed');
        return;
    }

    var kb = file.size/1024;
    var mb = kb/1024;
    if(mb > 2){
        toastr.error("You can't upload file greater then 2 mb");
        return;
    }

    var formData = new FormData();
    formData.append('story_cover',file)
    formData.append('story_id',story_id)
    formData.append('user_id',story_user_id)

    $.ajax({
        url         : '/save-story-cover-pic',
        type        : 'post',
        data        : formData,
        async       : false,
        processData : false,
        contentType : false,
        success     : function(res){
            $(elem).parent().find('.imagePreview').css(`background-image`,`url(${res.file})`)
            $(elem).parent().find('.file-upload-custom-btn p').text('')
        }
    })
}

if($('input[name="dates"]').length > 0){
    $('input[name="dates"]').daterangepicker({
        timePicker  : true,
        minDate     : moment(),
        locale      : {format: 'MMMM D YYYY, h:mm a',}
    });

    $('input[name="dates"]').on('hide.daterangepicker', function(ev, picker) {
        updateStoryDate(picker.startDate.format('DD, MMM YYYY, h:mma') , picker.endDate.format('DD, MMM YYYY, h:mma'))
    });
}

function getMessageUsers(elem,page_id){
    elem = elem || ''
    $('#msg_history').html('')
    $('#messageheader').html('')
    $('#inbox_chat').html('')
    if(elem){
        $('.mobile-scroll tr').removeClass('selected-story-page-option')
        $(elem).closest('tr').addClass('selected-story-page-option')
    }

    if(md.mobile() || md.phone() || md.tablet()){
        $("#mobileChatUsers").addClass('d-none')
        $("#mobileChatMessages").removeClass('d-none')
    }
    
    $.ajax({
        type    : 'get',
        url     : '/get-message-users/'+page_id,
        success : function(res){
            let data = res.data
            console.log(data)
            if(data.length > 0){
                var html = ''
                data.forEach((value,index)=>{
                    html  += `<div id="sent-message-${value.id}" onclick="getUserMessages('${value.id}','${page_id}','${value.phone_number}','${value.email}','${value.name}')" class="chat_list inbox_message sent-message">
                                    <div class="chat_people">
                                        <div class="chat_img">
                                        </div>
                                        <div class="chat_id">
                                            <h5>
                                                ${value.name} 
                                            </h5>

                                            <h5>
                                                ${value.phone_number} 
                                            </h5>

                                            <h6>
                                                ${value.email} 
                                            </h6>

                                        </div>
                                    </div>
                                </div>`
                })
                $('#inbox_chat').html(html)
                $('#messages').modal('show')
            }else{
                $('#nomessages').modal('show')
            }
        }
    })
}

function toggleMobileChatUsers(){
    if(md.mobile() || md.phone() || md.tablet()){
        $("#mobileChatUsers").removeClass('d-none')
        $("#mobileChatMessages").addClass('d-none')
        $('#mobileChatUsers .mobile-scroll tr').removeClass('selected-story-page-option')
    }
}

//<span class="add-title">${phone_number}</span>
function getUserMessages(user_id,page_id,phone_number,email,name){
    $.ajax({
        type    : 'get',
        url     : '/get-user-messages/'+user_id+'/'+page_id,
        success : function(res){
            $(`.sent-message`).removeClass('selected-user-option')
            $(`#sent-message-${user_id}`).addClass('selected-user-option')
            $("#messageheader").html(`
            <div>
                <h6>${name}</h6>
            </div> 
            <div>
                <h6>${phone_number}</h6>
            </div>
            <div>
                <h6>${email}</h6>
            </div>`)
            
            let data = res.data
            let html = '';
            data.forEach((value,index)=>{
                html  += `<div class="outgoing_msg">
                                <div class="chat_img">
                                </div>
                                <div class="sent_msg">
                                    <p>${value.message}</p>
                                    <span class="time_date">${value.start_date}</span>
                                </div>
                            </div>`
            })
            
            $('#msg_history').html(html)
        }
    })
}

function getStoryAnalytics(id){
    window.location.href = '/analytics/'+id
}

function getStoryData(id){
    window.location.href = '/messages/'+id
}

function saveEvent(){
    localStorage.setItem("lastEvent", "titleEvent"); 
}

$(document).on('click', function(e) {
    if(window.location.href.split('/')[3] === 'create-story'){
        if(localStorage.getItem("lastEvent") == 'titleEvent'){
            $.ajax({
                type:'post',
                data:{story_title:$('#storyTitle').val(),story_id:$('#storyId').val()},
                url:'/update-story-title',
                success:function(res){
                    toastr.success(res.message);
                    localStorage.removeItem("lastEvent"); 
                }
            });
        }
    }
});

function updateStoryDate(start_date, end_date){
    $.ajax({
        type:'post',
        data:{start_date:start_date,end_date:end_date,story_id:$('#storyId').val()},
        url:'/update-story-date',
        success:function(res){
            toastr.success(res.message);
        }
    });
}

const togglePassword    = document.querySelector("#eye-open");
const password          = document.querySelector("#password");

if(togglePassword){
    togglePassword.addEventListener("click", function(){
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });
}

if(document.querySelector("#eye-open2")){
    const togglePassword2   = document.querySelector("#eye-open2");  
    const password2          = document.querySelector("#confirmPassword");
    togglePassword2.addEventListener("click", function(){
        const type = password2.getAttribute("type") === "password" ? "text" : "password";
        password2.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });
}

function playPauseVideo(id,btn_id){

    if (!document.getElementById(id).paused) {
        document.getElementById(id).pause();
    }else{
        document.getElementById(id).play();
    }
    document.getElementById(btn_id).classList.toggle('fa-play');
    document.getElementById(btn_id).classList.toggle('fa-pause');
}

function openCodeModal(story_id,appUrl){
    let script  = `&lt;script src="`+appUrl+`/stories.js?id=`+story_id+`"&gt;&lt;/script&gt;`
    let div     = `&lt;div id="pindropStoriesPreview" &gt;&lt;/div&gt;`
    var htmlAppend = ` <p>And Paste The script into your website between
                        <b style="color:#7367F0">"&lt;head&gt;...&lt;/head&gt;" </b> tags</p>
                        <div class="give-me-code mt-2 col-12">
                            ${script}
                        </div>

                        <p class="mt-2 mb-2">Paste this div into your website between
                        <b style="color:#7367F0">"&lt;body&gt;...&lt;/body&gt;" </b> tags, where you want the Pindrop Stories show up in your content.</p>
                        <div id="code_area" class="give-me-code mt-2 mb-2 col-12">
                        ${div}
                        </div>
                        `
    $('#CodeModal .modal-body').html(htmlAppend)
}

function saveRoute(path){
    $.ajax({
        url:'/save-route',
        type:'post',
        data:{path:path},
        success:function(res){
            console.log(res)
        }
    })
}

function deleteStory(path,story_id){
    if(path.includes('create-story')){
        $.ajax({
            type:'get',
            url:'/delete-story-ajax/'+story_id,
            success:function(res){
                console.log(res)
            }
        })
    }
}

function copyCode() {
    var containerid = 'code_area'
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }
}

