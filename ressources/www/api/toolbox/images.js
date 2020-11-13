
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const multer = require("multer");
const upload = multer({
	limits: {
		fileSize: 4 * 1024 * 1024 * 1024
	}
});
module.exports.upload = upload;

async function save(buffer)
{
	const filename = uuidv4() + '.png';
	const filepath = "./public/";
	var a = await sharp(buffer)
		//.resize(300,300)
		.toBuffer()
		.then(data =>
		{
			fs.writeFileSync(filepath + filename, data);
			return filename;
		})
	return filename;
}

async function saveMini(buffer, size = 150)
{
	const filename = uuidv4() + '.png';
	const filepath = "./public/";
	var a = await sharp(buffer)
		.resize(size, size)
		.toBuffer()
		.then(data =>
		{
			fs.writeFileSync(filepath + filename, data);
			return filename;
		})
	return filename;	
}

module.exports.save = save;

async function load(filename)
{
	const folderpath = './public/';

	var a = fs.readFileSync(folderpath + filename);
	return (a);
}
module.exports.load = load;

module.exports.send = async (res) =>
{
	var image = await load('favicon.ico');
	res.setHeader('Content-Type', 'image/png');
	res.end(image);	
}