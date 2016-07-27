/*적군을 정의한다!!*/
var Unit=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.src=src;
	this.velX=-2; //x축으로 몇 정도로 다가올지... 
	this.velY=0; //y축으로 몇 정도로 다가올지...
	this.st;

	this.init=function(){
		this.img=document.createElement("img");
		this.img.src = this.src;
	
		
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";

		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		this.stage.appendChild(this.img);

		this.move();
	}

	this.move=function(){
		var me=this;

		this.x += this.velX;
		this.y += this.velY;

		this.img.style.left = this.x+ "px";
		this.img.style.top = this.y+ "px";
		
		/*
		var result = hitTest(this.img,hero.img);
		if(result){
			console.log
				("게임 오바");
		}
		*/


		this.st = setTimeout(function(){
			me.move();
		},10);
		


	}
	
}