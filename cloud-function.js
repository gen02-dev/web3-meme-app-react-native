//Get All Memes
Moralis.Cloud.define("getAllMemes", async function (request) {
  const query = new Moralis.Query("Posts");
  const result = await query.find();
  
  const userQuery = new Parse.Query("User");
  const userResult = await userQuery.find({ useMasterKey: true });
  
  const memes = result.map((data) => {
   return userResult.map((res) => {
    	if(data.attributes.createdById === res.id) {
        	return {
          		id: data.id,
              	userName: res.attributes.username,
              	ethAddress: res.attributes.ethAddress,
          		caption: data.attributes.caption,
              	meme: data.attributes.assetUrl
        	}
        }
    }).filter(n => n);
  })
  return memes;
});
