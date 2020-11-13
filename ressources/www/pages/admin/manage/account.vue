<template>
  <div style="margin: 4%;">
	<InputSetter :query="firstname" :text="artist.firstName"></InputSetter>
	<InputSetter :query="lastname" :text="artist.lastName">{{ artist.lastName }}</InputSetter>
	<InputSetter :query="title" :text="artist.title">{{ artist.title }}</InputSetter>
	<InputSetter :query="descr" :text="artist.description">{{ artist.description }}</InputSetter>
	<Img style="width: 50%;" :edit="true" :query="srcIcon" :src="'/api/static/' + artist.srcIcon"/>
	<PasswordSetter />
  </div>
</template>

<script>
import axios from 'axios';
import Artist from '~/assets/class/artist';

export default {
	mounted()
	{

	},
	data()
    {
		axios.get('/api/users/self')
		.then(r =>
		{
			var user = r.data;
			console.log("user", user);
			console.log
			var artist = new Artist({
				firstname: user.firstname,
				lastname: user.lastname,
				description: user.descr,
				id: user.id,
				srcIcon: user.userIcon,
				title: user.title,
			})

			this.artist = artist;
 

		})
		return {
				artist: {},
				firstname: {apiSection: "users", attr: "firstname"},
				lastname: {apiSection: "users", attr: "lastname"},
				title: {apiSection: "users", attr: "title"},
				descr: {apiSection: "users", attr: "descr"},
				srcIcon: {apiSection: "users", attr: "srcIcon"}
		} 
    },
	methods: {
		edit(url)
		{
			var base = 'http://' + process.env.host + ':' + process.env.port;
			axios.post(base + url, {

			})
		}
	}
}
</script>

<style>

.text
{
	
}

</style>