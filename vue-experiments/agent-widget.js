
Vue.component('agent-widget' , { 


	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h1> {{robot_name}}</h1> 													\
																								\
					<lock-role :topic_data="lockRoleTopic"  									\
								:robot_name="robot_name"> 										\
						Loading Lock Role !! 													\
					</lock-role> 																\
																								\
					<holding :holding_data="holdingTopic" 										\
								:workpiece_data="productOfHolding" 								\
								:robot_name="robot_name"> 										\
						Loading Holding !! 														\
					</holding> 																	\
																								\
					<state :state_data="stateTopic"> 											\
							Loading State !!  													\
					</state>																	\
																								\
					<br>																		\
																								\
					<running-tasks :tasks_data="tasksTopic" :steps_data="stepsTopic"> 			\
						Loading Running Task !! 												\
					</running-tasks>  															\
																								\
					<locked-resources :topic_data="lockedResourceTopic" 						\
										:robot_name="this.robot_name"> 							\
						Loading Locked Resources Task !! 										\
					</locked-resources>  														\
																								\
					<skills :skills_data="skillTopic"											\
								:skills_done_data="skillDoneTopic"								\
								:skills_to_execute_data="skillToExecuteTopic"> 					\
						Loading Skills !! 														\
					</skills>																	\
																								\
																								\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "agent_widget",
			title: "Agent Info",
			// robot_name: "R-1", replaced with the prop
			
  	    	show: true ,
	  	    topics: { 
		  	    	clips: { "lock-role": [] , holding: [] , state: [] , task: [] , "locked-resource" : []  , product: [] , step: [] , skill: [] , "skill-done" : [], "skill-to-execute": [] }
	  	    		}
  		}
  	},


  	computed: {
  		classObject: function (){
  				return {
  					container : true,
  					inactive : (!this.active)
  				}
  			},

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

  		lockedResourceTopic: function(){
  			return this.topics.clips["locked-resource"];
  		},

  		skillTopic: function(){
  			return this.topics.clips["skill"];
  		},

  		skillDoneTopic: function(){
  			return this.topics.clips["skill-done"];
  		},

  		skillToExecuteTopic: function(){
  			return this.topics.clips["skill-to-execute"];
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
	template: '	<div :id="generatedID"								\
					 :class= "classObject" >						\
					<sup> Holding: </sup> <br>						\
					<workpiece v-if="isHolding" 					\
								:topic_data="workpiece_data">		\
								Loading Workpiece !! 				\
					</workpiece> <br>								\
					<sub>{{holdingValue}} </sub>					\
				</div> 												\
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
					<b> Running Tasks: </b> 								\
					<task v-for="item in tasks_data" 						\
							v-if="isRunningTask(item)"						\
							:task_data="item" 								\
							:relative_steps_data="stepsOfTask(item)"> 		\
							Loading Running Task !! 						\
					</task>													\
					<p v-if="!aRunningTaskExists"> No Running Tasks !</p>	\
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

  		aRunningTaskExists: function(){
  			for(var i in this.tasks_data )
				{
				var task = this.tasks_data[i];
				if ( task["state"][0] == "running" )
				{
					return true;
				}
			}
		 return false;
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
					<h3>  <b> {{task_data.name[0]}} </b> <sup> {{task_data.priority[0]}}</sup> </h3>	\
					<ol>																			\
						<li v-for="item in relative_steps_data" 									\
								:class= "{highlight : isRunningStep(item)}"> 						\
							<span> 																	\
								<b> {{item["name"][0]}} </b> 										\
								<sup> {{item["task-priority"][0]}} </sup> 							\
								 {{item["machine"][0]}}  											\
								&nbsp 												\
								<sub> {{item["machine-feature"][0]}} </sub> 						\
								&nbsp 																\
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



Vue.component('locked-resources' , { 
	props: [ 'topic_data', 'robot_name' ],
	template: '	<div :id="generatedID"							\
					 :class= "classObject" >					\
					<b> Locked Resources: </b>					\
																\
					<ul v-if="aResourceLockExists"> 			\
						<li v-for= "item in topic_data"> 		\
							<span>								\
								[ {{item["resource"][0] }} ] 	\
							</span> 							\
						</li>									\
					</ul> 										\
																\
					<p v-if="!aResourceLockExists">				\
						No Resources Locked ! 					\
					</p>										\
				</div> 											\
				',

	data: function () {
		return{
			id_prefix: "locked_resources__",
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

  		aResourceLockExists: function(){
  			for(var i in this.topic_data )
				{
				var resource_fact = this.topic_data[i];
				if ( resource_fact["agent"][0] == this.robot_name )
				{
					return true;
				}
			}
		 return false;
		 }
  	}
});


Vue.component('skills' , { 

	props: [ 'skills_data', 'skills_done_data', 'skills_to_execute_data' , 'robot_name' ],

	template: '	<div :id="generatedID"												\
					 :class= "classObject" >										\
					<h3> Skills: </h3>												\
																					\
					<!-- SKILL fact visualization--> 								\
					<ul v-if="aSkillExists" 										\
						:class="skillClassObject"> 									\
						<li v-for= "item in skills_data"> 							\
							<span :class="{highlight : isSkillRunning(item)}">		\
								{{item["skill-string"][0]}} 						\
								<sub v-if="!isSkillRunning(item)"> 					\
									{{item["status"][0]}} 							\
								</sub> 												\
							</span> 												\
						</li>														\
					</ul> 															\
					<p v-if="!aSkillExists">										\
						No Facts Available ! 										\
					</p>															\
																					\
					<!-- SKILL-TO-EXECUTE fact visualization-->						\
					<br>															\
					<h3> Skills To Execute: </h3>									\
					<ul v-if="aSkillToExecuteExists" 								\
						:class="skillToExecuteClassObject"> 						\
						<li v-for= "item in skills_to_execute_data"> 				\
							<span :class=											\
									"{highlight : isSkillToExecuteRunning(item)}">	\
								{{item["skill"][0]}} 								\
								&nbsp 												\
								[ {{item["target"][0]}} ] 							\
								&nbsp 												\
								<b v-if="!isSkillToExecuteRunning(item)"> 			\
									{{item["state"][0]}} 							\
								</b> 												\
							</span> 												\
						</li>														\
					</ul> 															\
					<p v-if="!aSkillToExecuteExists">								\
						No Facts Available ! 										\
					</p>															\
																					\
					<!-- SKILL-DONE fact visualization-->							\
					<br>															\
					<h3> Skills Done: </h3> 										\
					<ul v-if="aSkillDoneExists" 									\
						:class="skillDoneClassObject"> 								\
						<li v-for= "item in skills_done_data">		 				\
							<span :class=											\
									"{												\
										FINAL : isSkillDoneFinal(item), 			\
										FAILED : !isSkillDoneFinal(item) 			\
									}">												\
								{{item["name"][0]}} 								\
								&nbsp 												\
								{{item["status"][0]}} 								\
							</span> 												\
						</li>														\
					</ul> 															\
					<p v-if="!aSkillDoneExists">									\
						No Facts Available ! 										\
					</p>															\
																					\
				</div> 																\
				',

	data: function () {
		return{
			id_prefix: "skills__",
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true
	  		}	
  		},

  		skillClassObject: function (){
  			return {
	  			running : true
	  		}	
  		},

  		skillDoneClassObject: function (){
  			return {
	  			done : true
	  		}	
  		},



  		skillToExecuteClassObject: function (){
  			return {
	  			execute : true
	  		}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		aSkillExists: function (){
  			return this.skills_data.length > 0 ;
  		},


  		aSkillDoneExists: function (){
  			return this.skills_done_data.length > 0 ;
  		},

  		aSkillToExecuteExists: function (){
  			return this.skills_to_execute_data.length > 0 ;
  		}

  	},

  	methods: {
  		isSkillRunning: function (skillObject){
  			return skillObject["status"][0] == "RUNNING";
  		},

  		isSkillDoneFinal: function (skillObject){
  			return skillObject["status"][0] == "FINAL";
  		},

  		isSkillToExecuteRunning: function (skillObject){
  			return skillObject["state"][0] == "running";
  		}

  	}
});

//TODO IN CSS RESTUCTURE ROUND
// let the CSS not use ids..I dont like ids
