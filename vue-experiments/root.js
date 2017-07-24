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
		
		connections: { R1: r1_con,
                   R2: r2_con,
                   R3: r3_con
                 },

    master: "Rx",
    
    topics_names: { R1 : ["clips/lock-role" , "clips/order" , "clips/product" ],
                    R2 : ["clips/lock-role"],
                    R3 : [],
                    },
    // topics_data:  { R1: {topicName : {rostopice: {} , data: {} } },
    topics_data:  { R1: {},
                    R2: {},
                    R3: {}
                  }
	},


	methods: { 
    init: function (robot_name){
      var that = this;
      var topic_name;
      for (var i in this. topics_names [robot_name]){
        topic_name = this. topics_names [robot_name][i];
        //prepare to populate the date 
        var ros_topic = new ROSLIB.Topic({
          ros: this. connections[robot_name],
          name: topic_name ,
          messageType: 'mm',
          throttle_rate: window. throttle_rate ,
        }); 
        Vue.set (that. topics_data [robot_name], topic_name , {});
        that. topics_data [robot_name] [topic_name] 
            = Object.assign({}, that. topics_data [robot_name] [topic_name] , { ros: ros_topic , data: {} } )
        console.log(that. topics_data [robot_name] [topic_name])
        // this.subscribe(robot_name , topic_name.valueOf() ) 
      }
    },

    subscribe: function(robot_name , topic_name ){
        var that = this;
        this. topics_data [robot_name] [topic_name] .ros .subscribe (function (message){
          // console.log (that. topics_data);
          console.log (message);
          Vue.set (that. topics_data [robot_name] [topic_name], 'data' , message);
        }); 
      },

    print : function (){
        console.log(this.topics_data);
    }
    
  },

  created: function () {
    this.$watch('connections.R1.isConnected', function (val,oldVal) { this.init("R1") } , {deep:true} );
    this.$watch('connections.R2.isConnected', function (val,oldVal) { this.init("R2") } , {deep:true} );
    this.$watch('connections.R3.isConnected', function (val,oldVal) { this.init("R3") } , {deep:true} );
  }

  // watch: {
  //   R1_connection: {
  //    handler: function (val){
  //       console.log(val);
  //       this.init ("R1")
  //     },
  //     deep: true 
  //   }

  // }


});