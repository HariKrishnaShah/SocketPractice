const express = require('express');
const router = express.Router();
const Notis = require("./notification");

router.get("/get", async(req, res)=>{
    const notifications = await Notis.find();
    return res.json(notifications);
  })
  
  router.put("/add", async(req, res)=>{
    const notifications = await Notis.create(
      {
        title:req.body.title,
        isRead:false,
      }
    );
    return res.json(notifications);
  })

  module.exports = router;

  
