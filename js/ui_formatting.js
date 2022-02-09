
// resizes the message so that they don't overlap. also fixes the height parameter.
function resize_message(message_div){

    try{
        lowest_message = find_prev_message(message_div)
        lowest_message_loc = parseInt(lowest_message.style.top, 10)
        last_message_data_row = lowest_message.getAttribute("data-row")
        lowest_message_height = parseInt(lowest_message.style.height, 10)
    } catch(e){
        lowest_message_loc = 256-57
        last_message_data_row = "0"
        lowest_message_height = 57

        // console.log("exceptions")
    }
    

    new_data_row = "" + ( parseInt(last_message_data_row, 10) + 1 )
    message_div.setAttribute("data-row", new_data_row)

    try{
        message_height_offset = 9
        message_div_height = message_div.getElementsByClassName("module-message__container-outer")[0].clientHeight + message_height_offset    

    } catch (e){
        message_height_offset = 30 // this was 41, I think it looks better with 30.
        message_div_height = message_div.getElementsByClassName("module-inline-notification-wrapper")[0].clientHeight + message_height_offset
      
    }

  
    message_div.style.height = message_div_height + "px"
    message_div.style.top = (lowest_message_loc + lowest_message_height ) + "px"


}

function adjust_position_incoming_to_ougoing(message_div) {
    let prev = find_prev_message(message_div)
    let current_top = parseInt(prev.style.top, 10)
    let current_class = curr_message.children[0].className
    let previous_class = prev.children[0].className

    // console.log(current_class, previous_class)

    if (current_class == "module-message module-message--outgoing"  && previous_class == "module-message module-message--incoming" || current_class == "module-message module-message--incoming" && previous_class == "module-message module-message--outgoing") {
        // console.log("dissimilar classmessage to message")

        
    }
}

function adjust_position(message_div){
    lowest_message = find_prev_message(message_div)
    try {
        lowest_message_loc = parseInt(lowest_message.style.top, 10)
    } catch (TypeError) {
        lowest_message_loc = 64
        lowest_message_style_height = 180
    }

    curr_message = message_div
    let current_class = curr_message.children[0].className
    let previous_class = 0 

    try {
        previous_class = lowest_message.children[0].className
    } catch (error) {
        previous_class = "module-inline-notification-wrapper"
    }




    // console.log(current_class + " -- " + previous_class)

    var adjustment = 0

    // message to message
    if (current_class == previous_class && current_class != "module-inline-notification-wrapper") {
        // console.log('message to message')
        //message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10) - 7) + "px"
        adjustment = -7
    }
    // message to notification
    else if (current_class == 'module-inline-notification-wrapper' && previous_class.includes('module-message module-message') ) {
        // console.log('message to notification')
        //message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10) + 20) + "px" // this use to be:   height, 10) + 20) + "px" 
        adjustment = 20
    }
    // notification to notification
    else if (current_class == previous_class && current_class == "module-inline-notification-wrapper") {
        // console.log('notification to notification')
        adjustment = -20
    }
    else {
        // console.log('OTHER')
        //message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10)) + "px"
        adjustment = 10
    }


    try {
        message_div.style.top = (lowest_message_loc + parseInt(lowest_message.style.height, 10) + adjustment) + "px"
    } catch (error) {
        message_div.style.top = (lowest_message_loc + parseInt(lowest_message_style_height, 10) + adjustment) + "px"
    }
    

}


function adjust_position_all_messages(){
    all_messages = document.getElementsByClassName("module-timeline__message-container")
    for(message of all_messages){
        try{
            // console.log("curr being adjusted", message)
            adjust_position(message)
            // console.log("DONE")
        } catch(e){ 
            // console.log(e) 
        }
    }
    resize_message_container()
}



function resize_message_container(){
    outer_container = document.getElementById("where_all_the_messages_go")

    message_div = find_prev_message(null)

    new_height = ( parseInt(message_div.style.top, 10) + parseInt(message_div.style.height, 10) ) 
    new_height_offset =   10 // parseInt(outer_container.style.height, 10) - lowest_message_loc - parseInt(lowest_message.style.height)

    outer_container.style.height = (new_height + new_height_offset)  + "px"
    outer_container.style.setProperty("max-height", outer_container.style.height)
}


// gets message prior to the one given. If given sometihng we don't have yet, return the last message.
function find_prev_message(message_div){
    all_messages = document.getElementsByClassName("module-timeline__message-container")

    prev_message = 0
    for(message of all_messages){
        if( message_div && message.id === message_div.id ){
            return(prev_message)
        }
        prev_message = message
    }

    return prev_message
}

// gets message after to the one given. If given sometihng we don't have yet, return 0
function find_next_message(message_div){
    all_messages = document.getElementsByClassName("module-timeline__message-container")

    let prev_message;
    let this_one_flag = false;
    for(message of all_messages){
        if( message_div && message.id === message_div.id || this_one_flag){
            if (this_one_flag) {
                return message
            }
            this_one_flag = true;

        }
        prev_message = message
    }

    return 0
}

function delete_message(message){
    try {
        // this is a message
        document.getElementById(message.id).remove()
    }
    catch (e) {
        // // this is a system message
        // // check if you've created a message-to-message situation
        // console.log("SYSTEM MESSAGE")
        // let curr = message.parentElement.parentElement
        // let prev = find_prev_message(curr)
        // let next = find_next_message(curr)
        // console.log(prev, next)

        // let previous_message_row = message.parentElement.parentElement.getAttribute('data-row')-1
        // let next_message_row = message.parentElement.parentElement.getAttribute('data-row')+1
        // let prev = document.querySelector('[data-row=' + '"' + previous_message_row + '"' + ']');
        // let next = document.querySelector('[data-row=' + '"' + next_message_row + '"' + ']');
        // console.log(prev, next)
        // console.log("previous message", message.parentElement.parentElement.getAttribute('data-row')-1)
        document.getElementById(message.parentElement.parentElement.id).remove()
    }
    
}


function generate_id(){
    rand_vals = new Uint32Array(4)
    window.crypto.getRandomValues(rand_vals)
    new_id=""
    for(val of rand_vals){
        new_id += val.toString(16)
    }

    return new_id

}



function add_message(text_to_add, secondary_text="41m", do_scroll=false){
    outer_container = document.getElementById("where_all_the_messages_go")

    message_inners_outgoing = `<div class="module-message module-message--outgoing" tabindex="0" role="button"><div class="module-message__buttons module-message__buttons--outgoing"><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--outgoing"></div></div></div><div class="module-message__container-outer"><div class="module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"><div dir="auto" class="module-message__text module-message__text--outgoing"><span contenteditable="">That sure sounds like a big&nbsp;plan</span></div><div class="module-message__metadata module-message__metadata--outgoing"><span class="module-message__metadata__date module-message__metadata__date--outgoing" title="Thu, Sep 16, 2021 10:28 PM"><span contenteditable>39m</span></span><span contenteditable><div class="module-expire-timer module-expire-timer--20 module-expire-timer--outgoing"></div></span><span contenteditable><div class="module-message__metadata__status-icon module-message__metadata__status-icon--read"></div></span></div></div></div></div>`
    
    
    message_inners_incoming = `<div class="module-message module-message--incoming" tabindex="0" role="button"><div class="module-message__container-outer"><div class="module-message__container module-message__container--incoming" style="border-radius: 16px 16px 16px 16px"><div dir="auto" class="module-message__text module-message__text--incoming"><span contenteditable="">Everyone likes&nbsp;pizza</span></div><div class="module-message__metadata module-message__metadata--incoming"><span class="module-message__metadata__date module-message__metadata__date--incoming" title="Thu, Sep 16, 2021 10:26 PM"><span contenteditable>41m</span></span><span contenteditable><div class="module-expire-timer module-expire-timer--20 module-expire-timer--incoming"></div></span></div></div></div><div class="module-message__buttons module-message__buttons--incoming"><div class="react-contextmenu-wrapper"><div role="button" aria-label="More actions" class="module-message__buttons__menu module-message__buttons__download--incoming"></div></div></div></div>`


    message_inners_notification_missed_audio_call = `<div class="module-inline-notification-wrapper" tabindex="0"><div class="SystemMessage SystemMessage--error"><div class="SystemMessage__contents SystemMessage__contents--icon-audio-missed"><span contenteditable></span><span contenteditable>Missed audio call · </span><span class="module-timestamp module-timestamp--outgoing" title="Thu, Sep 16, 2021 10:31 PM"><span contenteditable>37m</span></span> <span ><img class="notification_trash" src="images/icons/v2/trash-outline-24.svg"></span> </div></div></div>`
    message_inners_notification_outgoing_audio_call = `<div class="module-inline-notification-wrapper" tabindex="0"><div class="SystemMessage"><div class="SystemMessage__contents SystemMessage__contents--icon-audio-outgoing"><span contenteditable=""></span><span contenteditable>You called Arden · </span><span class="module-timestamp module-timestamp--incoming" title="Thu, Sep 16, 2021 10:20 PM"><span contenteditable="">Sep 27 9:58 PM</span></span> <span ><img class="notification_trash" src="images/icons/v2/trash-outline-24.svg"></span>  </div></div></div>`
    message_inners_notification_incoming_audio_call = `<div class="module-inline-notification-wrapper" tabindex="0"><div class="SystemMessage"><div class="SystemMessage__contents SystemMessage__contents--icon-audio-incoming"><span contenteditable=""></span><span contenteditable>Arden called you ·  </span><span class="module-timestamp module-timestamp--outgoing" title="Thu, Sep 16, 2021 10:20 PM"><span contenteditable="">Sep 27 9:58 PM</span></span>  <span ><img class="notification_trash" src="images/icons/v2/trash-outline-24.svg"></span>  </div></div></div>`
    message_inners_notification_unanswered_audio_call = `<div class="module-inline-notification-wrapper" tabindex="0"><div class="SystemMessage"><div class="SystemMessage__contents SystemMessage__contents--icon-audio-missed"><span contenteditable=""></span><span contenteditable>Unanswered audio call · </span><span class="module-timestamp module-timestamp--outgoing" title="Thu, Sep 16, 2021 3:34 PM"><span contenteditable="">7h</span></span>  <span ><img class="notification_trash" src="images/icons/v2/trash-outline-24.svg"></span>  </div></div></div>`
    

    // message_inners_notification_disappearing_message = `

    //     <div class="module-inline-notification-wrapper" tabindex="0">
    //        <div class="SystemMessage">
    //           <div class="SystemMessage__contents SystemMessage__contents--icon-timer">
    //             <span contenteditable>You set the disappearing message time to 5 minutes.</span>  
    //             <span><img class="notification_trash" src="images/icons/v2/trash-outline-24.svg"></span> 
    //           </div>
    //        </div>
    //     </div>
    // `

    all_messages = document.getElementsByClassName("module-timeline__message-container")


    // new message creation
    let message_div = document.createElement('div');
    new_id = generate_id()
    message_div.setAttribute("id", new_id)
    //message_div.setAttribute("contenteditable", true)
    message_div.setAttribute("class", "module-timeline__message-container" )
    message_div.setAttribute("role", "row" )



    // if prev message is same sender, then edit border property
    let message_identifier_incoming = "module-message__container module-message__container--incoming"
    let message_identifier_outgoing = "module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"
    let prev_message = find_prev_message(message_div)

    // if incoming message, use HTML properties from incoming
    if ($("#popupSelect").val() == 'Incoming') {
        message_div.setAttribute("style", "height: 64px; left: 0px; position: absolute; top: 1779px; width: 446px;")
        message_div.innerHTML = message_inners_incoming
        if (prev_message.innerHTML.includes(message_identifier_incoming)) {
            var editable_div_previous = prev_message.getElementsByClassName(message_identifier_incoming)[0]
            var editable_div_current = message_div.getElementsByClassName(message_identifier_incoming)[0]
            editable_div_previous.style.cssText += 'border-bottom-left-radius: 5px';
            editable_div_current.setAttribute("style", "border-top-left-radius: 5px")
        }
    // if outgoing message, use HTML properties from outgoing
    } 
    if ($("#popupSelect").val() == 'Outgoing') {
        message_div.setAttribute("style", "height: 64px; left: 0px; position: absolute; top: 1779px; width: 446px;")
        message_div.innerHTML = message_inners_outgoing
        if (prev_message.innerHTML.includes(message_identifier_outgoing)) {
            // console.log(prev_message.getElementsByClassName(message_identifier_outgoing)[0])
            var editable_div_previous = prev_message.getElementsByClassName(message_identifier_outgoing)[0]
            var editable_div_current = message_div.getElementsByClassName(message_identifier_outgoing)[0]
            editable_div_previous.style.cssText += 'border-bottom-right-radius: 5px';
            editable_div_current.setAttribute("style", "border-top-right-radius: 5px")
        }
    }
    if ($("#popupSelect").val() == 'Missed_Audio_Call') {
        message_div.setAttribute("style", "height: 57px; left: 0px; position: absolute; top: 2028px; width: 446px;")
        message_div.innerHTML = message_inners_notification_missed_audio_call
    }
    if ($("#popupSelect").val() == 'Outgoing_Audio_Call') {
        message_div.setAttribute("style", "height: 57px; left: 0px; position: absolute; top: 2028px; width: 446px;")
        message_div.innerHTML = message_inners_notification_outgoing_audio_call
    }
    if ($("#popupSelect").val() == 'Incoming_Audio_Call') {
        message_div.innerHTML = message_inners_notification_incoming_audio_call
        message_div.setAttribute("style", "height: 57px; left: 0px; position: absolute; top: 2028px; width: 446px;")
    }
    if ($("#popupSelect").val() == 'Unanswered_Audio_Call') {
        message_div.innerHTML = message_inners_notification_unanswered_audio_call
        message_div.setAttribute("style", "height: 57px; left: 0px; position: absolute; top: 2028px; width: 446px;")
    }

    if ($("#popupSelect").val() == 'Disappearing_Message') {
        message_div.innerHTML = message_inners_notification_disappearing_message
        message_div.setAttribute("style", "height: 57px; left: 0px; position: absolute; top: 2028px; width: 446px;")
    }


    text_displayed = message_div.getElementsByTagName("span")[0]
    // console.log(text_displayed)
    text_displayed.innerHTML = text_to_add

    outer_container.appendChild(message_div)

    for(span of message_div.getElementsByTagName("span")){
        span.addEventListener("keyup", resize_listener)
    }

    if ($("#popupSelect").val() == 'Incoming') {
        message_div.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--incoming")[0].addEventListener('click', deleteButtonListener)
    }
    if ($("#popupSelect").val() == 'Outgoing') {
        message_div.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--outgoing")[0].addEventListener('click', deleteButtonListener)
    }

    if ($("#popupSelect").val() == 'Missed_Audio_Call' || $("#popupSelect").val() == 'Outgoing_Audio_Call' || $("#popupSelect").val() == 'Incoming_Audio_Call'  || $("#popupSelect").val() == 'Unanswered_Audio_Call' || $("#popupSelect").val() == 'Disappearing_Message') {
        message_div.getElementsByClassName("notification_trash")[0].addEventListener('click', deleteNotfButtonListener);
    }


    resize_message(message_div)
    resize_message_container()
    adjust_position_all_messages()
    // console.log("this is do_scroll", do_scroll)
    if (do_scroll) {
        // console.log("scroll engaged")
        message_div.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
    


}

function resize_listener(event){

    all_messages = document.getElementsByClassName("module-timeline__message-container")

    found = false
    for(message of all_messages){
        if(message.contains(event.currentTarget)){
            resize_message(message)
            found=true
        } else if(found){
            adjust_position(message)
        }
    }
    resize_message_container()
    adjust_position_all_messages()
}

var observer = ""


function deleteButtonListener(event){
    message_to_del = event.currentTarget.parentElement.parentElement.parentElement.parentElement
    // console.log(message_to_del.id)


    //// if no subsequent message, unround bottom right/left corner
    //// if no previous message, unround top right/left corner
    // if prev message is same sender, then edit border property
    let message_identifier_incoming = "module-message__container module-message__container--incoming"
    let message_identifier_outgoing = "module-message__container module-message__container--outgoing module-message__container--outgoing-ultramarine"
    let prev_message = find_prev_message(message_to_del)
    let subsequent_message = find_next_message(message_to_del)

    let prev_match_incoming = prev_message.innerHTML.includes(message_identifier_incoming)
    let curr_match_incoming = message_to_del.innerHTML.includes(message_identifier_incoming)
    let prev_match_outgoing = prev_message.innerHTML.includes(message_identifier_outgoing)
    let curr_match_outgoing = message_to_del.innerHTML.includes(message_identifier_outgoing)

        
    // console.log("prev is incoming " + prev_message.innerHTML.includes(message_identifier_incoming))
    // console.log("current is incoming " + message_to_del.innerHTML.includes(message_identifier_incoming))
    // console.log("subsequent is " + subsequent_message)
    // if (subsequent_message != 0) {
    //     console.log("subsequent is incoming " + subsequent_message.innerHTML.includes(message_identifier_incoming))
    // }

    // prev T, current T, sub F -- unround previous
    // prev T, current T, sub 0 -- unround previous 
    // prev F, current T, sub T -- unround sub 

    if (message_to_del.innerHTML.includes(message_identifier_incoming)) {

        if (subsequent_message == 0 && !prev_match_incoming) {
            // console.log("passing, this is solo delete")
        }
        else if (!prev_match_incoming && !subsequent_message.innerHTML.includes(message_identifier_incoming)) {
            // console.log("passing, this is solo delete")
            // check if other user is now chain
            if (prev_match_outgoing && subsequent_message.innerHTML.includes(message_identifier_outgoing)) {
                // console.log("--to edit here")
                var editable_div_prev = prev_message.getElementsByClassName(message_identifier_outgoing)[0]
                var editable_div_sub = subsequent_message.getElementsByClassName(message_identifier_outgoing)[0]
                editable_div_prev.style.cssText += 'border-bottom-right-radius: 5px';
                editable_div_sub.style.cssText += 'border-top-right-radius: 5px';
            }
        } else {

            if (prev_match_incoming && curr_match_incoming) {
                if (subsequent_message == 0) {
                    // unround prev
                    // console.log("unreound prev")
                    var editable_div_prev = prev_message.getElementsByClassName(message_identifier_incoming)[0]
                    editable_div_prev.style.cssText += 'border-bottom-left-radius: 16px';
                } else {
                    if (subsequent_message.innerHTML.includes(message_identifier_incoming) == false) {
                        //unround prev
                        // console.log("unreound prev")
                        var editable_div_prev = prev_message.getElementsByClassName(message_identifier_incoming)[0]
                        editable_div_prev.style.cssText += 'border-bottom-left-radius: 16px';
                    }
                }
            }
            if (!prev_match_incoming && curr_match_incoming) {
                if (subsequent_message != 0) {
                    // unround sub
                    // console.log("unreound sub")
                    var editable_div_prev = subsequent_message.getElementsByClassName(message_identifier_incoming)[0]
                    editable_div_prev.style.cssText += 'border-top-left-radius: 16px';
                }
            }
        }
    } else {

        if (subsequent_message == 0 && !prev_match_outgoing) {
            // console.log("passing, this is solo delete")
        }
        else if (!prev_match_outgoing && !subsequent_message.innerHTML.includes(message_identifier_outgoing)) {
            // console.log("passing, this is solo delete")
            if (prev_match_incoming && subsequent_message.innerHTML.includes(message_identifier_incoming)) {
                // console.log("--to edit here")
                var editable_div_prev = prev_message.getElementsByClassName(message_identifier_incoming)[0]
                var editable_div_sub = subsequent_message.getElementsByClassName(message_identifier_incoming)[0]
                editable_div_prev.style.cssText += 'border-bottom-left-radius: 5px';
                editable_div_sub.style.cssText += 'border-top-left-radius: 5px';
            }
        } else {
            if (prev_match_outgoing && curr_match_outgoing) {
                if (subsequent_message == 0) {
                    // unround prev
                    // console.log("unreound prev")
                    var editable_div_prev = prev_message.getElementsByClassName(message_identifier_outgoing)[0]
                    editable_div_prev.style.cssText += 'border-bottom-right-radius: 16px';
                } else {
                    if (subsequent_message.innerHTML.includes(message_identifier_outgoing) == false) {
                        //unround prev
                        // console.log("unreound prev")
                        var editable_div_prev = prev_message.getElementsByClassName(message_identifier_outgoing)[0]
                        editable_div_prev.style.cssText += 'border-bottom-right-radius: 16px';
                    }
                }
            }
            if (!prev_match_outgoing && curr_match_outgoing) {
                if (subsequent_message != 0) {
                    // console.log('unround sub')
                    var editable_div_prev = subsequent_message.getElementsByClassName(message_identifier_outgoing)[0]
                    editable_div_prev.style.cssText += 'border-top-right-radius: 16px';
                }
            }
        }
    }

    delete_message(message_to_del)
    adjust_position_all_messages()
}


function deleteNotfButtonListener(event){
    message_to_del = event.currentTarget.parentElement.parentElement.parentElement
    // console.log(message_to_del.id)

    delete_message(message_to_del)
    adjust_position_all_messages()

}


function downloadScreenShot(){
    alert("This feature is currently disabled for the study.");
}


function addConversation(){
    $("#popupSelect").val("Incoming");
    add_message("As long as you keep paying like you did last time I'll keep signing whatever you want", "21m");

    $("#popupSelect").val("Missed_Audio_Call");
    add_message("", "Sep 27 10:34 PM");

    $("#popupSelect").val("Outgoing");
    add_message("Do you like pizza", "41m");

    $("#popupSelect").val("Incoming");
    add_message("Everyone likes pizza", "41m");
    add_message("This is me Arden Fowler", "41m");

    $("#popupSelect").val("Outgoing");
    add_message("Hi", "41m");

    $("#popupSelect").val("Incoming");
    add_message("Once I win the reelection I'm taking a trip to the moon on a spaceship", "40m");
    add_message("I plan to vacation on the moon for one maybe two months and then return 🚀", "40m");

    $("#popupSelect").val("Outgoing");
    add_message("That sure sounds like a big plan", "39m");
    add_message("What will you do up there", "39m");

    $("#popupSelect").val("Incoming");
    add_message("Space walk", "39m");

}





$(function(){

    text_box = document.getElementsByClassName("ql-editor ql-blank ql-editor--loaded")[0]
    icon = document.getElementsByClassName('module-sticker-button__button')[0]
    text_box.addEventListener('focusin', (event) => {
        text_box.setAttribute("data-placeholder", "")
        // text_box.setAttribute("style", "float: left")
        icon.setAttribute("style", "display:none")
    });


    text_box.addEventListener('keydown', (event) => {
        if ((event.which == 13 || event.keyCode == 13) && !event.shiftKey){
            event.preventDefault();
        }
    });


    text_box.addEventListener('keyup', (event) => {
        if ((event.which == 13 || event.keyCode == 13) && !event.shiftKey){
            add_message(text_box.innerText, secondary_text="41m", do_scroll=true)
            text_box.innerHTML = ""
        }
    });

    //text_box.addEventListener('keyup', (event) => {

    //    if (event.which == 13 || event.keyCode == 13){
    //        text_box.innerHTML = ""
    //    }
    //});

    text_box.addEventListener('focusout', (event) => {
        if(text_box.innerHTML == "" || text_box.innerHTML == "<br>" || text_box.innerHTML == '<div dir="auto"><br></div>'){
            text_box.setAttribute("data-placeholder", "New Message")
            icon.setAttribute("style", "margin-right:7em; display:")
        }
    });

    // these are the message resizers. 
    $("span").on("keyup", resize_listener);

    delete_btns = document.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--outgoing")
    for(delete_b of delete_btns){
        delete_b.addEventListener('click', deleteButtonListener);
    }
    delete_btns = document.getElementsByClassName("module-message__buttons__menu module-message__buttons__download--incoming")
    for(delete_b of delete_btns){
        delete_b.addEventListener('click', deleteButtonListener);
    }


    notf_delete_btns = document.getElementsByClassName("notification_trash");
    for(delete_b of notf_delete_btns){
        // console.log(delete_b);
        delete_b.addEventListener('click', deleteNotfButtonListener);
    }


    addConversation()

});





