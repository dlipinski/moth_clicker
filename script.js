
$(()=>{
    const bulb_head = $("#head");
    const light_control = $("#light_control");
    const light_value = $("#light_value");
    let window_height = window.innerHeight;
    let window_width = window.innerWidth - 100;
    let horizontalCenter = Math.floor(window.innerWidth/2)-100;
    let verticalCener = Math.floor(window.innerHeight/2)-100;
    var lightess = 110;
    var moth_counter = 0;
    if(!moth_counter){
        moth_counter = 0;
    }
    var moth_multiplier = 1;
    const change_lightness = (light_volume) => {
        let r = (light_volume/1000) * 255;
        let g = r;
        let b = (light_volume/1000) * 130;
        let light = (light_volume/1000) * 30;
        bulb_head.css("background","rgb("+r+","+g+","+b+")")
        bulb_head.css("box-shadow","0px 0px 100px "+light+"px rgb("+r+", "+g+", "+b+")")
    };
    change_lightness(lightess);
    const light_interval = setInterval(()=>{
        if(lightess>100){
            lightess-=10;
            change_lightness(lightess);
            light_value.html(lightess);
        } else{
            bulb_head.css("rgb(71, 71, 71)")
            bulb_head.css("box-shadow","0px 0px 0px 0px")
        }
    },100);
    const random_boolean = () =>{
        return Math.random() >= 0.5;
    };
    const moth_interval = setInterval(()=>{
        if(lightess>Math.floor((Math.random() * 1000) + 100)){
            for(let i=0;i<moth_multiplier;i++){
                let left=0;
                let top = 0;
                let is_side = random_boolean();
                if(is_side){
                    let is_left = random_boolean();
                    if(is_left){
                        left = -100;
                    } else {
                        left = window_width + 100;
                    }
                    top = Math.floor((Math.random() * window_height) + 1);
                } else {
                    let is_top = random_boolean();
                    if(is_top){
                        top = -100;
                    } else {
                        top = window_height + 100;
                    }
                    left = Math.floor((Math.random() * window_width) + 1);
                }
                $("<div class='moth' style='top:"+top+"px;left:"+left+"px;'></div>")
                .appendTo($('body'))
                .animate({
                    'top': verticalCener,
                    'left': horizontalCenter
                    
                }, 1000, () => { 
                    moth_counter++;
                    $('#wealth').html("Moths: "+moth_counter);
                    $(this).remove();
                });
            }
        }
        },1000);
    bulb_head.click(()=>{
        if(lightess+50<1000){
            lightess+=50;
            change_lightness(lightess);
            light_value.html(lightess);
        }

    });
    $(window).resize(()=>{
        window_height = window.innerHeight;
        window_width = window.innerWidth - 100;
        horizontalCenter = Math.floor(window.innerWidth/2)-100;
        verticalCener = Math.floor(window.innerHeight/2)-100;
    });

   setInterval(()=>{
    bulb_head.click();
   },100);

  
});