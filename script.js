/* jshint esversion: 6, browser: true */
/* globals $, window*/

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
const random_boolean = () =>{
    return Math.random() >= 0.5;
};
let game = {
    moth_counter: 0,
    moth_counter_total: 0,
    moth_multiplier: 1,
    click_multiplier: 1,
    bulb_level: 1
};
let lightess = 110;
let horizontalCenter = Math.floor(window.innerWidth/2)-100;
let verticalCener = Math.floor(window.innerHeight/2)-100;
const set_game_from_cookies = () => {
    game.moth_counter = getCookie("moth_counter") === "" ? 0 :  getCookie("moth_counter");
    game.moth_counter_total = getCookie("moth_counter_total") === "" ? game.moth_counter :  getCookie("moth_counter_total");
   //game.moth_multiplier = getCookie("moth_multiplier") === "" ? 1 :  getCookie("moth_multiplier");
};
const print_moths = () => {
    $("#wealth").html("Moths: "+game.moth_counter);
};
const change_lightness = (light_volume) => {
    let r = (light_volume/1000) * 255;
    let g = r;
    let b = (light_volume/1000) * 130;
    let light = (light_volume/1000) * 30;
    $("#head").css("background","rgb("+r+","+g+","+b+")")
    $("#head").css("box-shadow","0px 0px 100px "+light+"px rgb("+r+", "+g+", "+b+")")
};
const set_intervals = () => {
    /* Darken light in time */
    const light_interval = setInterval(()=>{
        if(lightess>100){
            lightess-=10;
            change_lightness(lightess);
        } else{
            $("#head").css("background","rgb(71, 71, 71)");
            $("#head").css("box-shadow","0px 0px 0px 0px");
        }
    },100);
    /* Generate moths */
    const moth_interval = setInterval(()=>{
        if(lightess>Math.floor((Math.random() * 1000) + 100)){
            for(let i=0;i<1;i++){
                let left=0;
                let top = 0;
                let is_side = random_boolean();
                if(is_side){
                    let is_left = random_boolean();
                    if(is_left){
                        left = -100;
                    } else {
                        left =  window.innerWidth + 100;
                    }
                    top = Math.floor((Math.random() * window.innerHeight) + 1);
                } else {
                    let is_top = random_boolean();
                    if(is_top){
                        top = -100;
                    } else {
                        top =  window.innerWidth + 100;
                    }
                    left = Math.floor((Math.random() *  window.innerWidth) + 1);
                }
                $("<div class='moth' style='top:"+top+"px;left:"+left+"px;'></div>")
                .appendTo($('body'))
                .animate({
                    'top': verticalCener,
                    'left': horizontalCenter
                    
                }, 1000, function () { 
                    $(this).remove();
                    game.moth_counter++;
                    game.moth_counter_total++;
                    document.cookie = "moth_counter="+game.moth_counter;
                    document.cookie = "moth_counter_total="+game.moth_counter_total;
                    print_moths();
                });
            }
        }
        },1000/game.moth_multiplier);
};

const addListeners = () => {
    $("#head").click( () => {
        console.log("clicked");
        /*if(lightess+50<1000){
            lightess+=50;
            change_lightness(lightess);
        }*/
    });
};

$(()=>{
    set_game_from_cookies();
    print_moths();
    set_intervals();
    change_lightness(lightess);
    addListeners();
    
    /*
    $("#head").on("click", function(){
        console.log("clicked_on");
    });
    
    $('#multiplier').click( () => {
        game.moth_multiplier++;
        $('multiplier_amount').html("Multiplier: "+ game.moth_multiplier);
    });

    $(window).resize( () => {
        horizontalCenter = Math.floor(window.innerWidth/2)-100;
        verticalCener = Math.floor(window.innerHeight/2)-100;
    });

   setInterval( () => {
    $("#head").click();
   },100);

  */

  
});