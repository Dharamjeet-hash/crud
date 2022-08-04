var mainContainer,container, imgs_wrapper,imgs,bars,centralArea,total_imgs;
const isMobile          = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let current_index       = 0;
let pointer_is_down     = false;
let [start_x, end_x]    = [0, 0];
let move_distance       = 0;
let timersSet           = [];
let dataSet             = [];
let timer;


//var socket = io({transports: ["websocket"]});

var socket = io();


socket.on("connect", () => {
    socket.emit('user_connected', {user_id:user_id});
});


socket.on('progress', function(res){
    var data        = res.data
    var progress    = res.progress
    var img,video;

    if(progress == 0){

        img = `<div class="file-upload active" id="page-`+data.id+`">
                    <div class="file-select file-select-box">
                        <div class="file-upload-custom-btn text-center" style="text-align: center;">
                            <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
                    </div>
                </div>`;

        video = `<div class="file-upload active" id="page-`+data.id+`">
                    <div class="file-select file-select-box">
                        <div class="imagePreview">
                            <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="">
                        </div>
                        <div class="video-icon" style="position: absolute; height: 100%; width:100%">
                            <i class="fa fa-video-camera text-white" style="margin-left: 5px;" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>`;

        //var final_media = data.mimetype.includes('video') ? video : img

        if($(`#page-${data.id}`)[0]){
            $(`#page-${data.id}`).replaceWith(img)
        }else{
            $('#new-box #uploadBox').before(img);
        }
    }

    if(progress == 100){

        img = `<div class="file-select file-select-box">
                        <div class="imagePreview">
                        <img class="img-fluid" src="`+data.story_file+`" alt="">
                        </div> 
                        <div class="actions-overlay">
                            <div role="group" class="actions icons btn-group">
                                <button type="button" onclick="editStoryPage(`+ data.story_id +`,`+data.id+`)" data-toggle="modal" data-target="#editStory" class="btn-icon text-success btn-icon btn btn-light">
                                    <i class="feather icon-edit-2"></i> 
                                </button>
                                <button type="button" onclick="deleteStoryPage(`+data.story_id+`,`+data.id+`,'`+data.story_file+`')" data-toggle="modal" data-target="#deleteStory" class="btn-icon text-danger btn-icon btn btn-light">
                                    <i class="feather icon-trash-2"></i>  
                                </button>
                                <button onclick="getMessageUsers('${data.id}')" type="button" data-toggle="modal" data-target="#messages" class="text-primary btn-icon btn btn-light">
                                    <i class="fa fa-envelope"></i>  
                                </button>
                            </div>
                        </div>
                    </div>`

        video = `<div class="file-select file-select-box">
                        <div class="imagePreview">
                            <video id="video-`+data.id+`" class="img-fluid" src="` + data.story_file + `" autoplay></video>
                        </div> 

                        <div class="video-icon" style="position: absolute; height: 100%; width:100%; margin-left:5px">
                            <i class="fa fa-video-camera text-white" aria-hidden="true"></i>
                        </div>

                        <div class="actions-overlay">
                            <div role="group" class="actions icons btn-group">
                                <button type="button" onclick="editStoryPage(`+ data.story_id +`,`+data.id+`)" data-toggle="modal" data-target="#editStory" class="btn-icon text-success btn-icon btn btn-light">
                                    <i class="feather icon-edit-2"></i> 
                                </button>

                                <button class="btn btn-icon btn-light" onclick="playPauseVideo('video-`+data.id+`','btn-`+data.id+`')">
                                    <i id="btn-`+data.id+`" class="fa fa-pause" aria-hidden="true"></i>
                                </button>

                                <button type="button" onclick="deleteStoryPage(`+data.story_id+`,`+data.id+`,'`+data.story_file+`')" data-toggle="modal" data-target="#deleteStory" class="btn-icon text-danger btn-icon btn btn-light">
                                    <i class="feather icon-trash-2"></i>  
                                </button>

                                <button onclick="getMessageUsers('${data.id}')" type="button" data-toggle="modal" data-target="#messages" class="text-primary btn-icon btn btn-light">
                                    <i class="fa fa-envelope"></i>  
                                </button>
                            </div>
                        </div>
                    </div>`
        

        var final_media = data.mimetype.includes('video') ? video : img

        $("#page-"+data.id).html(final_media);
        getStoryPages();
    }
});


function deleteStoryPage(story_id,page_id,path){
    $("#deleteStory").attr("data-story-id",story_id)
    $("#deleteStory").attr("data-page-id",page_id)
    $("#deleteStory").attr("data-path",path)
}

if($("#deleteStory #delete").length>0){
    $("#deleteStory #delete").click(function(){
        var story_id    = $("#deleteStory").attr("data-story-id")
        var page_id     = $("#deleteStory").attr("data-page-id")
        var path        = $("#deleteStory").attr("data-path")
    
        $.ajax({
            url:'/delete-story-page',
            type:'post',
            data:{story_id:story_id,page_id:page_id,path:path},
            success:(res) => {
                $('#page-'+res.data.page_id).remove()
                getStoryPages();
            }
        })
    })
}

function editStoryPage(story_id,page_id){
    $("#editStory form input[name='story_id']").val(story_id)
    $("#editStory form input[name='page_id']").val(page_id)

    $.ajax({
        url:'/get-story-page',
        type:'get',
        data:{story_id:story_id,page_id:page_id},
        success:function(res){
            var data = res.data;
            $("#editStory form input[name='swipe_up_text']").val(data.swipe_up_text)
            $("#editStory form input[name='swipe_up_url']").val(data.swipe_up_url)
            $("#editStory form input[name='duration']").val(data.duration)
        }
    })
    
}

if($("#editStory #save").length>0){
    $("#editStory #save").click(function(){
        $.ajax({
            url:'/update-story-page',
            type:'post',
            data:$("#editStory form").serialize(),
            success:function(res){
                getStoryPages();
                //$( 'iframe' ).attr( 'src', function ( i, val ) { return val; });
            }
        })
    })
}


// Bind Events on document ready
document.addEventListener("DOMContentLoaded", () => {
    getStoryPages()    
});

const getStoryPages = ()=>{
    $.ajax({
        type:'get',
        url:'/story-pages-preview/'+story_id,
        success:(res) => {
            $('.iframe-container').html(res)
            setTimeout(() => {
                start()
            },1000);
        }
    }) 
}

async function start(){

    mainContainer     = await document.querySelector(".daily-stories")
    container         = await document.querySelector(".daily-stories__outer");
    imgs_wrapper      = await document.querySelector(".daily-stories__container");
    imgs              = await document.querySelectorAll(".daily-stories .slide");
    bars              = await document.querySelectorAll(".progress-bars .bar");
    centralArea       = await document.querySelector(".central-area");
    total_imgs        = await imgs.length;

    if(total_imgs>0){
        init();
        collections();
        setSlideActive(0);
        setBarActive(0);
        slidesAutoPlay();
        centralAreaEvent()
        barEvent()
        if (isMobile) {
            document.body.classList.add("mobile");
        }
    }
}

function init() {
    
    container_width = $(".daily-stories").width();
    imgs_wrapper.style.width = `${container_width * total_imgs}px`;
}

function collections() {
    timersSet = []
    dataSet = []
    for (var i = 0; i < total_imgs; ++i) {
        timersSet.push(imgs[i].getAttribute("data-timeout"));

        if (imgs[i].classList.contains("video")) {
            dataSet.push(imgs[i].querySelector("video").getAttribute("src"));
        } else {
            dataSet.push(imgs[i].querySelector("img").getAttribute("src"));
        }
    }
}

function slidesAutoPlay() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (current_index < (total_imgs - 1)) {
            nextSlide();
        } else {
            nextSlide();
        }
    }, timersSet[current_index]);
}

// Mousemove and Touchmove Event
function createDraggingEffects() {
    if (document.body.classList.contains("menu-open")) return; // Disallow slides dragging if context menu is open
    const max_distance = 2;
    const scrolled_distance =
        current_index * container_width + (start_x - end_x) / max_distance;
    switchImages(-scrolled_distance);
}

// Set slide "active"
function setSlideActive(i) {
    const currentSlide = imgs[i];
    imgs.forEach((el) => el.classList.remove("active"));
    currentSlide.classList.add("active");
    playVideo();
}

// Set bar "active / animate"
function setBarActive(i) {
    bars.forEach((el, index) => {

        el.querySelector("span").style.animationDuration = el.querySelector("span").getAttribute("data-animation")

        if (index >= i) {
            el.classList.remove("animate");
        }
        
        if (index < i) {
            el.classList.add("seen");
            el.classList.remove("animate");
        } else {
            el.classList.remove("seen");
        }
    });

    bars[i].classList.add("animate");
}

// Set current slide active
function setActive() {
    if (current_index < total_imgs - 1) {
        // if ain't LAST
        setBarActive(parseInt(current_index, 10) + 1);
    } else {
        setBarActive(0);
    }

    setTimeout(() => {
        setBarActive(current_index);
        setSlideActive(current_index);
    }, 1);
}

// Mouseup and Touchend Event
function calculateFinalMoveDistance() {
    const scrolled_distance = Math.abs(start_x - end_x);
    const minimum_distance = 50;

    if (document.body.classList.contains("menu-open")) return; // Disallow slides switching if context menu is open

    if (scrolled_distance < minimum_distance && current_index !== 0) {
        move_distance = -(current_index * container_width);
        switchImages();
        return false;
    }

    stopVideo(); // Stop video on current slide if any were playing

    if ((start_x > end_x) & (current_index < total_imgs - 1)) {
        // scroll next
        current_index++;
    } else if (start_x < end_x && current_index > 0) {
        // scroll prev
        current_index--;
    } else if (current_index === 0) {
        setBarActive(1); // hack to reset animation's play state of first slide
    }

    move_distance = -(current_index * container_width);
    switchImages(move_distance);

    setActive();

    slidesAutoPlay();
}

// Switch to Next Slide
function nextSlide() {
    if (current_index < total_imgs - 1) {
        // check if it isn't LAST slide

        if (document.body.classList.contains("menu-open")) return; // Disallow slides switching if context menu is open

        document.body.classList.remove("paused"); // Un-Pause slider

        stopVideo(); // Stop video on current slide if any were playing

        current_index++;

        move_distance = -(current_index * container_width);

        switchImages(move_distance);

        setActive();

        slidesAutoPlay();
    }else{
        slideTo(0)
    }
}

// Switch to Prev Slide
function prevSlide() {
    if (current_index >= 0) {
        // check if it isn't FIRST slide

        if (document.body.classList.contains("menu-open")) return; // Disallow slides switching if context menu is open

        document.body.classList.remove("paused"); // Un-Pause slider

        stopVideo(); // Stop video on current slide if any were playing

        if (current_index > 0) {
            // decrease index only if larger than 0
            current_index--;
        }

        move_distance = -(current_index * container_width);
        switchImages(move_distance);

        setActive();

        slidesAutoPlay();
    }
}

// Switch to specific Slide
function slideTo(i) {
    if (document.body.classList.contains("menu-open")) return; // Disallow slides switching if context menu is open
    document.body.classList.remove("paused"); // Un-Pause slider
    stopVideo(); // Stop video on current slide if any were playing
    current_index = i;
    move_distance = -(current_index * container_width);
    switchImages(move_distance);
    setActive();
    slidesAutoPlay();
}

function pauseVideo() {
    if (isVideo()) {
        const v = imgs[current_index].querySelector("video");
        v.muted = true;
        v.pause();
    }
}

function playVideo() {
    if (isVideo()) {
        const v = imgs[current_index].querySelector("video");
        v.muted = true;
        v.play();
    }
}

function stopVideo() {
    if (isVideo()) {
        const v = imgs[current_index].querySelector("video");
        v.pause();
        v.currentTime = 0;
    }
}

function toggleMute() {
    if (isVideo()) {
        const v = imgs[current_index].querySelector("video");
        v.muted = !v.muted;
    }
}

function cancelAnimation() {
    clearTimeout(timer);
}

// Switch Images
function switchImages(scrolled_number) {
    const distance = scrolled_number || move_distance;
    imgs_wrapper.style.transform = `translate3d(${distance}px, 0px, 0px)`;
}

// Mouseleave event
function handleMouseLeave(e) {
    if (!pointer_is_down) return false;

    pointer_is_down = false;
    [start_x, end_x] = [0, 0];
    switchImages();
}

// Toggle Play/Pause of Carousel
function toggleSliderAutoplay(e) {
    const state = e.target.getAttribute("data-state");

    if (state === "paused") {
        centralArea.setAttribute("data-state", "playing");
        document.body.classList.remove("paused");
        setActive();
        slidesAutoPlay();
        stopVideo();
        playVideo();
    } else {
        centralArea.setAttribute("data-state", "paused");
        document.body.classList.add("paused");
        cancelAnimation();
        pauseVideo();
    }
}

// Check if Slide contains video
function isVideo() {
    if(imgs[current_index]){
        return imgs[current_index].classList.contains("video");
    }
}

// Handle Context-Menu
function CM_Handle(e) {
    e.preventDefault();

    CM_container.classList.toggle("active");

    if (CM_container.classList.contains("active")) {
        document.body.classList.add("menu-open");
        cancelAnimation();
        pauseVideo();
    } else {
        document.body.classList.remove("menu-open");
        setActive();
        slidesAutoPlay();
        stopVideo();
        playVideo();
    }
}

function copyText(element) {
    const textToCopy = element.href;
    const tempInput = document.createElement("input");

    tempInput.type = "text";
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("Copy");
    document.body.removeChild(tempInput);
}

function centralAreaEvent(){
    // Handle click on Central Area - Play/Pause animation
    centralArea.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSliderAutoplay(e);
    });
}

function barEvent(){
    // Handle Progress Bar Click
    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            slideTo(bar.getAttribute("data-index"));
        });
    });
}


