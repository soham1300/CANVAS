var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var circleArray=[];

var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('resize',function(e)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener('mousemove',
function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
})

function circle(x,y,r,dx,dy)
{
    this.x = x
    this.y = y
    this.r = r
    this.a = r
    this.dx = dx
    this.dy = dy

    this.draw= function()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        c.fillStyle ='#' + randomColor;
        c.fill()
        c.strokeStyle ='#' + randomColor;
        c.stroke();
    }

    this.update = function()
    {
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0)
            this.dx = -this.dx;
        else if(this.y + this.r > window.innerHeight || this.y - this.r < 0)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;

        // Interaction

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
        {
            //this.r += 1;
            if (this.r < 20)
            {
                this.r += 5;
            }
        }
        else if (this.r > this.a)
        {
            this.r = this.a;
        }

        this.draw();
    }
}

for (i=0;i<1000;i++)
{
    r=Math.random()*5;
    x=Math.random() * (window.innerWidth - r * 2) + r;
    y=Math.random() * (window.innerHeight - r * 2) + r;
    dx=(Math.random() - 0.5)*3
    dy=(Math.random() - 0.5)*3
    circleArray.push(new circle(x,y,r,dx,dy))
}

function animation()
{
    requestAnimationFrame(animation);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circleArray.length; i++)
    {
        circleArray[i].update();
    }
}

animation();