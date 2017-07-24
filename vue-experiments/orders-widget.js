// Vue.component('order' , { 
// 	template: '\
// 		<div v-bind:class="classObject">\
		
		  
// 		 </div>\
// 	',
	
//   data: function () {
//   	return {
//   	   classObject:{
//   	   	order: true,


//   	   } 


//   	}
//   },

//   methods: {

//   	subscribe: function (){  

// 		var ros_topic = new ROSLIB.Topic({
// 		      ros : ros,
// 		      name : 'some_topic',
// 		      messageType : 'mm',
// 		      throttle_rate:window.throttle_rate ,
// 		    });

// 	  	ros_topic .name = this.input_text;	 	
// 	  	ros_topic .subscribe(this.updateValues);
// 	},
	
// 	updateValues: function(message) {

// 		// for (var key in message)//present the content in the div 
// 		// {
// 		// 	var div_content = key + " : ";
// 		// 	if(message[key].constructor === Array)
// 		// 	{
// 		// 		for( var fact in message[key] )
// 		// 		{
// 		// 			div_content+= JSON.stringify(message[key][fact], null,e 5) + "<br>"; //TODO: maybe i dont need to stringfiy 
// 		// 		}
// 		// 	}
// 		// 	else
// 		// 	{
// 		// 		div_content+= message[key] + "<br>"; 
// 		// 	}

// 		// 	div_content+=  "<br>"; 
// 		// 	$(div_id).append(div_content);
// 		// }

// 		console.log ( message );	
// 	  	console.log ( this.input_text );
// 	}
	
//   }





Vue.component('orders-widget' , { 
	template: ' 								\
		<div v-bind:class= "classObject" > 		\
			<h2> Orders:</h2> 					\
			<button v-on:click="init"> starr </button> \
			<p> </p> 							\
		</div> 									\
	',
	
  data: function () 
  {
  	return{
  		classObject: {
  			col_element : true
  		},
		
		wedgit_id : "orders_widget",

  	    show: true ,

  	    topics: { 
	  	    	clips: { order: {} , product: {} },
  	    		}
  	}  
  },

  methods: {
   
    init: function (robot_name){
      var that = this;
      console.log(this.topics);
      for ( var processor_name in this. topics){
	    for (var topic_name in this. topics [processor_name]){
	    	console.log (processor_name +"/"  + topic_name );
	        
	        var ros_topic = new ROSLIB.Topic({
	          ros: ros,
	          name: processor_name +"/" + topic_name ,
	          messageType: 'mm',
	          throttle_rate: window. throttle_rate ,
	         }); 

	        //Local Vue instace Subscribe stub workaround for passing buy value
	  		this .subscribe(ros_topic , processor_name.valueOf() , topic_name.valueOf() );
	      }
      }

    },

    subscribe: function (ros_topic , processor_name , topic_name ){     
      	var that = this; 
        ros_topic .subscribe( function (message){
			Vue.set (that. topics [processor_name], topic_name , message[topic_name] );
			console.log(that.topics);
        }) ;

    }
	
  }



});


