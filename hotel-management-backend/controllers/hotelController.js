const hotelSchema = require("../models/hotel")
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./upload")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname+"-"+Date.now()+"-"+Math.round(Math.random()*1E9)+path.extname(file.originalname))
    }
})
const fileFilter = async(req, file, cb)=>{
    if(file.mimetype=="image/jpeg" || 
        file.mimetype=="image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
file.mimetype === "text/html"){
        cb(null, true)
    }else{
        cb(new Error("file  should be jpg"), null)
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter}).single("hotelImage")
const hotel = {};
 hotel.addHotel = async(req, res)=>{
   upload(req, res, async(err)=>{
    if(err){
         console.log(err)
        res.status(400).json({
            message: err.message
        })
    }else{
           try{
         const data = req.body;
         if(req.file){
            data.hotelImage = req.file.path
         }
         const hotel = await hotelSchema.create(data);
         if(hotel){
             res.status(201).json({
            message: "hotel created",
            data:hotel
        })
         }else{
             res.status(400).json({
            message: "hotel didn't create"
        })
         }
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
    }
   })
 
}

 hotel.getHotels = async(req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit =parseInt(req.query.limit) || 5
        const skip = (page-1)*limit
        let sort = {};
        if(req.query.sort == "0"){
           sort = {pricePerNight: 1}
        }else{
            sort={createdAt: -1}
        }
        let filter = {}
        if(req.query.search && typeof req.query.search == "string"){
            const search = req.query.search;
            filter = {$or: [ {name: {$regex: search, $options: "i"}},  {pricePerNight: parseInt(search)}]}
           
        }
       // const hotels = await hotelSchema.find();
       const hotels = await hotelSchema.aggregate([
        {$match: filter},
        {$sort: sort},
        {$facet: {
            count: [{$count: "totalCount"}],
            data: [{$limit: limit}, {$skip : skip}]
        }}
       ])
       const totalCOunt = hotels[0]?.count[0]?.totalCount || 0
       const data = hotels[0]?.data || []
        if(!hotels){
         res.status(404).json({
            message: "hotels not found"
        })}
        res.status(200).json({
            message: "hotels found found",
             hotels: data,
             count:totalCOunt
        })
    }catch(err){
          console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}
//grt hotel by id

 hotel.getHotel = async(req, res)=>{
    try{
        const hotel = await hotelSchema.findById({_id: req.params.hotelId});
        if(!hotel){
         res.status(404).json({
            message: "hotel not found"
        })}
      res.status(200).json({
            message: "hotel found",
            hotel
        })
    }catch(err){
          console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = hotel;