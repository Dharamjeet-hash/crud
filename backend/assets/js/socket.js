// var socket = io(app_url+'/');


// socket.emit('connection', "yes");

// socket.emit('user_connected', {user_id:user_id});

// socket.on('progress', function(res){
//     var data        = res.data
//     var progress    = res.progress
//     var img,video;
//     if(progress == 0){

//         img = `<div class="file-upload active" id="page-`+data.id+`">
//                     <div class="file-select file-select-box">
//                         <div class="file-upload-custom-btn text-center" style="text-align: center;">
//                             <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="" style="margin-top: 53%;"></div>
//                     </div>
//                 </div>`;

//         video = `<div class="file-upload active" id="page-`+data.id+`">
//                     <div class="file-select file-select-box">
//                         <div class="imagePreview">
//                             <img class="img-fluid" src="/app-assets/images/logo/Loading_icon.gif" alt="">
//                         </div>
//                         <div class="video-icon" style="position: absolute; height: 100%; width:100%">
//                             <i class="fa fa-video-camera text-white" style="margin-left: 5px;" aria-hidden="true"></i>
//                         </div>
//                     </div>
//                 </div>`;

//         //var final_media = data.mimetype.includes('video') ? video : img

//         if($(`#page-${data.id}`)[0]){
//             $(`#page-${data.id}`).replaceWith(img)
//         }else{
//             $('#new-box #uploadBox').before(img);
//         }
//     }

//     if(progress == 100){

//         img = `<div class="file-select file-select-box">
//                         <div class="imagePreview">
//                         <img class="img-fluid" src="`+data.story_file+`" alt="">
//                         </div> 
//                         <div class="actions-overlay">
//                             <div role="group" class="actions icons btn-group">
//                                 <button type="button" onclick="editStoryPage(`+ data.story_id +`,`+data.id+`)" data-toggle="modal" data-target="#editStory" class="btn-icon text-success btn-icon btn btn-light">
//                                     <i class="feather icon-edit-2"></i> 
//                                 </button>
//                                 <button type="button" onclick="deleteStoryPage(`+data.story_id+`,`+data.id+`,'`+data.story_file+`')" data-toggle="modal" data-target="#deleteStory" class="btn-icon text-danger btn-icon btn btn-light">
//                                     <i class="feather icon-trash-2"></i>  
//                                 </button>
//                                 <button onclick="getMessageUsers('${data.id}')" type="button" data-toggle="modal" data-target="#messages" class="text-primary btn-icon btn btn-light">
//                                     <i class="fa fa-envelope"></i>  
//                                 </button>
//                             </div>
//                         </div>
//                     </div>`

//         video = `<div class="file-select file-select-box">
//                         <div class="imagePreview">
//                             <video id="video-`+data.id+`" class="img-fluid" src="` + data.story_file + `" autoplay></video>
//                         </div> 

//                         <div class="video-icon" style="position: absolute; height: 100%; width:100%; margin-left:5px">
//                             <i class="fa fa-video-camera text-white" aria-hidden="true"></i>
//                         </div>

//                         <div class="actions-overlay">
//                             <div role="group" class="actions icons btn-group">
//                                 <button type="button" onclick="editStoryPage(`+ data.story_id +`,`+data.id+`)" data-toggle="modal" data-target="#editStory" class="btn-icon text-success btn-icon btn btn-light">
//                                     <i class="feather icon-edit-2"></i> 
//                                 </button>

//                                 <button class="btn btn-icon btn-light" onclick="playPauseVideo('video-`+data.id+`','btn-`+data.id+`')">
//                                     <i id="btn-`+data.id+`" class="fa fa-pause" aria-hidden="true"></i>
//                                 </button>

//                                 <button type="button" onclick="deleteStoryPage(`+data.story_id+`,`+data.id+`,'`+data.story_file+`')" data-toggle="modal" data-target="#deleteStory" class="btn-icon text-danger btn-icon btn btn-light">
//                                     <i class="feather icon-trash-2"></i>  
//                                 </button>

//                                 <button onclick="getMessageUsers('${data.id}')" type="button" data-toggle="modal" data-target="#messages" class="text-primary btn-icon btn btn-light">
//                                     <i class="fa fa-envelope"></i>  
//                                 </button>
//                             </div>
//                         </div>
//                     </div>`
        

//         var final_media = data.mimetype.includes('video') ? video : img

//         $("#page-"+data.id).html(final_media);
//         $( 'iframe' ).attr( 'src', function ( i, val ) { return val; });
//     }
// });