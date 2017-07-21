window.throttle_rate = 1000;
window.tf_throttle_rate = 1000;
var remote = false;

var __robots = [];

var ros ;
var ros_2;
var ros_3 ;

var intialiazed_ = false;
var listener= {} ;

  // Connect to ROS.
  var r1_con ;
  var r2_con ;
  var r3_con ; 

  
  var marker_connection= new ROSLIB.Ros({ url : 'ws://localhost:9090' });    
  var robot_info = { name: "marker"  , connection : marker_connection , alive: false }  ;
  __robots.push (  robot_info ) ;

  if(remote){
 
    r1_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-1:6060' });
    r2_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-2:6060' });
    r3_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-3:6060' });

  }
  else
  {
    r1_con = new ROSLIB.Ros({ url : 'ws://localhost:6060' });
    r2_con = new ROSLIB.Ros({ url : 'ws://localhost:5050' });
    r3_con = new ROSLIB.Ros({ url : 'ws://localhost:4040' }); 

  }

  ros = r1_con; 
  ros_2 = r2_con;
  ros3 = r3_con; 






var root_vue = new Vue({
	el:"#app_root",
	data : {
		status: "loading..",
		robot_1_connection: r1_con,
		robot_2_connection: r2_con,
		robot_3_connection: r3_con
	}

});