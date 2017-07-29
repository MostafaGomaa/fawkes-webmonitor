Vue.component('tech' , { 


	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h1> {{robot_name}}</h3> 													\
					<h3> {{topics.blackboard.SpeechSynthInterface::Flite"}} </h3>				\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "agent_widget",
			title: "Agent Info",			
  	    	show: true ,
	  	    topics: { 
		  	    	blackboard: { "SpeechSynthInterface::Flite": [] }
	  	    		}
  		}
  	},


  	computed: {
  		classObject: function (){
  				return {
  					container : true,
  					inactive : (!this.active)
  				}
  			}

  		// lockRoleTopic: function (){
  		// 	return this.topics.clips["lock-role"][0];
  		//}
  	}

});



// Vue.component('state' , { 
// 	props: [ 'state_data', 'robot_name' ],
// 	template: '	<div :id="generatedID"																\
// 					 :class= "classObject" >														\
// 					<h1> {{stateValue}}</h1> 														\
// 				</div> 																				\
// 				',

// 	data: function () {
// 		return{
// 			id_prefix: "state__",
//   	    	show: true 
//   		}
//   	},

//   	computed: {
//   		classObject: function (){
//   			return {
// 	  			wedgit : true,
// 	  			container_header_element : true
//   			}	
//   		},

//   		generatedID: function(){
//   			return this.id_prefix + this.robot_name;
//   		},

//   		stateValue: function(){
//   			return this.state_data.fields[0];
//   		}

//   	}
// });