import React, { Component } from 'react';
import './snake.css'; 
import Snake from './Snake1';
import Snake2 from './Snake2';
import { SSL_OP_MSIE_SSLV2_RSA_PADDING } from 'constants';


const getRandomCoordinate = () => {
    let min =1;
    let max = 25;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
}

const initialState ={ 

    
        food: getRandomCoordinate(),
        speed: 150,
        direction: 'RIGHT',
        snakeDots: [
            [0,0],
            [2,0]
        ]
 }
class App extends Component{
    
    state = initialState;
    

    componentDidMount(){
        setInterval(this.moveSnake,this.state.speed);
        document.onkeydown= this.onkeyDown;
    }

    componentDidUpdate(){
        this.checkIfOutOfBorders()
        this.chackIfCollapsed();
        this.checkIfEat();
    }

    onkeyDown = (e)=> {
        e = e || window.event;
        switch(e.keyCode) {

            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
             case 37:
                this.setState({direction: 'LEFT'});
                break;
             case 39:
                this.setState({direction: 'RIGHT'});
                break;
                                                                
        }
    }

    moveSnake = () => {
        let dots =[...this.state.snakeDots];
        let head =dots[dots.length -1];

        switch (this.state.direction) {
            case 'RIGHT':
                head =[head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head =[head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head =[head[0], head[1] + 2];
                break;
            case 'UP':
                head =[head[0], head[1] - 2];
                break;

        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots:dots

        })
    }
    checkIfOutOfBorders() {
        let  head = this.state.snakeDots[this.state.snakeDots.length -1];
        if (head [0] >= 100 || head [1] >=100 || head [0] < 0 || head [1] < 0 ) {
         this.onGameOver();   
        }
    }

    chackIfCollapsed() {
        let snake =[...this.state.snakeDots];
        let head =snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if ( head[0] == dot[0] && head[1] ==dot[1]) {
                this.onGameOver()
            }
        })
    }

    
    
    checkIfEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length -1];
        let food = this.state.food; 
        if (head[0] == food[0] && head[1] ==food[1]) {
            this.setState({
                food: getRandomCoordinate()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }
  
    
    
    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }


    
    
    
    increaseSpeed() {
        if (this.state.speed >10) {
            this.setState({
                speed: this.state.speed +10
            })
        }

    }

    






    
    onGameOver() {
        alert(`Game over. Snake length is ${this.state.snakeDots.length}`);
        this.setState(initialState)

    }
   
     
    render(){
        
        return(
            <div className="snake-game"><h4> Snake-Game</h4>
                   <div class="Chota">
            <img src="./Images/Square Fit_20197722512374.jpg" alt="not"></img>          
            <div className="game-area">
              
              <Snake snakeDots={this.state.snakeDots}/> 
              <Snake2 dot={this.state.food}/> 
                 
              </div>
 
            </div>
            </div>
        );
    }
}
export default App;
