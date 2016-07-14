/* 객체 매뉴얼
	s: 이 총알이 어떤 div에 붙을지를 결정하세요
	posY:이 총알이 어느 y 좌표에서부터 날아갈지 결정하세요
*/
var Bullet=function(stage, x , y){
		//객체의 특징에 대한 값을 담고 있다고, 속성이라 한다. 
		//property 라 표기한다.
		this.span;
		this.x=x;
		this.y=y;
		this.stage=stage;
		this.st;//나의 셋타임 아웃을 가리키기 위한 변수
		this.velX=10;//몇필셀씩 움직일지!!

	//객체안에 들어있는 함수는 method 메서드라 한다!!1
	//method(방법) : 객체의 동작 방식을 결정하는 로직이 들어 있기 때문에...
		this.init=function(){
			this.span = document.createElement("span");
			this.span.innerText = "●";
			this.span.style.color = "red";

			this.span.style.position = "absolute";
			this.span.style.left= this.x + "px";
			this.span.style.top= this.y + "px";

			this.span.style.width = 10+"px";
			this.span.style.height = 10+"px";


			stage.appendChild(this.span);

			this.move();
		}

		this.hitTest=function(){
			for(var i=0;i<enemyArray.length;i++){	
				//적군과 부딪치면...
				
				if(enemyArray[i]!=undefined){
					var result = hitTest(this.span,enemyArray[i].img);
				 	
					if(result){
						//총알 죽이고	
						this.stage.removeChild(this.span);
						clearTimeout(this.st);

						//적군죽이고
						this.stage.removeChild(enemyArray[i].img);
						clearTimeout(enemyArray[i].st);
						delete enemyArray[i]; // 배열에서 제거 ~ (이 자리엔 undefined)
						
						return;
					}
					if(this.x>screen.width){
						//총알 죽이고	
						this.stage.removeChild(this.span);
						clearTimeout(this.st);
						return;
					}
				}
			}
		
		}

		this.move=function(){
			var me=this;
			this.x+=this.velX;
			this.span.style.left = this.x + "px";
			
			
			
			this.st = setTimeout(function(){me.move()},10); //clear 하기전에 진행중이던 사이클은 마무리하고 끝나게 된다.그래서 clear가 밑에있어야한다. 
			
			//적군과 충돌 검사
			this.hitTest();
			

			//stage를 벗어나면, 총알의 setTimeout 멈춰야 한다!!
			if(parseInt(this.span.style.left)>parseInt(this.stage.style.width)){
				//console.log("저 없어져요");
				this.stage.removeChild(this.span);
				clearTimeout(this.st);
				return;
			}
			
		
		
		}
	}