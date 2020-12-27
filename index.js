var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var flag=0;
var level=0;
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

$(document).keypress(function(){
  if(flag===0)
  {
    $("#level-title").text("level"+level);
    nextSequence();
    flag=1;
  }
});

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("level"+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
         $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
      // console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  }

  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
          $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver()
{
  level=0;
  gamePattern=[];
  flag=0;
}
