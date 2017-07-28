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

// if(remote){
//   r1_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-1:6060' });
//   r2_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-2:6060' });
//   r3_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-3:6060' });
// }
// else
// {
//   r1_con = new ROSLIB.Ros({ url : 'ws://localhost:6060' });
//   r2_con = new ROSLIB.Ros({ url : 'ws://localhost:5050' });
//   r3_con = new ROSLIB.Ros({ url : 'ws://localhost:4040' }); 
// }

r1_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-1:6060' });
r2_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-2:6060' });
r3_con = new ROSLIB.Ros({ url : 'ws://robotino-laptop-3:6060' });


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

    robot_names: { R1: "R-1",
                   R2: "R-2",
                   R3: "R-3"
                 },


    master: "Rx",

    subscribe_to_topics :{  R1: false,
                            R2: false,
                            R3: false
                          },
    
    topics_names: { R1 : [//"clips/lock-role" , "clips/order" , "clips/product" 
                          ],
                    R2 : ["clips/lock-role"],
                    R3 : [],
                    },

    remote: true ,

    url: {  local: {  R1:  'ws://localhost:6060' ,
                      R2:  'ws://localhost:5050' ,
                      R3:  'ws://localhost:4040' 
                    },
    
            remote: { R1: 'ws://robotino-laptop-1:6060' ,
                      R2: 'ws://robotino-laptop-2:6060' ,
                      R3: 'ws://robotino-laptop-3:6060' 
                    },
          },
    // topics_data:  { R1: {topicName : {rostopice: {} , data: {} } },
    topics_data:  { R1: {},
                    R2: {},
                    R3: {}
                  },

  },

  computed :{
  },

  methods: { 
    // init: function (robot_name){
    //   var that = this;
    //   var topic_name;
    //   for (var i in this. topics_names [robot_name]){
    //     topic_name = this. topics_names [robot_name][i];
    //     //prepare to populate the date 
    //     var ros_topic = new ROSLIB.Topic({
    //       ros: this. connections[robot_name],
    //       name: topic_name ,
    //       messageType: 'mm',
    //       throttle_rate: window. throttle_rate ,
    //     }); 
    //     Vue.set (that. topics_data [robot_name], topic_name , {});
    //     that. topics_data [robot_name] [topic_name] 
    //         = Object.assign({}, that. topics_data [robot_name] [topic_name] , { ros: ros_topic , data: {} } )
    //     console.log(that. topics_data [robot_name] [topic_name])
    //     this.subscribe(robot_name , topic_name.valueOf() ) 
    //   }
    // },

    // subscribe: function(robot_name , topic_name ){`
    //     var that = this;
    //     this. topics_data [robot_name] [topic_name] .ros .subscribe (function (message){
    //       // console.log (that. topics_data);
    //       console.log (message);
    //       Vue.set (that. topics_data [robot_name] [topic_name], 'data' , message);
    //     }); 
    //   },

    // print : function (){
    //     console.log(this.topics_data);
    // }
     onConnection: function (Robot ){
      console.log(Robot ,'Connected to websocket server.');
      this.subscribe_to_topics[Robot] = true;
    },

    onConnectionError: function (Robot , error){
      console.log(Robot , 'Error connecting to websocket server: ', error);
    },

    onConnectionClose: function (Robot ){
      console.log(Robot , 'Connection to websocket server closed.');
      console.log("Trying to reconnect to", Robot);
      var that=this; 
      setTimeout(function() { that.reconnect(Robot)} ,1000);
    },
    
    reconnect: function (Robot){
      if (! this.connections[Robot].isConnected){
        if(this.remote){
         this.connections[Robot].connect(this.url.remote[Robot]);
        }else{
          this.connections[Robot].connect(this.url.local[Robot]);
        }

        this.remote = !this.remote;
      }
    }

  },

  created: function () {
    var that =  this; 
    this.$watch('connections.R1.isConnected', function (val,oldVal) { this.onConnectionUpdated("R1") } , {deep:true} );
    this.$watch('connections.R2.isConnected', function (val,oldVal) { this.onConnectionUpdated("R2") } , {deep:true} );
    this.$watch('connections.R3.isConnected', function (val,oldVal) { this.onConnectionUpdated("R3") } , {deep:true} );

    this.connections.R1.on('connection', function() {
      that.onConnection("R1");
    });

    this.connections.R1.on('error', function(error) {
      that.onConnectionError("R1",error);
    });

    this.connections.R1.on('close', function() {
      that.onConnectionClose("R1");
    });



     this.connections.R2.on('connection', function() {
      that.onConnection("R2");
    });

    this.connections.R2.on('error', function(error) {
      that.onConnectionError("R2",error);
    });

    this.connections.R2.on('close', function() {
      that.onConnectionClose("R2");
    });



     this.connections.R3.on('connection', function() {
      that.onConnection("R3");
    });

    this.connections.R3.on('error', function(error) {
      that.onConnectionError("R3",error);
    });

    this.connections.R3.on('close', function() {
      that.onConnectionClose("R3");
    });

   


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

