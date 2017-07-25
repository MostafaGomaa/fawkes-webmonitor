var widget = { 
	template: ' 								\
		<div v-bind:id= "id" 					\
			v-bind:class= "classObject"  > 		\
			<h2> {{title}}</h2>					\
		</div> 									\
	',
	
  data: function () 
  {
  	return{
  		id : 'default_widget_id',

  		classObject: {},
		
		title : 'Default Wedgit',

   	    show: true ,

  	    topics: {}
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

};
