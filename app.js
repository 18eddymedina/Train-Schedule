var config = {
    apiKey: "AIzaSyB71hqYjNRZLkI97F25KwaL59BYb-2ZbVk",
    authDomain: "employee-59f46.firebaseapp.com",
    databaseURL: "https://employee-59f46.firebaseio.com",
    projectId: "employee-59f46",
    storageBucket: "",
    messagingSenderId: "637936957799"
  };
  firebase.initializeApp(config);
var database=firebase.database();
var total=0;
$("#searchBtn").on("click", function(){
    event.preventDefault();

    var one=document.getElementById("one").value;
    var two=document.getElementById("two").value;
    var three=document.getElementById("three").value;
    var four=document.getElementById("four").value;
var timestamp=Date.now();

  database.ref().push({
        train: one,
        des: two,
        freq: four,
        time: three,
        dateAdded:timestamp,
        
      });
})
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
     var d=new Date();
     data = snapshot.val(); 
    var firstTime=moment(data.time, "HH:mm");
    var currentTime=moment().format("mm");
    var dif=moment().diff(moment(firstTime),"minutes");
    var rem=dif% data.freq;
  if(firstTime.isAfter(moment())){
    dif=moment(firstTime).diff(moment().subtract(1,"minutes"),"minutes");
    firstTime=moment(firstTime).format("HH:mm");
    $("#tbody").append("<tr> <td>"+data.train+"</td><td>"+data.des+"</td><td>"+data.freq+"</td><td>"+firstTime+"</td><td>"+dif+"</td><td>");

  }
  else{
   // dif=moment().diff(moment(firstTime),"minutes");
    while(!(firstTime.isAfter(moment()))){
      firstTime=firstTime.add(data.freq,'minutes');
    }
    rem=firstTime;
    firstTime=moment(firstTime).format("HH:mm");
    rem=moment(rem).diff(moment().subtract(1,"minutes"),"minutes");
    $("#tbody").append("<tr> <td>"+data.train+"</td><td>"+data.des+"</td><td>"+data.freq+"</td><td>"+firstTime+"</td><td>"+rem+"</td><td>");

  }




});
  