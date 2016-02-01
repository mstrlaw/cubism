Meteor.publish('worlds', function(params){
	console.log(params);

	var query = {}, filters = {};

	if(typeof params !== 'undefined'){
		if('id' in params && params.id !== ''){
			query['_id'] = params.id;
		}
	}

	query['$or'] = [
		{ 'owner': this.userId },
		{ 'published': true }
	]

	return Worlds.find(query, filters);
});