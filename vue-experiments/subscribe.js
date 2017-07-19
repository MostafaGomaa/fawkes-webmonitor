
var listener = new ROSLIB.Topic({
      ros : ros,
      name : 'some_topic',
      messageType : 'mm',
      throttle_rate:window.throttle_rate ,
    });



function load(robot_info  ){

var vue_app_2 = new Vue({
  el: '#subscription',
  data: {
    show: true ,
    input_text : 'type the name of the topic (eg: clips/order)',
    my_robot_info : robot_info ,
    ros_topic : listener 
  },

  methods: {

  	subscribe: function (){

	  	this.ros_topic.name = this.input_text ;	  	
	  	this.ros_topic.subscribe(this.updateValues);
	  	
	},
	
	updateValues: function(message) {

		// for (var key in message)//present the content in the div 
		// {
		// 	var div_content = key + " : ";
		// 	if(message[key].constructor === Array)
		// 	{
		// 		for( var fact in message[key] )
		// 		{
		// 			div_content+= JSON.stringify(message[key][fact], null,e 5) + "<br>"; //TODO: maybe i dont need to stringfiy 
		// 		}
		// 	}
		// 	else
		// 	{
		// 		div_content+= message[key] + "<br>"; 
		// 	}

		// 	div_content+=  "<br>"; 
		// 	$(div_id).append(div_content);
		// }

		console.log ( message );	
	  	console.log ( this.input_text );
	}
	
   }



});

}



