var bird1 = new Image();
bird1.src = "images/Bird.png"

var bird2 = new Image();
bird2.src = "images/Bird2.png"

var bg = new Image();
bg.src = "images/background.png"

var gpohon = new Image();
gpohon.src = "images/pohon.jpg"

var mati = new Image();
mati.src = "images/mati.png"

var judul = new Image();
judul.src = "images/judul.png"

var poin = new Audio();
poin.src = "sounds effect/point.mp3";

var die = new Audio();
die.src = "sounds effect/die.mp3";

var backsound = new Audio();
backsound.src = "sounds effect/backsound.mp3";
backsound.loop = true;


function mulaikanvas(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    var cW= canvas.width;
    var cH= canvas.height;

    var bgX=0; start=false;
    function splash(){
        ctx.clearRect(0,0,cW,cH);
        ctx.drawImage(bg,bgX-=2,0);
        if(bgX==-1599){
            bgX=0;
        }

        ctx.font="Bold 20px arial";
        ctx.fillText("Klik untuk Mulai",300,300);

        ctx.drawImage(judul,200,100);
        
    }
    var inSplash = setInterval(splash,30);

    document.addEventListener('click',function(even){
        if(start==false){
            start=true;
            backsound.play();

            clearInterval(inSplash);
            utama();
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
          if(start==false){
            start=true;
            clearInterval(inSplash);
            utama();
        }
        }
      })
 

    function utama(){

        var gantiGambar = false;

        function BG(){
            this.x=0;
            this.render=function(){
                ctx.drawImage(bg,this.x--,0);//x-- agar bergerak ke kiri

                if(this.x==-1599){
                    this.x=0;
                }
            } 
        }

        var latar = new BG();

        function Burung(){
            this.x=100; this.y=200; this.w=100, this.h=100, this.i=0;
            this.render=function(){
                if(gantiGambar){
                    ctx.drawImage(bird2,this.x,this.y+=5); //+5 agar posisi bebek selalu turun ke bawah
                    this.i++;
                    if(this.i==5){
                        gantiGambar=false;
                        this.i=0;
                    }
                }else{
                    ctx.drawImage(bird1,this.x,this.y+=5);
                }
                
            }
        }   

        var burung= new Burung();

        var pohon=[];
        tambahpohon();

        function tambahpohon(){
            var x=800, y=0, w=50, h=300;
            var acak=Math.floor(Math.random()*250);//membuat angka acak dengan maksimal 250 (0-250)
            pohon.push({"x":x, "y":y-acak, "w":w, "h":h}); //misal angka acak 100 maka y-100
        }

        var hitung=0;

        function selesai(){
            clearInterval(interval);
            ctx.clearRect(0,0,cW,cH);
            latar.render();
            renderpohon(); 
            ctx.drawImage(mati,burung.x, burung.y);

            ctx.font="Bold 60px serif";
            ctx.fillText("SELESAI",250,250);

            ctx.font="Bold 30px comic sans";
            ctx.fillText("Skor Anda : " +skor,290,300);

            ctx.font="Normal 15px arial";
            ctx.fillText("Klik untuk memulai kembali permainan",250,330);
            backsound.pause();

            document.addEventListener('click',function(even){
                setTimeout(function() {
                    location.reload();
                  }, 5000);
            })

        }

        

        var skor = 0;
        tambahnilai=true;
        function nabrak(){
            for(var i=0; i<pohon.length; i++){
                var p=pohon[i];
                if((burung.x+burung.w>p.x+20 && burung.y<p.y+p.h && burung.x<p.x+p.w-50)||
                (burung.x+burung.w>p.x+20 && burung.y+burung.h>p.y+p.h+280 && burung.x<p.x+p.w-20)){

                    selesai();
                    die.play();
                }else if(p.x+p.w<burung.x){//tidak menabrak
                    if(tambahnilai){
                        skor++;
                        tambahnilai=false;
                        poin.play();
                    }
                }
            } 
            if(burung.y<=0){ selesai();die.play();}
            if(burung.y+burung.h>cH){ selesai(); die.play();}
        }

        
        function renderpohon(){//untuk menjalankan pohon
            for(var i=0; i<pohon.length; i++){
                var p =pohon[i];
                ctx.drawImage(gpohon,p.x--,p.y); //x-- agar pohon berjalan ke kiri
                ctx.drawImage(gpohon,p.x--,p.y+p.h+250);

                //menghapus tiang yg disebelah kiri setelah melewati kanvas
                if(p.x+p.w<0){
                    pohon.splice(i,1); //tiang posisi i, jumlah 1 tiang dihapus
                    tambahnilai=true;
                }
            }
            
            hitung++;
            if(hitung==150){
                tambahpohon();
                hitung=0;
            } 

        }
        
        function animasi(){
            ctx.save(); 
            ctx.clearRect(0,0,cW,cH);  

            latar.render();
            burung.render();
            renderpohon();
            ctx.font="Bold 20px arial";
            ctx.fillText("Skor : " +skor,30,30);
            nabrak();

            ctx.restore();
        }
        var interval = setInterval(animasi,30);

        ctx.canvas.addEventListener('click',function(event){
            burung.y -= 70;
            gantiGambar=true;
        })
        
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" || e.key == " ") {
                burung.y -= 70;
                gantiGambar=true;
            }
          });

    }//end function utama
}

window.addEventListener('load',function(event){
    mulaikanvas();
})
    