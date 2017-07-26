
Vue.component('agent-widget' , { 

	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h2> {{title}}</h2> 														\
					<button v-on:click="init"> start </button> 									\
					<lock-role :topic_data="lockRoleTopic"  									\
								:robot_name="robot_name"> 										\
						Loading Lock Role !! 													\
					</lock-role> 																\
					<holding :holding_data="holdingTopic" 										\
							:workpiece_data="productOfHolding" 									\
							:robot_name="robot_name"> 											\
						Loading Holding !! 														\
					</holding> 																	\
					<state :state_data="stateTopic"> Loading State !!  </state>					\
					<br>																		\
					<running-tasks :tasks_data="tasksTopic" :steps_data="stepsTopic"> 			\
						Loading Running Task !! 												\
					</running-tasks>  															\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "agent_widget",
			title: "Agent Info",
			robot_name: "Rx",
			classObject: {
  				container : true
  			},
  	    	show: true ,
	  	    topics: { 
		  	    	clips: { "lock-role": [] , holding: [] , state: [] , task: [] , "locked-resource" : [] , skills: [] , product: [] , step: []},
	  	    		}
  		}
  	},
  	computed: {
  		lockRoleTopic: function (){
  			return this.topics.clips["lock-role"][0];
  		}, 

  		holdingTopic: function (){
  			return this.topics.clips["holding"][0];
  		},

  		stateTopic: function (){
  			return this.topics.clips["state"][0];
  		},

  		tasksTopic: function(){
  			return this.topics.clips["task"];
  		},

  		stepsTopic: function(){
  			return this.topics.clips["step"];
  		},
 		productOfHolding: function (){
			// console.log( order["product-id"][0].constructor )
  			for (var i in this.topics.clips.product){
  				var product = this.topics.clips.product[i];
  				// console.log( order["product-id"][0] )
  				// console.log(product["id"][0]);
  				if (product["id"][0] == this.topics.clips["holding"][0].fields[0] )
				{
					return product
				}
				}
  		}
  	},
});


Vue.component('lock-role' , { 
	props: [ 'topic_data' , 'robot_name' ],
	template: '	<div :id="generatedID"												\
					 :class= "classObject" >										\
						<img> </img> 												\
						<span v-if="!isMaster"> {{ topic_data.fields[0] }}</span>	\
				</div> 																\
				',

	data: function () {
		return{
			id_prefix: "lock_role__",
  	    	show: true ,
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true,
	  			container_header_element : true,
	  			master : (this.topic_data.fields[0] == "MASTER"),
	  			slave : (this.topic_data.fields[0] != "MASTER") 
  			}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		isMaster: function(){
  			return this.topic_data.fields[0] == "MASTER"; 
  		}

  	}
});


Vue.component('holding' , { 
	props: [ 'holding_data', 'workpiece_data' , 'robot_name' ],
	template: '	<div :id="generatedID"																\
					 :class= "classObject" >														\
					<sup> Holding: </sup> <br>														\
					<workpiece v-if="isHolding" :topic_data="workpiece_data"> Loading Workpiece !! </workpiece> <br>	\
					<sub>{{holdingValue}} </sub>												\
				</div> 																				\
				',

	data: function () {
		return{
			id_prefix: "holding__",
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true,
	  			container_header_element : true
  			}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		holdingValue: function(){
  			return this.holding_data.fields[0];
  		},

  		isHolding: function(){
  			return this.holding_data.fields[0] != "NONE";
  		}

  	}
});


Vue.component('state' , { 
	props: [ 'state_data', 'robot_name' ],
	template: '	<div :id="generatedID"																\
					 :class= "classObject" >														\
					<sup> State:</sup> <br> 														\
					<sub> {{stateValue}}</sub> 														\
				</div> 																				\
				',

	data: function () {
		return{
			id_prefix: "state__",
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true,
	  			container_header_element : true
  			}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		stateValue: function(){
  			return this.state_data.fields[0];
  		}

  	}
});




Vue.component('running-tasks' , { 
	props: [ 'tasks_data', 'steps_data' , 'robot_name' ],
	template: '	<div :id="generatedID"										\
					 :class= "classObject" >								\
					<h2> Running Tasks: </h2> 								\
					<task v-for="item in tasks_data" 						\
							v-if="isRunningTask(item)"						\
							:task_data="item" 								\
							:relative_steps_data="stepsOfTask(item)"> 		\
							Loading Running Task !! 						\
					</task>													\
				</div> 														\
				',

	data: function () {
		return{
			id_prefix: "tasks__",
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true
	  		}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		steps__: function(){
  			return this.id_prefix + this.robot_name;
  		}
  	},

  	methods:{  		
  		isRunningTask: function (taskObject){
		  	return taskObject.state == "running";
		},

		stepsOfTask: function (taskObject){
			var steps_of_task = [];
			for (var task_step_index in taskObject.steps )
			{
				for(var step_index in this.steps_data )
					{
					 var step = this.steps_data[step_index];

						if ( step.id[0] == taskObject.steps[task_step_index] )
						{
							steps_of_task.push(step);
						}
				}
			}
		 return steps_of_task;
		}

  	}
});


Vue.component('task' , { 
	props: [ 'task_data', 'relative_steps_data' , 'robot_name' ],
	template: '	<div :class= "classObject" >														\
					<p>  <b> {{task_data.name[0]}} </b> <sup> {{task_data.priority[0]}}</sup> </p>	\
					<ol>																			\
						<li v-for="item in relative_steps_data" :class= "{highlight : isRunningStep(item) }"> 									\
							<span> 																	\
								<b> {{item["name"][0]}} </b> 										\
								<sup> {{item["task-priority"][0]}} </sup> 							\
								 {{item["machine"][0]}}  											\
								<sub> {{item["machine-feature"][0]}} </sub> 						\
								Lock: <b> {{item["lock"][0]}} </b> 									\
							</span> 																\
						</li> 																		\
					</ol>																			\
				</div> 																				\
				',

	data: function () {
		return{
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
  			}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		}
  	},

  	methods: {
  		isRunningStep: function( stepObject){
  			return stepObject["state"][0] == "running";
  		}
  	}
});









//TODO IN CSS RESTUCTURE ROUND
// let the CSS not use ids..I dont like ids
